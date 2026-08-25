# Grüezi Schweiz — Build Specification

**Product:** An independent guide for backpackers and slow travellers in Switzerland.
**Document type:** Developer handoff spec.
**Source of truth:** the design canvas (6 artboards: `Main`, `Mobile`, `Region`, `RailPasses`, `Hostels`, `FindTrip`).
**Status:** Design complete, sample data throughout. Not yet wired to any live source.

---

## 1. Scope

### In scope for v1

Five surfaces, desktop at 1440px and mobile at 390px:

| Surface | Artboard | Purpose |
|---|---|---|
| Landing page | `Main` / `Mobile` | Positioning, history, inspiration, souvenir catalog, national recommendation map |
| Region page | `Region` | One region in depth — valley map, landmarks, bases, a worked route |
| Rail Passes | `RailPasses` | Work out which way of paying for trains is cheapest |
| Hostels | `Hostels` | Price beds for a real group size, not a headline dorm rate |
| Find a Trip | `FindTrip` | Enter from a month and a budget rather than a place |

### Explicitly out of scope for v1

- **Booking and payment.** Every primary CTA ("Hold these beds", "Where to buy it") is an outbound handoff to an operator or OTA. No cart, no checkout, no PCI surface.
- **User accounts.** "Add to route" and "Save this route" persist to local storage only. Sync across devices is v2.
- **Free-text search.** The Find a Trip search field is presentational in v1 — the filters do the work. Wiring the field means a query parser and a relevance model; that is its own project.
- **More than one region page.** `Region` is built as Bernese Oberland. The template must be data-driven so the other three regions are content, not code — but only one is populated at launch.
- **Localisation.** English only. Copy is written for it; do not add an i18n layer speculatively, but keep strings out of markup where it is free to do so.

---

## 2. Design system

Everything below is lifted from the artboards. Use these values exactly; do not round them to a 4/8px grid.

### 2.1 Colour

| Token | Value | Used for |
|---|---|---|
| `--paper` | `#FAF8F5` | Default page background |
| `--band` | `#F1EBE3` | Alternating section background, table headers |
| `--ink` | `#16130F` | Body text, dark sections, footer |
| `--ink-2` | `#4A423B` | Secondary body copy |
| `--muted` | `#6E6862` | Supporting copy, table cells |
| `--faint` | `#8A8078` | Eyebrows, captions, disabled |
| `--line` | `#E4DED5` | Card and section borders |
| `--line-2` | `#EDE7DE` | Inner dividers inside cards |
| `--white` | `#FFFFFF` | Card fills, chip fills |
| `--red` | `#C31B18` | The single accent. **Tweakable.** |
| `--red-hover` | `#8E110F` | Link hover |
| `--red-tint` | `#FCF4F3` | Winning-row background in comparison tables |

Dark sections (`Main` map, `Region` map, all sticky recommendation panels, footers):

| Token | Value | Used for |
|---|---|---|
| `--dark` | `#16130F` | Section background |
| `--dark-panel` | `#1F1B16` | Map surface inside a dark section |
| `--dark-border` | `#332C25` | Panel borders, dividers |
| `--dark-line` | `#4A4036` | Map outlines, inactive chip borders |
| `--on-dark` | `#FBF9F6` | Headings on dark |
| `--on-dark-2` | `#E4DAD3` | Body on dark |
| `--on-dark-3` | `#D7CCC4` | Labels on dark |
| `--on-dark-4` | `#B7AEA5` | Supporting on dark |
| `--on-dark-accent` | `#E8877F` | Eyebrows on dark (red is illegible there) |

**Red discipline.** Red is a precision accent, never a fill for large areas. It appears on: primary buttons, active chips, selected map pins, eyebrows on light backgrounds, prices, the flag mark, and the "Best rate" badge. It never tints a section background.

`--red` is exposed as an editable tweak on every artboard with a swatch set of `#C31B18 / #D8232A / #8E110F / #16130F`. Implement it as a CSS custom property on the page root so the whole accent system moves with one value.

### 2.2 Typography

Two families, both Google Fonts:

- **Display — Bodoni Moda**, weights 400 and 500. Fallback stack: `"Didot", Georgia, serif`. Applied via a `.serif` class.
- **Body — Karla**, weights 300, 400, 500, 600, 700. Fallback stack: `"Helvetica Neue", Arial, sans-serif`.

Ramp as built:

