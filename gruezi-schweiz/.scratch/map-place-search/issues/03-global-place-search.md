# 03: Global "Find a place" search (Header icon → overlay → navigate), with a mobile entry point

**What to build:** A site-wide place search, independent of the existing (intentionally non-functional) search box on the Find a Trip page. On desktop/tablet, a magnifying-glass icon in the Header (both `floating` and `solid` variants) opens a search overlay; typing queries the place lookup service (ticket 01) with debounced input, and results are filtered to only places within the Bernese Oberland region's bounding box — a place outside current region coverage never appears as a result. Selecting a result navigates to the region page and auto-selects that place's pin using the pin-select mechanism the region map already exposes (ticket 02), reusing the existing detail-card-swap behaviour rather than rendering a new results UI. On mobile, since the bottom tab bar does not gain a 5th tab for this, a separate reachable entry point exposes the same search overlay (e.g. an icon in the mobile header) rather than omitting the feature on mobile entirely.

**Blocked by:** 01, 02

**Status:** ready-for-agent

- [ ] Given any page, when the Header search icon is clicked (floating or solid variant), then a search overlay opens with a text input.
- [ ] Given text is typed into the search overlay, then the lookup (ticket 01) fires debounced (not on every keystroke) and displays matching results.
- [ ] Given a search matches a real place outside the Bernese Oberland bounding box, then that place does not appear in the results list.
- [ ] Given a result is selected, then the app navigates to the Bernese Oberland region page and the corresponding pin is auto-selected — the detail card shows that place, identical to what clicking the pin directly on the map would do.
- [ ] Given no results match the query, then the overlay shows an explicit empty/no-match state rather than an empty blank list.
- [ ] Given the place lookup (ticket 01) reports both sources unavailable, then the overlay shows an "unavailable" state rather than hanging or crashing.
- [ ] Given the existing Find a Trip page search box, then its presentational/non-wired behaviour (per the original build spec) is unchanged by this ticket — this feature does not touch it.
- [ ] Given a mobile viewport, then a reachable entry point opens the same search overlay, and the bottom tab bar still shows only its existing tabs (no new 5th tab added).
