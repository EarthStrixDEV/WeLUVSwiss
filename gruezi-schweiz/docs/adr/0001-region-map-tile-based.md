# 0001: Region map moves to a real OSM tile layer, national map stays SVG

**Status:** accepted

## Context

The original build spec (§5.2) specifies both the national map (landing) and the region map (region page) as hand-drawn SVG artwork with percentage-positioned pins — explicitly stating "the map UI does not change" and that no JS map widget (Leaflet/OpenLayers) should be embedded, keeping geo APIs as data-only sources.

Implementing real place search (geo.admin.ch primary, OSM Nominatim fallback) surfaced a decision: once Place coordinates are real lat/lng instead of hand-picked percentages, the region map's pins need a real projection to plot against. Two options were available: keep the SVG and calibrate a manual affine transform (lat/lng → SVG %) per map, as the original draft spec proposed; or replace the SVG background with a real OSM tile layer and let the mapping library's own projection place the pins.

## Decision

The **Region Map only** (valley-scale, Bernese Oberland) moves to a real OSM tile layer. Its 9 pins move from percentage-position data to real lat/lng, sourced from geo.admin.ch (falling back to OSM Nominatim, Swiss-bounding-box filtered).

The viewport is **locked** — the tile layer renders a fixed view; users cannot pan or zoom. This preserves the existing pin/filter/detail-card interaction contract (spec §5.2: dim/select state, legend, live region) without redesigning it for an unbounded viewport.

The **National Map** (landing page) is explicitly out of scope for this change and remains the hand-drawn SVG with percentage-positioned pins, unchanged.

## Consequences

- The manual affine-transform calibration described in the original draft (`docs/map-search-implementation-spec.md` §2, open item A) is no longer needed for the Region Map — the tile library's projection replaces it. That draft document is superseded by this ADR and [CONTEXT.md](../../CONTEXT.md).
- The two map surfaces are no longer visually/architecturally identical: the National Map and Region Map now use different rendering strategies (SVG vs. tile layer) even though they share the same `MapExplorer` filter/select/legend interaction shell. Future readers should not assume changes to one automatically apply to the other.
- A tile-rendering library (e.g. Leaflet or MapLibre) is introduced as a new dependency, scoped to the region map only — this is the first client-side mapping library in the project.
- `© swisstopo` attribution (required by geo.admin.ch's OGD terms) must be visible on any map using its data; this applies regardless of SVG or tile rendering.
- If a future iteration wants free pan/zoom on the Region Map, the locked-viewport constraint will need revisiting alongside how pins/labels behave at arbitrary zoom levels — not addressed by this decision.
