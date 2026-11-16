import Image from 'next/image';
import Reveal from './Reveal';

type Layer = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  body: string;
  caption: string;
};

const layers: Layer[] = [
  {
    src: '/img/ai-help.png',
    alt: 'Portal agent chat answering a question about learning to administer the portal with a phased roadmap',
    width: 3456,
    height: 2140,
    title: 'A portal agent you can talk to',
    body: 'Ask in plain English and get structured answers back. New to the portal? The agent maps out a learning path for you. Need the state of an organization at a glance? It reads it for you — no digging through menus.',
    caption: 'Asked how to learn the portal, the agent lays out a phased roadmap across system health, tenants and core workflows.',
  },
  {
    src: '/img/ai-what-can-it-do.png',
    alt: 'Portal agent listing its capability areas, from organizations and users to work orders and invoices',
    width: 3454,
    height: 2164,
    title: 'An MCP server for your own agents',
    body: 'The portal exposes its data and actions as standard Model Context Protocol tools. Connect Claude, Cursor or any MCP-compatible client and your AI stack can list organizations, work orders and invoices — scoped by the same permissions your role already has.',
    caption: 'Asked what it can do, the agent lists every capability area exposed through the portal’s tools.',
  },
  {
    src: '/img/ai-org-status.png',
    alt: 'Portal agent summarising organization status with a live data table for the Platform organization',
    width: 3454,
    height: 2168,
    title: 'A skill file that carries the know-how',
    body: 'The agent is backed by a skill file — a plain markdown playbook of how the portal works, its workflows and its conventions. It teaches any agent the right order to do things in, so answers follow best practice instead of guessing.',
    caption: 'Summarising organization status on request, with live data pulled straight from the portal.',
  },
  {
    src: '/img/ai-dashboard-chat.png',
    alt: 'Portal agent chat integrated into the admin dashboard, producing a detailed report on the Platform organization through its tool calls',
    width: 3080,
    height: 1912,
    title: 'One place where it all comes together',
    body: 'The layers work together: the MCP server is the connection, the skill file is the manual, and the chat agent is where it all comes together for your team. Point your favourite AI tools at the portal and they already know how to use it.',
    caption: 'In the admin dashboard, the agent pulls a full report on the Platform organization — teams, users, roles, permissions and resources — straight from its own tools.',
  },
];

/** Portal top bar — matches ScreenshotTour frames so screenshots read as the real product. */
function PortalBar({ label }: { label?: string }) {
  return (
    <div className="flex h-9 items-center gap-2 bg-navy-900 px-3" aria-hidden>
      <span className="h-2 w-2 rounded-full bg-accent" />
      <span className="text-[11px] font-semibold tracking-wide text-white/85">Property NI</span>
      {label && <span className="ml-auto truncate text-[10px] text-slate-400">{label}</span>}
    </div>
  );
}

function Frame({ layer }: { layer: Layer }) {
  return (
    <figure className="h-full">
      <div
        tabIndex={0}
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_32px_-12px_rgba(15,23,42,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div className="border-b border-navy-800">
          <PortalBar label={layer.title} />
        </div>
        <Image
          src={layer.src}
          alt={layer.alt}
          width={layer.width}
          height={layer.height}
          className="block h-auto w-full"
          sizes="(max-width: 768px) 92vw, 44vw"
          loading="lazy"
        />
      </div>
      <figcaption className="mt-4 max-w-[58ch] text-sm leading-relaxed text-slate-600">
        {layer.caption}
      </figcaption>
    </figure>
  );
}

export default function AiIntegration() {
  return (
    <section id="ai" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tighter text-slate-900 md:text-4xl">
            AI Integration
          </h2>
          <p className="mt-4 max-w-[65ch] leading-relaxed text-slate-600">
            Property NI speaks the language of modern AI tooling. A built-in agent, an MCP server
            and a skill file let the portal plug straight into the AI ecosystem — no glue code, no
            custom integrations per client.
          </p>
        </Reveal>

        <div className="mt-16 space-y-20 md:space-y-24">
          {layers.map((layer, i) => (
            <Reveal key={layer.src}>
              <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                    {layer.title}
                  </h3>
                  <p className="mt-4 max-w-[52ch] leading-relaxed text-slate-600">{layer.body}</p>
                </div>
                <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                  <Frame layer={layer} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
