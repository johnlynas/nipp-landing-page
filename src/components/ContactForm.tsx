'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; phone?: string }>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim().toLowerCase();
    const phone = String(data.get('phone') ?? '').trim();
    const organization = String(data.get('organization') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!email && !phone) {
      setFieldErrors({ email: 'Add an email address', phone: 'or a mobile phone number' });
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldErrors({ email: 'That does not look like a valid email address' });
      return;
    }

    setFieldErrors({});
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, organization, message }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const inputClasses =
    'w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-accent/60';

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="rounded-xl border border-slate-200 bg-white p-8 text-left shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
      >
        <p className="text-lg font-semibold text-slate-900">Thank you, we have your details.</p>
        <p className="mt-2 leading-relaxed text-slate-600">
          We will be in touch by the fastest channel you gave us. If this is urgent, add a phone
          number and mention it in your message next time.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-semibold text-navy-850 underline decoration-accent decoration-2 underline-offset-4 transition hover:text-navy-700"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.06)] sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
            Full name
          </label>
          <input id="name" name="name" type="text" autoComplete="name" placeholder="Alex McAllister" className={inputClasses} />
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-slate-700">Organisation</span>
          <input name="organization" type="text" autoComplete="organization" placeholder="Your organisation" className={inputClasses} />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
            Email address
          </label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@organisation.org" className={inputClasses} />
          {fieldErrors.email && (
            <p className="mt-2 text-sm font-medium text-danger-ink">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
            Mobile phone
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+44 7911 000000" className={inputClasses} />
          {fieldErrors.phone && (
            <p className="mt-2 text-sm font-medium text-danger-ink">{fieldErrors.phone}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
            What does your team need? (optional)
          </label>
          <textarea id="message" name="message" rows={4} placeholder="A sentence about how many people you are, and what they would use the portal for." className={`${inputClasses} resize-y`} />
        </div>
      </div>

      {status === 'error' && (
        <div role="alert" className="mt-5 rounded-md border border-danger-border bg-danger-tint px-4 py-3">
          <p className="text-sm font-medium text-danger-ink">
            We could not send that. Please try again in a moment, or email us directly from the
            footer.
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-accent px-7 py-3 text-base font-semibold text-accent-ink shadow-[0_1px_2px_rgba(15,23,42,0.15)] transition hover:bg-accent-strong/90 active:translate-y-[1px] disabled:cursor-wait disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending...' : 'Request access'}
        </button>
        <p className="text-xs leading-relaxed text-slate-500">
          Email and phone are both used to reach you. Give at least one, we will not share your details with anyone else.
        </p>
      </div>
    </form>
  );
}
