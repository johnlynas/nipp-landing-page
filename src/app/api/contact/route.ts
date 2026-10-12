import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
 *
 * Each lead is also emailed via SMTP (Gmail) when the SMTP_* env vars are set,
 * addressed to the SMTP_USER mailbox with the submitter as reply-to. The send
 * is fully awaited before responding so Vercel can't cut the function short.
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

async function sendLeadEmail(lead: Lead): Promise<void> {
  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !portRaw || !user || !pass) {
    console.warn('SMTP not configured — lead was logged to stdout only.');
    return;
  }

  const from = process.env.SMTP_FROM ? `${process.env.SMTP_FROM} (NIPP contact form)` : user;
  const subjectPrefix = lead.name ? `New access request from ${lead.name}` : 'New access request';

  const rows: Array<[string, string | undefined]> = [
    ['Full name', lead.name],
    ['Organisation', lead.organization],
    ['Email address', lead.email],
    ['Mobile phone', lead.phone],
  ];
  const detailRows = rows
    .map(
      ([label, value]) => `<tr>
        <td style="padding:10px 24px 10px 32px;font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#64748b;white-space:nowrap;">${escHtml(label)}</td>
        <td style="padding:10px 32px;font-size:15px;font-weight:500;color:#0f172a;">${
          value ? escHtml(value) : '<span style="color:#cbd5e1;">—</span>'
        }</td>
      </tr>`,
    )
    .join('');

  const messageBlock = lead.message
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 32px;background:#f8fafc;border-left:3px solid #f5a623;">
        <tr><td style="padding:16px 20px;font-size:14px;line-height:1.6;color:#334155;white-space:pre-line;">${escHtml(lead.message)}</td></tr>
      </table>`
    : '';

  const receivedDate = new Date().toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' });

  const html = `<div style="background:#f1f5f9;padding:24px 0;font-family:'Inter',ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;">
      <tr>
        <td align="center">
          <table role="presentation" width="640" style="width:640px;max-width:100%;" cellpadding="0" cellspacing="0">
            <tr>
              <td role="presentation" style="background:#ffffff;box-shadow:0 1px 3px rgba(15,23,42,0.08);">
                <!-- Header band -->
                <div style="background:#121c30;padding:28px 32px;">
                  <p style="margin:0;font-size:14px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#f5a623;">NIPP &mdash; Access request</p>
                  <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;line-height:1.3;color:#ffffff;">${escHtml(subjectPrefix)}</h1>
                </div>
                <!-- Amber divider -->
                <div style="background:#f5a623;height:4px;font-size:0;line-height:0;">&nbsp;</div>

                <!-- Contact details -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${detailRows}
                </table>
                ${messageBlock}

                <!-- Footer -->
                <div style="border-top:1px solid #e2e8f0;padding:20px 32px;text-align:center;">
                  <p style="margin:0;font-size:12px;color:#94a3b8;">Received ${escHtml(receivedDate)} via the access-request form</p>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`;

  const text = [
    `New access request${lead.name ? ` from ${lead.name}` : ''}`,
    '',
    ...rows.map(([label, value]) => `${label}: ${value ?? '—'}`),
    lead.message ? ['', lead.message] : [],
    '',
    `Received ${new Date().toISOString()}`,
  ].join('\n');

  const transporter = nodemailer.createTransport({
    host,
    port: Number(portRaw) || 587,
    secure: Number(portRaw) === 465, // STARTTLS for 587, implicit TLS for 465
    auth: { user, pass },
  });

  try {
    const info = await transporter.sendMail({
      from,
      to: user,
      replyTo: lead.email || undefined,
      subject: `${subjectPrefix} — ${escHtml(receivedDate)}`,
      text,
      html,
    });
    console.log(JSON.stringify({ type: 'lead_email_sent', messageId: info.messageId }));
  } finally {
    // Serverless functions are torn down on response; don't keep pooling sockets.
    await transporter.close();
  }
}

function escHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

    try {
      // Fully awaited before we respond so Vercel can't terminate the function mid-send.
      await sendLeadEmail(lead);
    } catch (err) {
      console.error('Lead email failed (lead was logged to stdout/KV):', err);
      return NextResponse.json(
        { ok: false, error: 'Your details were received but the notification could not be sent. Please try again.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