| Role | Size / line-height / weight | Notes |
|---|---|---|
| Hero h1, landing | 96px / 0.96 / 400 | `letter-spacing: -0.015em` |
| Hero h1, inner pages | 62–78px / 1.00–1.02 / 400 | Region 78, Find a Trip 74, Rail 66, Hostels 62 |
| Section h2 | 50–54px / 1.04 / 400 | |
| Card h3 | 22–38px / 1.06–1.14 / 400 | |
| Lead paragraph | 17px / 1.72 / 300 | |
| Body | 15–16.5px / 1.62–1.70 / 300 | |
| UI label / table cell | 14–14.5px / 400–500 | |
| Eyebrow | 12px / 1 / 600, `letter-spacing: .22em`, uppercase | On dark, use `--on-dark-accent` |
| Table header | 12px / 600, `letter-spacing: .10em`, uppercase | |
| Caption / footnote | 12.5px / 300 | |

`text-wrap: pretty` is set on `body`. Keep it.

### 2.3 Spacing and layout

- **Desktop canvas:** 1440px fixed. Page gutter **80px**.
- **Mobile canvas:** 390px. Page gutter **20px**.
- **Section rhythm:** 76–110px top padding, 86–110px bottom. Hero sections are absolutely sized (see §4).
- **Grid gaps:** cards 20–26px, dense grids 18–22px, two-column page splits 36–56px.
- Every sibling group — chips, buttons, cards, nav items, table rows — is laid out with flex or grid plus `gap`. No margin-based spacing between siblings.

### 2.4 Radii, shadows, motion

- Radii: **2px** buttons and image frames, **3px** cards and panels, **999px** chips and pills, **50%** step buttons and map dots.
- Card hover: `translateY(-5px)`, `0 22px 40px rgba(22,19,15,.12)`, border to `#D6CEC3`.
- 3D card: rest `0 18px 44px rgba(22,19,15,.16)` → hover `rotateY(-9deg) rotateX(5deg) translateZ(26px)` with `0 40px 80px rgba(22,19,15,.30)`, over `.5s cubic-bezier(.2,.7,.3,1)`. The rotating element carries `transform-style: preserve-3d` and **must not** also carry `overflow: hidden` — that flattens the transform in every current browser. Clipping goes on a child.
- Carousel slide: `.75s cubic-bezier(.22,.72,.24,1)` on `transform`.
- Everything else: `.18s`–`.3s ease`.

### 2.5 Components

| Component | Height | Padding | Notes |
|---|---|---|---|
| Primary button | 54px | 0 28px | `--red` fill, white text, 2px radius, `translateY(-2px)` on hover |
| Compact button | 44–48px | 0 20px | Header CTA, card actions |
| Ghost button (on dark) | 48–54px | 0 20–28px | `inset 0 0 0 1px rgba(251,249,246,.55)` |
| Chip | 46px | 0 18px | 999px radius, 1px `--line` border. Active = `--red` fill, white text |
| Compact chip | 42–44px | 0 14–16px | Filter rows with many options |
| Stepper button | 44 × 44px | — | Circular, 1px `--line`, hover to `--red` |
| Search field row | 62px button inside | 12px 12px 12px 28px | Find a Trip only |
| Map pin | 15px dot, 4px ring | — | See §5.2 |

**Icon rule.** Every interactive control pairs an inline SVG icon with a text label. Icons are stroke-based on a 24px viewBox, `stroke-width` 1.6–1.8, `stroke-linecap` and `stroke-linejoin` round, rendered at 16–22px. **No emoji, no icon fonts.** Icons inherit `currentColor` so they recolour with their control.

### 2.6 Photography

Every image in the canvas is a **CSS-drawn placeholder**: a layered scene of sky gradient, three ridge silhouettes with `clip-path`, a water band, a grain overlay and a vignette. Six sky palettes (`sky-dawn`, `sky-clear`, `sky-dusk`, `sky-mist`, `sky-storm`, `sky-gold`) crossed with six rock tones (`t-alpine`, `t-rose`, `t-emerald`, `t-glacier`, `t-slate`, `t-golden`).

**Build requirement:** replace every `.scene` block with licensed photography before launch. The class names are the specification for what each slot needs — `sky-storm t-glacier` means a dramatic overcast glacier shot, `sky-gold t-golden` a warm low-sun valley. Keep the same aspect ratios and the same gradient overlays on top of the real images; the text contrast depends on them.

