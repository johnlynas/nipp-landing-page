import Image from 'next/image';
import Reveal from './Reveal';

type Shot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  body: string;
  featured?: boolean;
};

const shots: Shot[] = [
  {
    src: '/img/admin-dashboard.png',
    alt: 'Property NI admin dashboard',
    width: 1800,
    height: 1130,
    title: 'Admin dashboard',
    body: 'A live overview of the organisation at a glance: people, roles, activities and operational metrics for the administrators who run things behind the scenes.',
    featured: true,
  },
  {
    src: '/img/login.png',
    alt: 'Property NI sign-in page',
    width: 1800,
    height: 972,
    title: 'Secure sign-in',
    body: 'One entry point. Role-based authentication lands every person in exactly the part of the workflow they are authorised for.',
  },
  {
    src: '/img/tenant-dashboard.png',
    alt: 'Property NI member workspace',
    width: 1800,
    height: 1130,
    title: 'Tenant workspace',
    body: 'A focused, read-only workspace for team members: the calendar, the organisation chart and the notifications that matter to their role.',
  },
  {
    src: '/img/calendar.png',
    alt: 'Shared calendar in month view with an event opened',
    width: 1800,
    height: 975,
    title: 'Shared calendar',
    body: 'Every team on one schedule. Administrators create and edit events; members browse month, week or day views.',
  },
  {
    src: '/img/org-chart.png',
    alt: 'Organization chart with connected roles',
    width: 1800,
    height: 980,
    title: 'Organization chart',
    body: 'Who holds which role and how teams connect, kept current alongside the people it describes.',
  },
  {
    src: '/img/system-health.png',
    alt: 'System health status board',
    width: 1800,
    height: 977,
    title: 'System health',
    body: 'A live view of backend services and dependency status, so operations spots a degraded component early.',
  },
  {
    src: '/img/notifications.png',
    alt: 'Notifications feed listing recent alerts',
    width: 1800,
    height: 956,
    title: 'Notifications',
    body: 'Role-aware in-app notifications keep people up to date with changes that concern their position.',
  },
  {
    src: '/img/users.png',
    alt: 'User administration table with roles and status',
    width: 1800,
    height: 976,
    title: 'People administration',
    body: 'Invite people, assign roles and manage memberships from one screen.',
  },
  {
    src: '/img/platform-map.jpg',
    alt: 'Google Maps view of Northern Ireland with live notification feed',
    width: 1800,
    height: 1130,
    title: 'Platform map',
    body: 'Operations shown geographically: activity across the region alongside a live notification feed.',
  },
];

/** Portal top bar — replaces generic browser chrome so frames read as the real product. */
function PortalBar({ label }: { label?: string }) {
  return (
    <div className="flex h-9 items-center gap-2 bg-navy-900 px-3" aria-hidden>
      <span className="h-2 w-2 rounded-full bg-accent" />
      <span className="text-[11px] font-semibold tracking-wide text-white/85">Property NI</span>
      {label && <span className="ml-auto truncate text-[10px] text-slate-400">{label}</span>}
    </div>
  );
}

function Frame({ shot }: { shot: Shot }) {
  return (
    <figure className="group h-full">
      <div
        tabIndex={0}
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_32px_-12px_rgba(15,23,42,0.18)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_2px_4px_rgba(15,23,42,0.08),0_20px_48px_-16px_rgba(15,23,42,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div className="border-b border-navy-800">
          <PortalBar label={shot.title} />
        </div>
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          className={`block w-full ${shot.featured ? 'h-auto' : 'aspect-[16/10] h-auto object-cover'}`}
          sizes="(max-width: 768px) 92vw, (max-width: 1024px) 44vw, 30vw"
          loading="lazy"
        />
      </div>
      <figcaption className="mt-4">
        <h3 className="font-display text-base font-semibold tracking-tight text-slate-900">
          {shot.title}
        </h3>
        <p className="mt-1.5 max-w-[52ch] text-sm leading-relaxed text-slate-600">{shot.body}</p>
      </figcaption>
    </figure>
  );
}

export default function ScreenshotTour() {
  return (
    <section id="product" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tighter text-slate-900 md:text-4xl">
            Inside the portal
          </h2>
          <p className="mt-4 max-w-[65ch] leading-relaxed text-slate-600">
            Nine views from a working environment. Each one is a real screen, not a mock: both
            dashboards, sign-in, the calendar, the organisation chart, system health, notifications,
            people administration and the platform map.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {shots.map((shot, i) => (
            <Reveal
              key={shot.src}
              delay={(i % 3) * 60}
              className={shot.featured ? 'md:col-span-2 lg:row-span-2' : ''}
            >
              <Frame shot={shot} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
