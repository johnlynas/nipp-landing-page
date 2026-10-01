import Reveal from './Reveal';

const steps = [
  {
    n: '1',
    title: 'Get your invitation',
    body: 'Send us your details below. We set up your organisation and invite you to the portal.',
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
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Onboarding
          </h2>  
          <p className="mt-4 max-w-[65ch] leading-relaxed text-slate-300">
            Access is granted per organization and scoped by role. Tell us who you are and what
            your team needs, and we handle the rest.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.n}>
              <Reveal delay={i * 70}>
                <span className="font-mono text-sm tracking-widest text-accent">
                  {String(step.n).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