---

## 3. Data requirements

The design runs on sample values throughout. Every number below must come from a real source before launch. Treat these as build dependencies, not content tasks.

### 3.1 Rail fares and passes — **blocking**

| Field | Needed for | Candidate source | Notes |
|---|---|---|---|
| Point-to-point 2nd-class adult fare, station A → B | Rail Passes comparison table | SBB / Swiss public transport open data | The design currently derives fare from a straight-line distance × 0.55 CHF/km. **This is a placeholder formula and must be replaced.** |
| Half Fare Card price | Comparison row | SBB tariff | Currently CHF 120 / 1 month |
| Saver Day Pass price | Comparison row | SBB | Currently flat CHF 52/day. Real pricing varies by date and how far ahead you book — see open question Q1 |
| Swiss Travel Pass tiers | Comparison row + recommendation | Swiss Travel System | Currently 3d/244, 4d/295, 6d/379, 8d/419, 15d/459 |
| Regional pass prices | Pass cards, Region cross-link | Regional operators | Currently "from CHF 250 / 3 days" |
| Station list | Both selectors | SBB station registry | Currently 10 hard-coded stations |

**Rounding and display:** all fares display as whole francs, `CHF n`, no decimals. Pass prices are quoted 2nd class, adult, no Half Fare unless stated.

### 3.2 Hostel inventory — **blocking**

Per property: name, town, region id, walk-time to station, and **three nightly rates** — dorm bed (per person), twin room (per room), four-bed room (per room). Availability by date is required for the "Hold these beds" handoff but not for the pricing display.

Candidate sources: Hostelling International, Hostelworld / Booking affiliate feeds, or direct agreements. Pick one before build — the allocator's room-type model (§5.4) assumes all three room types exist at every property, and a feed that only exposes dorm rates breaks it.

### 3.3 Editorial content — non-blocking

Landmarks, history timeline, souvenir catalog, trip cards, region copy and route days are **editorial**, hand-maintained in a CMS. They do not need an integration. Model them as structured content types, not free HTML, because every one of them drives a filter (see §5).

### 3.4 Data honesty requirement

Wherever a price is shown that the site does not control, the page must display its provenance and freshness. Every page currently carries a footer disclaimer; keep it, and add a "checked on" date once real data lands. Never present a derived or cached fare as a live quote.

---

## 4. Page specifications

### 4.1 Landing page (`Main`, 1440 × ~8900px)

Sections in document order:

1. **Hero banner** — 860px. Full-bleed scene, dark gradient overlay top and bottom. Top bar carries the flag mark, wordmark, four icon+label nav items and the "Plan My Route" CTA. Headline at 96px over a 560px-wide lead paragraph, two CTAs, and a four-cell stat strip pinned to the bottom edge with a translucent dark backdrop and `backdrop-filter: blur(3px)`.
2. **History** — 12-column grid, 4/4/4. Left: section intro. Middle: an eight-entry timeline, each row a 96px year column beside title and body, separated by 1px top borders. Right: a scene image with a caption that names it as a placeholder.
3. **3D cards** — three cards, 620px tall, in a 3-column grid. See §2.4 for the transform. Badge and text block lift on `translateZ(50px)`.
4. **Huge carousel** — 780px, full-bleed. See §5.1.
5. **Image gallery** — 4-column grid, `grid-auto-rows: 236px`, nine tiles using span-based auto-placement that tiles exactly into 4 rows: `2×2, 1×1, 1×2, 1×1, 2×2, 1×1, 1×1, 1×1, 1×1`. Hover raises saturation and scales 1.02.
6. **Catalog** — `--band` background, three filter tabs, 4-column product grid. See §5.3.
7. **Recommendation map** — dark section. See §5.2.
8. **About** — 5/7 split; right side is a 3×3 fact grid built as a 1px-gap grid over a `--line` background so the gaps read as hairlines.
9. **Footer** — dark, wordmark and blurb beside three link columns, then a bottom bar.

**Mobile (`Mobile`, 390 × ~3900px)** carries the same sections in the same order, minus the carousel (replaced by a horizontally-scrolling card row) and with the gallery cut to six tiles in two columns. It adds a five-item bottom tab bar. Sections must not be dropped on mobile — the mobile artboard covers every landing-page section the desktop does.

### 4.2 Region page (`Region`, 1440 × ~4700px)

