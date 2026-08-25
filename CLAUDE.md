# Grüezi Schweiz

An independent guide for backpackers and slow travellers in Switzerland. Currently a **design-canvas prototype**, not an application — no package manifest, no build tool, no backend, no repo. Full build spec: [gruezi-schweiz-spec.md](gruezi-schweiz-spec.md).

## What's actually here

- `design-source/*.dc.html` — six artboards (`Main`, `Mobile`, `Region`, `RailPasses`, `Hostels`, `FindTrip`), the source of truth the spec was distilled from. See [design-source/canvas.json](design-source/canvas.json) for layout/paging metadata.
- `gruezi-schweiz-spec.md` — the developer handoff spec. Read this before implementing anything; it's authoritative over the artboards where they'd ever conflict.
- `gruezi-schweiz-article.html`, `gruezi-schweiz-spec.html` — standalone rendered HTML, not templated.

## The `.dc.html` template format

These files are **not plain HTML** — they use a design-canvas templating DSL: `<x-dc>` wrapper, `support.js`, `{{variable}}` interpolation, `<sc-for list="{{items}}" as="item">` loops, `onClick="{{handler}}"`. Don't "fix" `{{}}` as broken markup. When translating to a real production stack, treat the DSL as a spec of *behaviour*, not code to lift verbatim.

## Design system (spec §2)

CSS custom properties for every color token (`--paper`, `--ink`, `--red`, etc. — see spec §2.1). `--red` is a live-tweakable accent swatch, never hardcode red hex values. Two Google Fonts: Bodoni Moda (display, `.serif`) + Karla (body). Exact type ramp, spacing (80px desktop / 20px mobile gutter), radii, and motion recipes are all specified precisely in §2.2–2.4 — spec says explicitly not to round these to a 4/8px grid. Every image is a CSS-drawn `.scene` placeholder (gradient + ridge silhouettes), to be replaced with licensed photography before launch.

## Scope (spec §1)

**In for v1:** Landing, Region (Bernese Oberland only), Rail Passes, Hostels, Find a Trip — desktop 1440px + mobile 390px.
**Explicitly out for v1:** booking/payment (outbound handoff only), user accounts (localStorage only), free-text search wiring, additional regions, localisation. Don't build toward these without being asked.

## Data — the actual blocking risk (spec §3, §7)

Two areas are blocking and currently sample data: rail fares/passes (§3.1 — the fare formula `distance × 0.55 CHF/km` is a placeholder to be **removed**, not tuned) and hostel inventory (§3.2 — needs real dorm/twin/four-bed rates per property). Every price the site doesn't control must show provenance + a "checked on" date (§3.4). Open questions Q1–Q3 (§7) block Rail Passes and Hostels specifically and are unresolved on purpose — don't assume a default answer for them.

## Interactive logic (spec §5)

Carousel, national/region maps, catalog tabs, hostel allocator, rail pass comparator, and trip filters each have explicit state models and acceptance criteria in §5 — use those as the test plan. The hostel allocator (§5.4) is the most complex logic on the site; read it in full before touching it.

## Accessibility & responsive (spec §6)

Current artboards do **not** yet satisfy these — treat every item as an open task: fluid breakpoints, comparison tables → stacked cards on mobile (never horizontal scroll), 44px touch targets, visible focus rings, keyboard nav for map pins/carousel, `aria-pressed`/live-region for map filter state, and the `--faint` contrast failure below 18px.

## Definition of done

See spec §9 for the launch checklist — treat it as the acceptance bar for any "is this ready" question.

## Agents

- **ออม (Aom) — Frontend UI Engineer** (`aom-frontend-ui-engineer`) — implements/modifies artboards and interactive behaviour against the spec.
- **พีช (Peach) — Findings Auditor** (`peach-findings-auditor`) — audits pricing/data sourcing, accessibility, and Definition of Done compliance.

No guardrail hooks configured — no secrets, git repo, or destructive scripts exist in this project to guard against. Re-run `/claude-bootstrap` if that changes (e.g. once a real backend/build/repo is added).
