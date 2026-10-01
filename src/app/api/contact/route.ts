import { NextResponse } from 'next/server';

/**
 * Contact / access-request endpoint.
 *
 * Storage is deliberately minimal so this deploys to Vercel with zero setup:
 * validated, rate-limited per IP for the lifetime of the serverless instance,
 * logged as a JSON line to stdout (visible in Vercel function logs), and also
 * persisted to Vercel KV if configured.
 *
 * To persist leads permanently, plug in Vercel KV: if process.env.KV_REST_API_URL
 * and KV_REST_API_TOKEN are set, each lead is also appended to a 'leads' list.
 */

export const runtime = 'nodejs';

interface Lead {
  name?: string;
  email?: string;
  phone?: string;
  organization?: string;
  message?: string;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clean(value: unknown, max = 500): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, max);
}

// In-memory rate limit: 5 submissions per IP per hour.
const buckets = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > MAX_PER_WINDOW;
}

async function appendToKv(lead: Lead, receivedAt: string): Promise<void> {
  const base = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!base || !token) return;
  try {
    const res = await fetch(`${base}/v1/accounts/keys/leads`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    let list: unknown[] = [];
    if (res.ok) {
      const json = (await res.json()) as { value?: string };
      if (json.value) {
        try {
          const parsed = JSON.parse(json.value);
          if (Array.isArray(parsed)) list = parsed;
        } catch {
          list = [];
        }
      }
    }
    list.push({ ...lead, receivedAt });
    await fetch(`${base}/v1/accounts/keys/leads`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: JSON.stringify(list) }),
    });
  } catch (err) {
    console.error('KV persistence failed (lead was logged to stdout):', err);
  }
}

export async function POST(req: Request) {
  try {
    let payload: unknown;
    try {
      payload = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
    }

    const raw = (payload ?? {}) as Record<string, unknown>;
    const lead: Lead = {
      name: clean(raw.name, 120),
      email: clean(raw.email, 200)?.toLowerCase(),
      phone: clean(raw.phone, 30),
      organization: clean(raw.organization, 160),
      message: clean(raw.message),
    };

    if (!lead.email && !lead.phone) {
      return NextResponse.json(
        { ok: false, error: 'An email address or a mobile phone number is required.' },
        { status: 422 },
      );
    }
    if (lead.email && !isValidEmail(lead.email)) {
      return NextResponse.json({ ok: false, error: 'The email address looks invalid.' }, { status: 422 });
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('cf-connecting-ip') ||
      'unknown';
    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    const receivedAt = new Date().toISOString();
    console.log(JSON.stringify({ type: 'access_request', ip, receivedAt, ...lead }));
    await appendToKv(lead, receivedAt);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
