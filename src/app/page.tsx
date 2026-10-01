import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import ScreenshotTour from '@/components/ScreenshotTour';
import AccessBand from '@/components/AccessBand';
import ContactForm from '@/components/ContactForm';

const nav = [
  { href: '#product', label: 'Inside the portal' },
  { href: '#access', label: 'Onboarding' },
  { href: '#contact', label: 'Contact' },
];

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-tight text-slate-900">Property NI</span>
          <span className="hidden text-xs font-medium uppercase tracking-widest text-slate-400 sm:inline">
            Portal
          </span>
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
    <section id="top" className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 sm:px-8 md:grid-cols-12 md:gap-10 md:pb-24 md:pt-20 lg:gap-14">
        <div className="md:col-span-5">
          <Reveal>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tighter text-slate-900 sm:text-5xl">
              One portal for every role
            </h1>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-slate-600">
              A role-based workspace for multi-tenant property operations: dashboards, calendar, organisation chart, notifications and people administration.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal delay={120}>
            {/* <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.08),0_24px_64px_-24px_rgba(15,23,42,0.28)]">
              <div className="flex h-9 items-center gap-2 border-b border-slate-200 bg-white px-4" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              </div>
              <div className="relative aspect-[16/10]">
                <Image
                  src="/img/admin-dashboard.png"
                  alt="The Property NI admin dashboard with metrics and activity overview"
                  width={1800}
                  height={1087}
                  priority
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
            </div> */}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-12 md:gap-14 md:py-28">
        <div className="md:col-span-5">
          <Reveal>
            <h2 className="text-3xl font-semibold leading-tight tracking-tighter text-slate-900 md:text-4xl">
              Tell us who you are and how your team would use it
            </h2>
            <p className="mt-4 max-w-[50ch] leading-relaxed text-slate-600">
              Leave an email address or a mobile phone number (or both) and we will come back to
              you about access
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
          <p className="text-lg font-bold tracking-tight text-white">Property NI</p>
          <p className="mt-1 text-sm text-slate-500">Multi-Tenant Portal</p>
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
      <ScreenshotTour />
      <AccessBand />
      <ContactSection />
      <Footer />
    </main>
  );
}
