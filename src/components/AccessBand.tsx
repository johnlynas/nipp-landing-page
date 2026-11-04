import Reveal from './Reveal';

const steps = [
  {
    n: '1',
    title: 'Get your invitation',
    body: 'Send us your details below. We set up your organization and invite you to the portal.',
  },
  {
    n: '2',
    title: 'Your team follows you in',
    body: 'Members, managers and administrators join under the same roof, each with their own role.',
  },
  {
    n: '3',
    title: 'Sign in once',
    body: 'A single sign-in lands every person directly in the workspace their role belongs to.',
  },
  {
    n: '4',
    title: 'Work within your permissions',
    body: 'What a role can see and change is fixed at the system level, and audited across the board.',
  },
];

export default function AccessBand() {
  return (
    <section id="access" className="bg-navy-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Onboarding
          </h2>
          <p className="mt-4 max-w-[65ch] leading-relaxed text-slate-300">
            Access is granted per organization and scoped by role. Tell us who you are and what
            your team needs, and we handle the rest.
          </p>
        </Reveal>

        <ol className="relative mt-14 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {/* Connecting line through the step numbers (desktop) */}
          <div
            aria-hidden
            className="absolute inset-x-[10%] top-6 hidden h-px bg-navy-700 lg:block"
          />
          {steps.map((step, i) => (
            <li key={step.n} className="relative">
              <Reveal delay={i * 90}>
                <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-4">
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-navy-900 font-mono text-sm tracking-widest text-accent">
                    {String(step.n).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold leading-snug text-white">{step.title}</h3>
                    <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-slate-400">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