1. **Header** — shared, "Regions" active.
2. **Hero** — 560px, breadcrumb `Regions › Bernese Oberland`, 78px title, lead paragraph, four-cell key-fact strip on a translucent dark ground.
3. **Mini map** — dark section. Four type filters, a valley-scale SVG map with nine pins, and a 420px detail card to the right. See §5.2.
4. **Recommended landmarks** — 3-column grid of six ranked cards. Rank badge is a 34px red circle at top-left of the image. Each card carries effort and cost on one footer row. **Ranking is editorial and explicitly not by fame** — the copy says so, so the CMS needs a manual rank field, not a popularity sort.
5. **Where to base yourself** — 380px intro column beside a five-column comparison table (base, dorm from, access to trailheads, evening character, best for). Four rows.
6. **Three days from one bed** — `--band` section, three day cards, each with a numbered heading and three time-stamped steps plus a fares line.
7. **Cross-links** — three `.xlink` cards to Rail Passes, Hostels, Find a Trip.
8. **Footer** — slim variant, two lines.

### 4.3 Rail Passes (`RailPasses`, 1440 × ~3600px)

1. **Header** — "Rail Passes" active.
2. **Hero** — 420px, left-weighted gradient, 66px headline.
3. **Price comparison** — the core of the page. Left column: a control card (from-station chips, to-station chips, moving-days stepper) above a four-row comparison table. Right column: a **sticky** dark recommendation panel (`position: sticky; top: 20px`). See §5.5.
4. **Pass cards** — four cards explaining what each product actually is, each with an icon, price line, body and a "who it's for" footer.
5. **Passes by region** — `--band` section, four region cards linking to region pages.
6. **Cross-links** — two cards.
7. **Footer.**

### 4.4 Hostels (`Hostels`, 1440 × ~3200px)

1. **Header** — "Hostels" active.
2. **Hero** — 400px, 62px headline.
3. **Allocator** — left column holds a control card (people stepper, nights stepper, three sleeping-preference chips, four region chips) and below it the **room-mix diagram**. Right column is a sticky dark best-rate panel. See §5.4.
4. **Hostel list** — five-column table: hostel + town, room mix for the group, per-person-per-night, walk to station, total. Rows are clickable and drive the diagram above. Cheapest row carries the "Best rate" badge.
5. **Cross-links** — `--band` section, two cards, both label-interpolated with current state ("Back to {region}", "…for {nights} days of moving").
6. **Footer.**

### 4.5 Find a Trip (`FindTrip`, 1440 × ~2600px)

1. **Header** — "Find a Trip" active.
2. **Search hero** — 800px, full-bleed scene. Centred 74px headline, then a 980px-wide search box: magnifier icon, a real `<input>` with a placeholder, and a 62px primary button. Below it a translucent filter panel with four labelled rows of chips.
3. **Results** — header line reporting how many filters are applied and how many trips fit, a "Clear filters" chip, then a 3-column card grid. Each card shows region eyebrow, days pill, title, body, style tags and a from-price.
4. **Empty state** — replaces the grid when nothing matches. Icon, heading, a sentence advising which filter to loosen first, and a clear-filters button.
5. **Cross-links** — three cards.
6. **Footer.**

---

## 5. Interactive behaviour

All state is client-side and ephemeral in v1. Nothing below requires a server round-trip.

### 5.1 Carousel (landing)

- State: `slide` (integer index).
- Track width is `slides.length × 100%`; each slide is `100 / slides.length %`; the track translates by `-(100 / slides.length) × slide %`. **Do not hard-code these to the current slide count.**
- "Previous" and "Next valley" both wrap in their direction.
- Position indicators are **labelled**: a 3px bar above the region name, active bar `--red` and name `--on-dark`, inactive bar `rgba(251,249,246,.34)` and name `rgba(251,249,246,.55)`.

**Acceptance**
- Given four slides, when the user clicks Previous on slide 1, then slide 4 shows.
- Given the slide list grows to six, when the page renders, then the track and slide widths adapt with no code change.
- Given any slide is active, then exactly one indicator is in the active state and its region name matches the visible slide.

### 5.2 Maps (landing + region)

Two instances of one pattern. The landing map is national (nine destinations, five traveller-type filters); the region map is valley-scale (nine places, four type filters).

