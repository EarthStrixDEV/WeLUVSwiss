<div align="center">

# 🇨🇭 Grüezi Schweiz

**An independent guide for backpackers and slow travellers in Switzerland.**

*The mountains are three hours from everywhere.*

![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.2-087ea4?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Styling](https://img.shields.io/badge/Styling-CSS%20Modules-C31B18)
![Status](https://img.shields.io/badge/Status-v1%20prototype%2C%20sample%20data-F1EBE3)

</div>

---

Switzerland is small enough to cross before lunch and dense enough to spend a season in. **Grüezi Schweiz** covers the routes, the rail passes, the hostels and the corner-shop chocolate that make it affordable on a backpack budget — with calculators that price things for *your* group and *your* moving days, not a marketing headline.

The project began as a six-artboard design canvas, was distilled into a written build specification, and is now implemented as a fully static Next.js site. All three stages live in this repository.

## 📦 What's in this repo

| Path | What it is |
|---|---|
| [`gruezi-schweiz/`](gruezi-schweiz/) | **The Next.js 16 application** — five surfaces, fully static, no backend |
| [`gruezi-schweiz-spec.md`](gruezi-schweiz-spec.md) | **The build specification** — design tokens, page specs, interactive state models with acceptance criteria, a11y requirements, data rules. The single source of truth |
| [`design-source/`](design-source/) | **The original design canvas** — six artboards (`Main`, `Mobile`, `Region`, `RailPasses`, `Hostels`, `FindTrip`) in a design-tool template format, plus `canvas.json` layout metadata |
| [`gruezi-schweiz-article.html`](gruezi-schweiz-article.html) | A standalone long-form article rendering of the guide's editorial content |
| [`.claude/`](.claude/) | Project agents for AI-assisted development (frontend implementer + data-integrity auditor) |

## ✨ The five surfaces

### 🏔 Landing — `/`
The full pitch in one scroll: a 96px Bodoni hero over an alpine photograph, an eight-entry history timeline (why the four languages and the referendums exist), three 3D-tilting travel-style cards, a full-bleed region carousel, a nine-tile photo gallery, a supermarket-and-souvenir field guide with live filter tabs, and the **recommendation map** — tell it what kind of traveller you are and it dims every destination that won't suit you.

### 🗺 Region — `/regions/bernese-oberland`
One region in real depth: an interactive valley map with nine pins filterable by type, six landmarks **ranked editorially, not by fame**, a four-way comparison of where to actually sleep, and a worked three-day route from a single bed. The template is fully data-driven — Valais, Graubünden and Ticino are future *content*, not future code.

### 🚂 Rail Passes — `/rail-passes`
The most useful question in Swiss travel: *which way of paying for trains is cheapest for you?* Pick any two stations and your number of moving days; the comparator prices point-to-point tickets, the Half Fare Card, Saver Day Passes and the Swiss Travel Pass against each other, badges the winner, and explains its reasoning in a sticky recommendation panel — including how far behind the runner-up is.

### 🛏 Hostels — `/hostels`
The most complex logic on the site. A **room allocator** prices beds for a real group: choose people (1–12), nights (1–21), and a sleeping preference — cheapest beds, shared rooms, or privacy — and every property re-prices and re-sorts live. The room-mix diagram draws one icon per **bed of capacity**, so when five people take three twin rooms, the sixth bed you're paying for shows up in grey with an honest *"1 bed paid for and empty"*. Making the cost of an odd-numbered group visible is the entire point of the feature.

### 🔍 Find a Trip — `/find-a-trip`
Enter from a month and a budget rather than a place. Four filter groups (season, length, budget, style) combine with AND logic across nine curated trips, with correct pluralisation, a one-click reset, and an empty state that tells you *which* filter to loosen first.

## 🎨 Design system

The visual direction is **Alpine Editorial** — warm paper, precise serif display type, and Swiss red used with discipline.

- **Colour** — every colour is a CSS custom property. `--paper #FAF8F5`, `--ink #16130F`, a full dark-section palette, and **`--red #C31B18` as the single accent**: buttons, active chips, selected pins, prices, the flag mark. Red never fills a large area, and moving one variable restyles every accent on the site.
- **Type** — [Bodoni Moda](https://fonts.google.com/specimen/Bodoni+Moda) for display (400/500 + italic) and [Karla](https://fonts.google.com/specimen/Karla) for UI and body (300–700), loaded via `next/font`. The type ramp, spacing and radii follow the spec's exact pixel values — deliberately *not* rounded to a 4/8px grid.
- **Icons** — inline stroke SVGs only (24px viewBox, 1.6–1.8 stroke, round caps, `currentColor`). No emoji, no icon fonts.
- **Motion** — two named recipes (card hover lift, 3D card tilt with `preserve-3d` and clipping on a child), a `.75s` custom-bezier carousel slide, and a global `prefers-reduced-motion` kill switch.

## ♿ Accessibility & responsive

Built as first-class requirements, not an afterthought:

- Fluid from 1440px desktop to 390px mobile (breakpoints at 1100 / 900 / 760; gutters 80 → 40 → 20px), with content capped at the 1440px canvas on wider screens while section backgrounds bleed full-width
- Comparison tables **restack into cards** below 900px — price comparisons never scroll horizontally
- Every control ≥ 42px; map pins carry an invisible 44px hit area around a 15px dot
- Visible 2px focus rings, keyboard-navigable map pins, arrow-key carousel
- `aria-pressed` on every filter chip and screen-reader live regions announcing match counts, allocations and recommendations
- A five-item bottom tab bar replaces the header nav on mobile

## 🧮 Honest numbers (and their limits)

This build runs on **sample data**, and it says so on every page.

- Rail fares derive from a placeholder formula (`straight-line km × 0.55 CHF`) that is [isolated and flagged in one file](gruezi-schweiz/lib/rail-calc.ts) — it must be **replaced with real SBB fares, not tuned**, before launch
- Hostel rates are sample values pending a feed with real dorm/twin/four-bed prices per property
- Every price the site doesn't control must ship with provenance and a "checked on" date (spec §3.4) — the disclaimers and asterisks in the UI mark exactly where that work lands
- Booking and payment are deliberately out of scope: every primary CTA is an outbound handoff, so there is no cart, no checkout, no PCI surface

The spec's [§7 open questions](gruezi-schweiz-spec.md) and [§9 definition of done](gruezi-schweiz-spec.md) track what remains between this prototype and a launchable site.

## 🚀 Getting started

Requires **Node.js 20.9+**.

```bash
cd gruezi-schweiz
npm install
npm run dev       # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build — all five routes prerender statically |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (flat config) |

No environment variables, no database, no API keys — the whole site is static.

## 🏗 Architecture

```
gruezi-schweiz/
├── app/
│   ├── layout.tsx                  # fonts, metadata, bottom tab bar
│   ├── globals.css                 # design tokens, .gutter container, a11y base
│   ├── page.tsx                    # landing (server shell)
│   ├── regions/[region]/           # data-driven region template (SSG)
│   ├── rail-passes/                # + Comparator.tsx client island
│   ├── hostels/                    # + Allocator.tsx client island
│   └── find-a-trip/                # + TripFinder.tsx client island
├── components/                     # shared: Header, Footer, Scene, Chip,
│   ├── map/MapExplorer.tsx         #   Stepper, CrossLinks, the shared map…
│   └── landing/                    # landing-only sections (Carousel, Card3D…)
├── lib/
│   ├── data/                       # typed sample data, transcribed verbatim
│   │                               #   from the design artboards
│   ├── rail-calc.ts                # fare comparison (placeholder formula, flagged)
│   └── allocate.ts                 # hostel room allocation algorithm
└── public/images/                  # photography
```

**Pattern:** pages are React Server Components; interactivity lives in small `"use client"` islands (one per calculator). All state is client-side and ephemeral — nothing requires a server round-trip. The spec's §5 state models and acceptance criteria double as the test plan.

## 🗺 Roadmap

1. **The guide** ✅ — landing, region template, trip finder (editorial content, no external data)
2. **The calculators** — wire Rail Passes and Hostels to real fare and inventory sources; these are the pages that can be *wrong in ways that cost the reader money*, so they hold until the numbers are real
3. **The rest of the regions** — populate Valais, Graubünden and Ticino as data
4. **Photography** — finish replacing placeholder art with licensed images, with alt text

---

<div align="center">

*Not affiliated with any tourist board or transport operator.*

**Grüezi!** 👋

</div>
