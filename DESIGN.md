---
name: Property NI
description: Landing page design system for the Property NI multi-tenant property portal — navy operations-room chrome with a single amber accent.
colors:
  primary: "#f5a623"
  primary-strong: "#c2741a"
  primary-ink: "#1e293b"
  navy-deepest: "#121c30"
  navy-deep: "#16223a"
  navy-mid: "#1b2a4a"
  navy-raised: "#24355c"
  navy-line: "#3a4f7a"
  ink-900: "#0f172a"
  ink-800: "#1e293b"
  ink-700: "#334155"
  ink-600: "#475569"
  ink-500: "#64748b"
  ink-400: "#94a3b8"
  ink-300: "#cbd5e1"
  ink-200: "#e2e8f0"
  ink-100: "#f1f5f9"
  ink-50: "#f8fafc"
  paper: "#ffffff"
  danger: "#dc3545"
  danger-ink: "#991b1b"
  danger-tint: "#fef2f2"
  danger-border: "#fecaca"
typography:
  display:
    fontFamily: "Sora, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Sora, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Sora, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, ui-sans-serif, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Inter, ui-sans-serif, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.2em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "12px"
spacing:
  section: "80px"
  section-lg: "112px"
  container-pad: "20px"
  container-pad-lg: "32px"
  grid-gap: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-ink}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.primary-ink}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  screenshot-frame:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.lg}"
  form-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.lg}"
    padding: "32px"
---

# Design System: Property NI

## Overview

**Creative North Star: "The Operations Room"**

Property NI's landing page reads like the front of a well-run operations room: dark navy chrome frames light work surfaces, and everything is labelled plainly. The system is calm and precise — institutional in its discipline, warm only where it matters. There is exactly one accent color, and it behaves like a door handle: it appears on the CTA, on focus rings, and as thin framing edges that mark "this is the entrance." Nothing glows, nothing animates for decoration; motion exists to confirm scroll position, not to entertain.

The page alternates full-bleed navy bands (hero, onboarding, contact) with white working surfaces (role strip, product tour, AI integration). Product screenshots never appear raw — they are always wrapped in a framed chrome that makes them read as the real portal, not stock imagery. Density is moderate: generous section padding (80–112px vertical), 65ch reading measures, and grid gaps wide enough that sections breathe without feeling empty.

**Key Characteristics:**
- Navy chrome / white work-surface alternation as the page's structural rhythm
- A single amber accent reserved for action and focus — never decoration
- Sora display over Inter body: confident headings, plain-spoken text
- Every product screenshot framed in portal chrome with a navy top bar
- Flat surfaces; shadows only to lift framed content off the page

## Colors

A deep navy scale carries all dark chrome; a neutral slate scale carries text on light surfaces; one amber accent does the work of pointing at what to do next.

