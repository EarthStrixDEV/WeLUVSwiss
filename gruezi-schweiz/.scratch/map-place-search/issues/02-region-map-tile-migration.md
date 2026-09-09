# 02: Migrate Region Map to real lat/lng pins on an OSM tile layer

**What to build:** The Bernese Oberland region page's valley-scale map renders on a real OSM tile layer instead of the hand-drawn SVG, with its 9 pins placed at real lat/lng (resolved via the place lookup service from ticket 01) instead of hand-picked percentage positions. The viewport is locked — no user pan or zoom — so the existing filter/select/legend/live-region interaction contract (build spec §5.2) carries over unchanged: a pin outside the active filter still dims to opacity .22 and stays clickable, the selected pin still inverts and scales, the detail card still swaps on selection, and the live region still announces the match count. A `© swisstopo` credit is visible on the map per geo.admin.ch's data-usage terms. The National Map on the landing page is untouched by this ticket — it stays the hand-drawn SVG.

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] Given the region page loads, then the map renders as a real OSM tile layer (not the hand-drawn SVG) showing the Bernese Oberland valley, with a fixed/locked view — no pan or zoom controls respond to user input.
- [ ] Given the 9 Bernese Oberland places, then each pin's position on the tile map matches its real-world location (spot-checked against a known reference map), sourced from ticket 01's lookup rather than hand-picked percentages.
- [ ] Given the "Hiking" (or any single) filter is applied, then non-matching pins dim to the existing `.22` opacity and remain clickable, exactly as today's SVG-based map behaves.
- [ ] Given a dimmed pin is clicked, then it becomes selected (inverted fill, white ring, scale) and the detail card beside the map updates — unchanged from current behaviour.
- [ ] Given a screen reader is active, then the live region still announces "n of 9 places match" on filter change, and the legend still explains every rendered pin state including dimmed.
- [ ] Given the map is rendered, then a `© swisstopo` credit is visibly present (not buried in a page-wide footer disclaimer).
- [ ] Given the landing page's National Map, then it remains the existing hand-drawn SVG with percentage-positioned pins — unaffected by this ticket.
