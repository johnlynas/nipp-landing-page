# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Property managers** — run the whole operation from one dashboard: people, roles, activities and metrics in a single view.
- **Landlords & management agents** — see what is happening across their entire property portfolio, with workflows that automate tasks.
- **Tenants** — a focused self-service workspace: organization-specific information, a shared calendar, timely notifications.
- **AI agents** — first-class consumers of the portal via the built-in chat agent, an MCP server, and a skill file; they read and act on portal data within role permissions.

## Product Purpose

Property NI is a secure, central multi-tenant property operations platform for Northern Ireland. It connects every role in a property organization under one sign-in and automates day-to-day real estate operations as a 24/7 self-service hub — replacing phone calls and email threads with "sign in and get on with it." Success means each role lands directly in the workspace their role belongs to, and operations run without manual coordination overhead.

## Positioning

"One portal for every role": role-based authentication scopes what each person (and each agent) can see and change at the system level, audited across the board. The AI integration layer — built-in chat agent + MCP server + skill file — lets the portal plug into any modern AI ecosystem without glue code; neighboring portals cannot truthfully copy this because it is built on the portal's own permissioned tool surface, not a bolt-on API wrapper.

## Operating Context

- Access is invitation-based: prospective users send an email address and/or mobile number via the landing page contact form; Property NI sets up their organization and issues invitations.
- Members, managers and administrators join under the same organization, each with their own role.
- A single sign-in routes every person to the workspace matching their role.
- The portal exposes its data and actions as standard Model Context Protocol (MCP) tools; a skill file (markdown playbook of portal workflows and conventions) teaches agents how to use them in the right order.
- Landing page is a static marketing surface for a separate, working portal product (screenshots are from the live environment).

## Capabilities and Constraints

Confirmed portal capabilities (from live screenshots): admin dashboard with operational metrics; role-based sign-in; tenant/member workspaces; shared calendar (month/week/day); organization chart; system health board; role-aware notifications; people administration (invite, roles, memberships); platform map of Northern Ireland activity; AI agent chat with structured answers over ~15 domain tool areas (orgs, users, roles, permissions, teams, work orders, contractors, invoices, quotes, resources, units, ...).

- Contact details on the page (access@propertyni.example, +44 (0)28 9012 3456, propertyni.example domain) are **placeholders** — not real values; keep them as-is until the user supplies real ones.
- No pricing, testimonials, customer names, or benchmarks exist — do not fabricate any in future work.

## Brand Commitments

- Name: **Property NI**. Logos live in `design/` (doorway, roofline, NI monogram) and `public/img/logo.png`.
- Voice: plain-spoken, operational, Northern Irish context; no hype. Copy names concrete things ("no phone calls, no email threads").
- The portal's own visual system is incumbent authority for the landing page: navy chrome, single amber accent (never carries white text), Sora display + Inter body — tokens kept in sync with the portal's globals.css per `src/app/globals.css`.

## Evidence on Hand

Real screenshots of the working portal in `public/img/`: login, admin-dashboard, tenant-dashboard, calendar, org-chart, system-health, notifications, users, platform-map; AI agent chat: ai-help (learning roadmap), ai-what-can-it-do (capability breakdown), ai-org-status (live org summary). Logo assets in `design/` and `public/img/logo.png`. No testimonials, press, case studies, or benchmarks — absence is a fact, not a gap to fill.

## Product Principles

1. **One roof, many roles** — every role gets the same platform; scope and permission differ, not the product.
2. **Self-service over coordination** — the hub replaces phone calls and email threads; if a workflow needs a human in the loop, it should be automatable.
3. **Permissioned by default** — access is per organization, scoped by role, fixed at system level and audited; AI agents get no more than their role allows.
4. **Speak the ecosystem's language** — standard protocols (MCP) and plain-markdown skills over bespoke integrations, so any compatible AI tool works out of the box.
5. **Show the real product** — marketing surfaces use live screenshots and concrete operational copy, never invented proof.

## Accessibility & Inclusion

Standard baseline is practiced in code: semantic landmarks and aria-labels, visible focus rings on interactive frames, `prefers-reduced-motion` honored for scroll reveals and smooth scrolling, 44px minimum touch targets on CTAs. No product-specific accessibility requirement beyond this has been established.
