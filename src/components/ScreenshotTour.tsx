import Image from 'next/image';
import Reveal from './Reveal';

type Shot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  body: string;
};

const shots: Shot[] = [
  {
    src: '/img/login.png',
    alt: 'Property NI sign-in page',
    width: 1800,
    height: 972,
    title: 'Secure sign-in',
    body: 'One entry point to the portal. Role-based authentication means every person signs in to exactly the part of the workflow they are authorised for, with automatic sign-out after inactivity.',
  },
  {
    src: '/img/admin-dashboard.png',
    alt: 'Property NI admin dashboard',
    width: 1800,
    height: 1087,
    title: 'Admin dashboard',
    body: 'A live overview of the organisation at a glance: people, roles, activities and operational metrics for the administrators who run things behind the scenes.',
  },
  {
    src: '/img/tenant-dashboard.png',
    alt: 'Property NI member workspace',
    width: 1800,
    height: 1059,
    title: 'Member workspace',
    body: 'A focused, read-only workspace for team members: the shared calendar, the organisation chart and the notifications that matter to their role, nothing more.',
  },
  {
    src: '/img/calendar.png',
    alt: 'Shared calendar in month view with an event opened',
    width: 1800,
    height: 975,
    title: 'Shared calendar',
    body: 'Every team on one schedule. Administrators create and edit events; members browse month, week or day views and open any event for full details.',
  },
  {
    src: '/img/org-chart.png',
    alt: 'Organisation chart with connected roles',
    width: 1800,
    height: 980,
    title: 'Organisation chart',
    body: 'The structure of the organisation inside the portal itself: who holds which role and how teams connect to each other, kept current alongside the people it describes.',
  },
  {
    src: '/img/system-health.png',
    alt: 'System health status board',
    width: 1800,
    height: 977,
    title: 'System health',
    body: 'A live view of backend services and dependency status, so operations can spot a degraded component before users ever notice it.',
  },
  {
    src: '/img/notifications.png',
    alt: 'Notifications feed listing recent alerts',
    width: 1800,
    height: 956,
    title: 'Notifications',
    body: 'Role-aware in-app notifications keep people up to date with changes and updates that concern their position in the organisation, without anyone having to ask.',
  },
  {
    src: '/img/users.png',
    alt: 'User administration table with roles and status',
    width: 1800,
    height: 976,
    title: 'People administration',
    body: 'Invite people, assign roles and manage memberships from one screen. When a new user signs in, they land directly in the workspace their role belongs to.',
  },
];

function Frame({ shot }: { shot: Shot }) {
  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_32px_-12px_rgba(15,23,42,0.18)]">
        <div className="flex h-9 items-center gap-2 border-b border-slate-200 bg-white px-4" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        </div>
        <div className="relative aspect-[1.7/1] bg-slate-50">
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            className="absolute inset-0 h-full w-full object-cover object-top"
            sizes="(max-width: 768px) 92vw, 44vw"
            loading="lazy"
          />
        </div>
      </div>
    </figure>
  );
}

export default function ScreenshotTour() {
  return (
    <section id="product" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tighter text-slate-900 md:text-4xl">
            What the portal looks like in use
          </h2>
          <p className="mt-4 max-w-[65ch] leading-relaxed text-slate-600">
            Eight views from a working environment. Each one shows a real screen, not a mock:
            sign-in, both dashboards, the calendar, the organisation chart, system health,
            notifications and people administration.
          </p>
        </Reveal>

        <div className="mt-14 space-y-20 md:space-y-28">
          {shots.map((shot, i) => (
            <div key={shot.src} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
              <Reveal
                className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-last' : ''}`}
                delay={60}
              >
                <Frame shot={shot} />
              </Reveal>
              <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-first' : ''}`}>
                <Reveal>
                  <p className="font-mono text-xs tracking-widest text-slate-400">
                    SCREEN {String(i + 1).padStart(2, '0')} / {shots.length}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug text-slate-900 md:text-2xl">
                    {shot.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{shot.body}</p>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