### Primary
- **Amber Accent** (#f5a623): The single action color — primary CTA background, focus rings, thin framing borders (form card, hero screenshot), step-number rings, and kicker text on navy. Never carries white text; its ink is `primary-ink`.
- **Amber Strong** (#c2741a): Hover/pressed state of the accent — darker, never brighter.
- **Accent Ink** (#1e293b): Text color on amber surfaces (dark slate, not black).

### Neutral
- **Navy Deepest** (#121c30): Footer and contact-band background — the darkest surface on the page.
- **Navy Deep** (#16223a): Hero and onboarding band backgrounds; portal-bar chrome inside screenshot frames.
- **Navy Mid** (#1b2a4a): Link text on dark surfaces (e.g. "Send another enquiry").
- **Navy Raised** (#24355c): Hairline dividers on navy (footer bottom border).
- **Navy Line** (#3a4f7a): Connecting lines and structural strokes on navy (onboarding step line); input focus border on white.
- **Ink 900 → Ink 50** (#0f172a → #f8fafc): Standard slate ramp for body text, secondary text, borders and tints on light surfaces. Headings sit at ink-900; supporting copy at ink-600; fine print at ink-500.
- **Paper** (#ffffff): The working-surface background.

### Named Rules
**The Amber Door Rule.** Amber appears only where a user acts or focuses: CTAs, focus rings, and the thin edges that mark an entry point (form card border, hero frame border). It never fills a band, never decorates a heading, and never carries white text. Its rarity is the point.

**The Chrome Rule.** Dark navy is chrome — it frames and grounds (hero, onboarding, contact, footer, portal bars). Light surfaces are where content lives. A section is either framed or working; it does not mix both in one surface.

## Typography

**Display Font:** Sora (with Inter fallback)
**Body Font:** Inter (with system sans fallback)
**Label/Mono Font:** none — monospace appears only for step numerals, where it reads as instrumentation.

**Character:** Sora is geometric and confident at size; Inter is plain-spoken at reading length. Headings carry weight and tight tracking; body copy never exceeds semibold and keeps a relaxed line height.

### Hierarchy
- **Display** (700, 2.25–3rem / 1.08, tracking -0.02em): Hero headline only ("One portal for every role").
- **Headline** (600–700, 1.875–2.25rem / ~1.2, tracking -0.03em): Section headings. Tighter tracking than display; the section's job is orientation, not drama.
- **Title** (600, 1–1.25rem / 1.4): Card and frame captions, step titles, audience names.
- **Body** (400, 0.875–1rem / 1.625): All supporting copy. Measure capped at ~65ch (`max-w-[65ch]`); secondary text drops to ink-600 on white, slate-300/400 on navy.
- **Label** (600, 0.75rem / 1.2, tracking 0.2em, uppercase): Kicker above the hero headline and footer column headers — the system's only uppercase voice.

### Named Rules
**The Plain-Spoken Rule.** Copy names concrete things ("no phone calls, no email threads"). Type settings reinforce it: no gradient text, no italic emphasis, no display sizes below section level. If a sentence needs shouting, rewrite it.

## Layout

Full-bleed bands stacked vertically inside a `max-w-7xl` (1280px) container with 20px horizontal padding (32px at ≥640px). Section rhythm is 80px vertical padding on mobile, 112px at ≥768px.

The hero and contact sections use a 12-column grid (5/7 and 6/6 splits) at ≥768px; the role strip runs 2 columns at ≥640px and 4 at ≥1024px; the product tour is a 3-column grid with one featured frame spanning 2×2. The AI integration section alternates text/image in two columns, flipping sides per row.

Everything stacks to a single column below its breakpoint — no mid-width compromises. Grid gaps run 32–56px horizontal and 48px vertical; related content sits tight (8–16px), sections sit far apart.

## Elevation & Depth

The system is flat by default: bands are full-bleed color, cards on white are hairline-bordered. Shadows exist only to lift *framed content* — screenshots and the contact form — off the page, in two fixed recipes.

### Shadow Vocabulary
- **Frame** (`box-shadow: 0 1px 2px rgba(15,23,42,0.06), 0 12px 32px -12px rgba(15,23,42,0.18)`): Screenshot frames and the login frame at rest — a tight contact shadow plus one soft drop.
- **Hero** (`box-shadow: 0 24px 64px -24px rgba(0,0,0,0.55)`): The hero's framed login screen on navy — heavier because dark backgrounds need the lift to read.
- **Micro** (`box-shadow: 0 1px 2px rgba(15,23,42,0.06–0.15)`): Buttons and form cards — a whisper, present so the CTA reads as raised, not painted on.

### Named Rules
**The Framed-Content Rule.** Shadows follow frames: anything wrapped in portal chrome (screenshots, the contact form) carries a shadow; flat sections never do. A shadow without a frame is decoration and does not ship.

## Shapes

Corners are small and consistent: 6px for interactive elements (buttons, inputs, alerts), 12px for content frames (screenshot cards, form card), full radius only for the circular step numerals. Borders are hairline (1px) in slate-200/300 on light surfaces — except the accent's 2px "door" borders on the form card and hero frame, which are the one deliberate weight jump on the page. No clipping, no masks; rectangles with quiet corners.

## Components

### Buttons
- **Shape:** Gently rounded (6px).
- **Primary:** Amber background with dark-slate ink text (`accent` / `accent-ink`), semibold, minimum 44px height in the nav and 48px in the form; padding 10–12px × 20–28px. Carries the Micro shadow.
- **Hover / Focus:** Hover darkens to amber-strong (never lightens); press translates down 1px; focus-visible ring is 2px accent at 60% on white surfaces. Disabled: 60% opacity, wait cursor.
- **Secondary / Ghost:** Underlined text links (`Send another enquiry`) in navy-mid with a 2px amber underline offset 4px — the quiet variant, used only inside success states.

### Inputs / Fields
- **Style:** White background, 1px slate-300 border, 6px radius, 12×16px padding; labels above in ink-700 medium; placeholders in ink-400.
- **Focus:** Border shifts to navy-line and a 2px accent ring at 60% appears — the same door language as the CTA.
- **Error:** Field-level message in danger-ink (medium weight) below the field; form-level alert is a rounded-md panel with danger-border stroke on danger-tint fill, `role="alert"`, naming the problem and the recovery ("try again, or email us directly").

### Cards / Containers
- **Corner Style:** 12px for content frames.
- **Background:** Paper white; navy bands are full-bleed sections, not cards.
- **Shadow Strategy:** Frame shadow (see Elevation).
- **Border:** 1px slate-200 on screenshot frames; the contact form is the one card with a 2px amber border — it is the page's door.
- **Internal Padding:** 24–32px.

### Navigation
- **Style:** Sticky, white at 90% opacity with backdrop blur and a hairline bottom border; 64px tall.
- **Typography/States:** Links in ink-600 medium (14px), hover to ink-900; hidden below 768px where only the CTA survives. The CTA keeps its full height on mobile so the nav never disappears into a hamburger.

### Screenshot Frame (signature)
Every product screenshot ships in the same frame: a navy portal bar (36px tall, amber dot + "Property NI" wordmark + a small label at right) above the image, wrapped in a 12px-radius white card with the hairline border and Frame shadow. The frame is what makes a PNG read as the live portal; screenshots are never placed bare on the page. Frames are keyboard-focusable (tabIndex 0) with a 2px accent focus ring.

### Motion
Scroll-reveal is the only authored motion: elements fade in and rise 16px over 550ms on an exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`), staggered 60–120ms within a section, triggered once at ~25% visibility. Smooth scrolling is enabled page-wide. Both are fully disabled under `prefers-reduced-motion` (elements render visible, no transition).

## Do's and Don'ts

### Do:
- **Do** alternate navy chrome bands and white working surfaces; keep each section one or the other.
- **Do** frame every product screenshot in the portal-bar card with the Frame shadow.
- **Do** use amber only for action and focus (CTA, focus rings, door borders), with dark-slate ink on top.
- **Do** cap body copy at ~65ch and keep section padding 80–112px so bands breathe.
- **Do** honor `prefers-reduced-motion`: reveals render visible with no transition.

### Don't:
- **Don't** put white text on amber; the accent's ink is dark slate, always.
- **Don't** add a second accent color or use amber as a fill, background band, or heading treatment.
- **Don't** place screenshots bare on the page without the portal-bar frame.
- **Don't** introduce shadows on flat sections; shadows follow frames only.
- **Don't** animate for decoration — motion is scroll-reveal and state confirmation only.
