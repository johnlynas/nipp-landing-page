import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Logo from '@/components/Logo';
import ScreenshotTour from '@/components/ScreenshotTour';
import AccessBand from '@/components/AccessBand';
import ContactForm from '@/components/ContactForm';

const nav = [
  { href: '#product', label: 'Inside the portal' },
  { href: '#access', label: 'Onboarding' },
];

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="Property NI — home" className="block">
          <Logo tone="light" className="h-8 w-auto sm:h-9" />
        </a>
        <nav aria-label="Main" className="flex items-center gap-5 sm:gap-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden text-sm font-medium text-slate-600 transition hover:text-slate-900 md:inline"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong/90 active:translate-y-[1px]"
          >
            Request access
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="border-t-4 border-accent bg-navy-900 text-slate-100">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 sm:px-8 md:grid-cols-12 md:gap-10 md:pb-24 md:pt-20 lg:gap-14">
        <div className="md:col-span-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Multi-tenant property portal
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl">
              One portal for every role
            </h1>
            <p className="mt-5 max-w-[60ch] leading-relaxed text-slate-300">
              Property NI is a secure, central platform that connects property managers, landlords
              and tenants. It automates day-to-day real estate operations as a 24/7 self-service
              hub — no phone calls, no email threads, just sign in and get on with it.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-6">
          <Reveal delay={120}>
            {/* Real login screen with an amber accent border */}
            <div className="relative mx-auto max-w-xl overflow-hidden rounded-xl border-2 border-accent bg-white shadow-[0_24px_64px_-24px_rgba(0,0,0,0.55)]">
              <div className="flex h-10 items-center gap-2 border-b border-slate-200 px-4" aria-hidden>
                <Logo tone="light" className="h-4 w-auto opacity-90" />
                <span className="ml-auto text-[11px] font-medium tracking-wide text-slate-400">
                  propertyni.example
                </span>
              </div>
              <Image
                src="/img/login.png"
                alt="Property NI sign-in page"
                width={1800}
                height={972}
                priority
                className="block h-auto w-full"
                sizes="(max-width: 768px) 92vw, 44vw"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const audiences = [
  {
    title: 'Property managers',
    body: 'Run the whole operation from one dashboard — people, roles, activities and metrics in a single view.',
  },
  {
    title: 'Landlords',
    body: 'See what is happening across your portfolio without chasing anyone; every update lands where it should.',
  },
  {
    title: 'Tenants & team members',
    body: 'A focused self-service workspace: the shared calendar, the organisation chart and the notifications that matter to you.',
  },
];

function RoleStrip() {
  return (
    <section aria-label="Who Property NI is for" className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-x-10 gap-y-8 px-5 py-14 sm:px-8 md:grid-cols-3 md:py-16">
        {audiences.map((a, i) => (
          <Reveal key={a.title} delay={i * 80}>
            <div className="border-l-2 border-accent pl-5">
              <h2 className="font-display text-lg font-semibold tracking-tight text-slate-900">
                {a.title}
              </h2>
              <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-slate-600">{a.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="border-t-4 border-accent bg-navy-950">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-12 md:gap-14 md:py-28">
        <div className="md:col-span-5">
          <Reveal>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tighter text-white md:text-4xl">
              Tell us who you are and how your team would use it
            </h2>
            <p className="mt-4 max-w-[50ch] leading-relaxed text-slate-400">
              Leave an email address or a mobile phone number (or both) and we will come back to
              you about access.
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-7">
          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between md:py-16">
        <div>
          <Logo tone="dark" className="h-9 w-auto" />
          <p className="mt-4 max-w-[38ch] text-sm leading-relaxed">
            A role-based workspace for multi-tenant property operations: dashboards, calendar,
            organisation chart, notifications and people administration.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-12 gap-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Pages</p>
            <ul className="mt-3 space-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Contact</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="mailto:access@propertyni.example" className="transition hover:text-white">
                  access@propertyni.example
                </a>
              </li>
              <li>+44 (0)28 9012 3456</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-navy-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>&copy; {new Date().getFullYear()} Property NI. All rights reserved.</p>
          <p>Access is granted per organisation and scoped by role.</p>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-[100dvh] bg-white">
      <Nav />
      <Hero />
      <RoleStrip />
      <ScreenshotTour />
      <AccessBand />
      <ContactSection />
      <Footer />
    </main>
  );
}
