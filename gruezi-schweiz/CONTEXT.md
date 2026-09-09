# Grüezi Schweiz — Domain Glossary

## Place

A single named location shown on a map (e.g. Mürren, Interlaken, Zermatt). Every Place has:
- a canonical **lat/lng** (WGS84) sourced from geo.admin.ch or, as a fallback, OpenStreetMap Nominatim
- one or more **tags** used by map filters (e.g. `hiking`, `lakes-swimming`)
- editorial content (image, body copy, fact rows) authored by hand, not fetched

Places are distinct from **Trips** ([find-a-trip](app/find-a-trip)) — a Trip is a multi-day itinerary suggestion with season/length/budget/style attributes; a Place is a single point on a map. The two search features in the product are not the same feature: see **Place Search** vs the Find a Trip search box below.

## Place Search

The global, site-wide feature for finding a **Place** by typing its name, surfaced from the Header as a magnifying-glass icon that opens a search overlay. Distinct from the search box on the [Find a Trip](app/find-a-trip/TripFinder.tsx) page, which searches **Trips** by natural-language/fuzzy intent ("somewhere quiet with good trains") and remains presentational/non-functional per the original build spec — Place Search does not wire into it and does not change its behaviour.

Place Search results are scoped to the current in-app region coverage (Bernese Oberland only, for v1) via a bounding-box filter — a Place outside that box does not appear as a result, regardless of source. Selecting a result navigates to that Place's region page and auto-selects its pin, reusing the existing pin-select mechanism (spec §5.2) rather than rendering a new results UI.

## Primary Place Source / Fallback Source

**geo.admin.ch** (`api3.geo.admin.ch/rest/services/api/SearchServer`, `sr=4326`) is the primary source for Place coordinates and search — keyless, Swiss-tuned, called client-side.

**OpenStreetMap** (Nominatim) is the fallback/secondary source, used in three ways:
1. Search fallback when geo.admin.ch is unreachable — results are still filtered to the Swiss/regional bounding box before display, since Nominatim's index is global and would otherwise surface non-Swiss noise.
2. Tile background layer for the region (valley-scale) map — see **Region Map** below.
3. Supplementary source for Places geo.admin.ch's index doesn't cover.

This supersedes the earlier draft (`docs/map-search-implementation-spec.md`), which named a since-lost `api-data-sources.md` as the source-of-truth decision doc. That file was never found in the repo; this glossary + [docs/adr/0001-region-map-tile-based.md](docs/adr/0001-region-map-tile-based.md) are the decision record going forward.

## Region Map vs National Map

Two distinct map surfaces sharing the `MapExplorer` interaction pattern (spec §5.2: filter chips, dim/select pin state, legend, live region):

- **National Map** (landing page, [RecommendationMap.tsx](components/landing/RecommendationMap.tsx)) — stays a hand-drawn SVG. Out of scope for the tile migration.
- **Region Map** (region page, [RegionMapTiles.tsx](app/regions/[region]/RegionMapTiles.tsx)) — valley-scale, a real OSM tile layer with a **locked viewport** (no user zoom/pan). Pins are placed from real lat/lng (`lib/data/regions.ts` `Spot.lat/lng`, resolved via `lib/places/lookup.ts`), projected onto the map box as percentages by `lib/map-projection.ts` so they still reuse `MapExplorer`'s existing pin markup.

## Locked Viewport

A map that renders a real tile layer (pan/zoomable by the underlying library) but is configured to present a fixed view — no user-driven zoom or pan. Chosen for the Region Map so the existing pin/filter/detail-card interaction pattern doesn't have to be redesigned for an unbounded viewport in this iteration.