- State: `filter` (string, `all` by default) and `selected` (index).
- A pin that matches the filter renders at full opacity; a pin that does not drops to **`opacity: .22`** and stays clickable.
- The selected pin inverts — red fill, white ring, `scale(1.35)`.
- Selecting any pin swaps the detail card beside the map: image, region/type eyebrow, name, body, and two to three icon+label fact rows.
- The legend must explain **all** rendered states, including the dimmed one.
- Pins are absolutely positioned by percentage inside a container whose `padding-bottom` matches the SVG's aspect ratio, so they track the map at any width.

**Acceptance**
- Given the "Hiking" filter, when applied, then non-hiking pins dim but remain clickable and the chip shows the matching count.
- Given a dimmed pin is clicked, then it becomes selected and the detail card updates.
- Given any two pins, then their name labels do not overlap at the design width. (Label collision is a real risk — verify after any coordinate change.)

### 5.3 Catalog tabs (landing)

- State: `shop` ∈ `all | grocery | souvenir`.
- Filtering hides non-matching cards. The grid must not reflow into ragged rows — hide, do not reorder.

### 5.4 Hostel allocator — **the most complex logic on the site**

State: `people` (1–12), `nights` (1–21), `mode` ∈ `cheap | mixed | private`, `region`, `hostel`.

Allocation rules, per property, per night:

| Mode | Rule | Cost |
|---|---|---|
| `cheap` | Everyone in the shared dorm | `people × dorm` |
| `private` | `ceil(people / 2)` twin rooms | `ceil(people / 2) × twin` |
| `mixed` | `floor(people / 4)` four-bed rooms; remainder of 1 → one dorm bed; remainder of 2–3 → `ceil(remainder / 2)` twins | sum of the above |

Then: `total = perNight × nights`, and `perPersonPerNight = round(total / people / nights)`.

The room-mix diagram renders one bed icon per **bed of capacity**, not per person. Beds that are paid for but unoccupied — the sixth bed when five people take three twins — render in `--line` grey, and a line beside the summary reports "n bed paid for and empty". This is the point of the whole feature: it makes the cost of an odd number visible.

Bed icon colours by room type: dorm `--faint`, twin `--red`, four-bed `--ink`.

The list re-prices and **re-sorts ascending by total** on every state change. The badge follows the cheapest row, not a fixed property.

**Acceptance**
- Given 5 people in `mixed` mode, then the allocation is one four-bed room plus one twin, capacity 6, with one grey bed icon and an "1 bed paid for and empty" note.
- Given 1 person in `private` mode, then one twin room is allocated and charged in full.
- Given the people count changes, then every row's total, per-person-per-night and sort position update, and the best-rate badge moves if the cheapest property changed.
- Given a property is selected in the list, then the diagram above shows that property's mix and the row is tinted `--red-tint`.
- Given the group exceeds a property's real capacity, then — **not yet designed.** See Q3.

### 5.5 Rail pass comparison

State: `from`, `to` (station indices), `days` (1–15).

Current placeholder maths, to be replaced per §3.1:
`km = round(euclidean(from, to) × 1.25)`, `fare = max(8, round(km × 0.55))`.

Option totals:

| Option | Up front | Per journey | Total |
|---|---|---|---|
| Point-to-point | — | `fare` | `days × fare` |
| Half Fare Card | 120 | `round(fare / 2)` | `120 + days × round(fare / 2)` |
| Saver Day Pass | — | 52 | `days × 52` |
| Swiss Travel Pass | tier price | included | tier price |

Swiss Travel Pass tier = the first tier whose day count is ≥ `days`; above 15 days, the top tier.

The cheapest option wins: its row gets `--red-tint` background, red total and a "Best rate" badge; the sticky panel restates it with a plain-language rationale and names the runner-up with the gap between them.

**Acceptance**
- Given a short leg and 2 moving days, then point-to-point wins.
- Given the same leg and 10 moving days, then the Swiss Travel Pass wins and the panel headline changes with it.
- Given `days` is at 1, then the decrement control does not go below 1; likewise 15 at the top.
- Given any state, then exactly one row carries the badge and the panel's named option matches it.

### 5.6 Find a Trip filters

- Four independent groups: season, length, budget, style. Default `any` on each.
- Filters combine with **AND**. Season and style match against arrays on each trip; length and budget match a single value.
- The results header reports the applied filter count and the result count, both pluralised correctly.
- Zero results shows the empty state, which names the season filter as the one to loosen first.
- "Clear filters" resets all four groups in one action.

---

## 6. Responsive and accessibility requirements

These are **requirements the current artboards do not yet satisfy** — they are the build's job.

- **Breakpoints.** The canvas defines 1440 and 390. Build fluid between them: three-column grids collapse to two below ~1100px and one below ~760px; five-column tables become stacked cards below ~900px; the 80px gutter scales to 40px then 20px.
- **Comparison tables on mobile.** The Rail Passes and Hostels tables cannot scroll horizontally — that is the least usable option for a price comparison. Each row becomes a card with the label/value pairs stacked, the total and badge at the top.
- **Touch targets.** Every control in the design is ≥ 42px. Hold that line; the map pin's 15px dot needs a ≥ 44px invisible hit area around it.
- **Focus states.** Not drawn. Every chip, button, stepper, pin, table row and card link needs a visible focus ring — use a 2px `--red` outline with a 2px offset, and never remove the default without a replacement.
- **Keyboard.** The map is a list of buttons before it is a map; pins must be tabbable in a sensible order. The carousel needs arrow-key support when focused. The steppers are buttons, not spinners — but each stepper pair also needs an accessible label naming what it counts.
- **Screen readers.** The `.scene` placeholders are decorative and take `aria-hidden`; real photography takes real alt text. The dimmed map state must be conveyed non-visually — `aria-pressed` on the filter chips and a live region announcing "n of 9 places match".
- **Contrast.** `--faint` `#8A8078` on `--paper` is around 3.6:1 — it passes for large text only. Do not use it below 18px for anything a user must read; it is currently used at 12–13px for eyebrows and captions, which needs a darker value or a size bump before launch.
- **Motion.** Honour `prefers-reduced-motion`: drop the 3D card transform, the carousel slide transition and the card hover lifts to instant state changes.

---

## 7. Open questions

| # | Question | Owner | Blocking? |
|---|---|---|---|
| Q1 | Saver Day Pass pricing is dynamic by date and booking lead time. Do we quote a single indicative price, a range, or require a date input on the comparison? A date input changes the whole control layout. | Product + Data | **Yes** — changes the Rail Passes design |
| Q2 | Which hostel data source? The allocator assumes dorm, twin and four-bed rates exist per property. If the chosen feed only exposes dorm rates, the `mixed` and `private` modes cannot ship. | Engineering | **Yes** |
| Q3 | What happens when a group exceeds a property's real capacity for the chosen room type — hide the property, show it as unavailable, or fall back to a mixed allocation? Not designed. | Design | **Yes** |
| Q4 | Rail fares are per-journey, but a "moving day" may contain several journeys. Do we let users add multiple legs, or keep the single-leg simplification and say so? | Product | No — v1 can ship the simplification if labelled |
| Q5 | Do "Add to route" and "Save this route" survive a browser clear? If they must, we need accounts, which is currently out of scope. | Product | No |
| Q6 | Photography: licensed stock, commissioned, or user-submitted? Affects the launch date more than any other open item. | Product | No, but long lead time |
| Q7 | Is the region page template genuinely data-driven, or is Bernese Oberland special-cased? The map SVG in particular is hand-drawn for this valley. | Engineering | No for v1, yes before region two |

---

## 8. Suggested phasing

**Phase 1 — the guide.** Landing page, Region page, Find a Trip. All editorial content, no external data. Ships without resolving Q1–Q3.

**Phase 2 — the calculators.** Rail Passes and Hostels, once the data sources in §3 are settled. These are the pages that make the site useful rather than pretty, and they are also the two that can be wrong in ways that cost the reader money — hold them until the numbers are real.

**Phase 3 — the rest of the regions.** Once the Region template is proven data-driven, populate Valais, Graubünden and Ticino.

---

## 9. Definition of done

- [ ] Every `.scene` placeholder replaced with licensed photography, with alt text
- [ ] Every price traced to a named source, with a visible "checked on" date
- [ ] The placeholder fare formula removed, not merely tuned
- [ ] All bracketed placeholders filled: `[YEAR]`, `[YOUR EMAIL]`, `[YOUR INSTAGRAM]`
- [ ] Focus states on every interactive element
- [ ] Comparison tables usable on a 390px screen without horizontal scroll
- [ ] `prefers-reduced-motion` honoured
- [ ] The allocator's edge cases from §5.4 verified, including the empty-bed case
- [ ] Every filter combination on Find a Trip reachable, including the zero-result state
