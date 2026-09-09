# Map & Place Search — Implementation Spec

**Purpose:** implementation details for wiring real Swiss geodata into the Mini Map (build spec §5.2) and the place-search behaviour, on top of the source decision already made in `api-data-sources.md` (§1–2).
**Status:** draft, not yet built.
**Depends on:** `gruezi-schweiz-spec.md` §5.2 (Maps interactive behaviour), `api-data-sources.md` §1–2 (source recommendation).

---

## 1. Architecture constraint (recap)

The map UI does **not** change. Both artboards keep the hand-built SVG/dot-map with percentage-positioned pins, filter chips, dim/select states, and the accessibility behaviour already specified in §5.2 (tabbable pins, `aria-pressed` filters, live region announcing match count).

geo.admin.ch and OpenStreetMap are **data sources only** — a REST call that returns coordinates and place names. Neither their JS map widgets (OpenLayers for geo.admin.ch, Leaflet for OSM) get embedded on the page. This means there is no library collision to worry about; the only real integration work is fetching coordinates and converting them into the SVG's existing percentage-position system.

---

## 2. Coordinate pipeline — the one real gotcha

geo.admin.ch's search endpoint (`api3.geo.admin.ch`) defaults to the old Swiss projection **LV03 (EPSG:21781)**, not WGS84. Plotting that directly as lat/lng will be wrong.

**Fix:** always pass `sr=4326` on every request to get WGS84 back.

```
GET https://api3.geo.admin.ch/rest/services/api/SearchServer
    ?searchText=Interlaken
    &type=locations
    &sr=4326
    &limit=10
```

**Conversion to SVG %:** the design places pins by percentage inside a container sized to the SVG's aspect ratio (§5.2). To go from WGS84 lat/lng → `left: n%; top: n%`, calibrate a simple affine transform per map:

1. Pick two known reference points on each artboard's artwork (e.g. two corner landmarks whose real-world lat/lng are known) and record their pixel/percentage position in the SVG.
2. Derive a linear scale + offset for lat→top% and lng→left% from those two points.
3. Apply the same transform to every pin's fetched coordinate.

This needs doing once per map (national map, Bernese Oberland valley map) — not per pin. **Open item:** the two calibration points for each artboard aren't picked yet; needs the actual SVG source to identify stable landmarks to anchor on.

---

## 3. Place search (SearchServer)

Endpoint: `api3.geo.admin.ch/rest/services/api/SearchServer`, `type=locations`, `sr=4326`.

- No API key, CORS-friendly — safe to call directly from client-side JS.
- Debounce input (250–300ms) before firing a request; geo.admin.ch has no documented hard rate limit for normal interactive use, but avoid firing on every keystroke.
- Response gives a ranked list with a label (HTML-highlighted match), a feature/BFS id, and coordinates (once `sr=4326` is set). Use the label for the autocomplete dropdown, the id for cross-referencing (see §5), the coordinates for centering/pin placement.
- Restrict to Swiss results only — this is already implicit since geo.admin.ch's index is Swiss-only.

**Attribution requirement:** per swisstopo's OGD terms, any page using this data needs a visible `© swisstopo` credit. Add it to the map's caption/legend, not buried in a footer-only disclaimer.

---

## 4. Rail & Tourism data — cannot be called client-side

Unlike geo.admin.ch's search endpoint, these two require a secret:

| Source | Auth | Implication |
|---|---|---|
| opentransportdata.swiss | Bearer API key in every request header | Must go through a backend/serverless proxy — never call from browser JS, the key would be visible in the network tab |
| Switzerland Tourism Open Data | Registered API key, rate-limited | Same treatment |

This lines up with `gruezi-schweiz-spec.md` §3.3, which already says tourism content should be **editorial/CMS**, refreshed periodically rather than hit live. Practical shape:

- A small scheduled job (serverless function or cron) calls opentransportdata.swiss / ST's API with the server-held key, and writes the result into the CMS content store or a static config.
- The Rail Passes page and the map's tourism content both read from that pre-fetched store at request/build time — no client-side call to either key-gated API.
- The map's *pin coordinates and place search* stay client-side (geo.admin.ch, keyless), everything else (fares, editorial content) stays server-side/pre-fetched.

---

## 5. Cross-referencing places across sources

geo.admin.ch, GeoNames, the Switzerland Tourism API, and opentransportdata.swiss (stations) each use their own id for the same physical place — there's no shared key across them.

Needed: a small manual mapping table, maintained alongside the editorial CMS content, e.g.:

| place name | geo.admin.ch id | station id (opentransportdata) | ST destination id |
|---|---|---|---|
| Interlaken | ... | ... | ... |

This is what lets a landmark card link to "nearest station" or "region page" without guessing by name-matching at runtime. Populate it once per place when the editorial content for that place is written, not dynamically.

---

## 6. Fallback behaviour

If geo.admin.ch is unreachable (rare — it's a stable federal service, but build for it):

- Search: show a plain "search unavailable, try again" state rather than silently failing — do not fall back to OSM's Nominatim search live, since that's a different index (global, not Swiss-tuned) and would return inconsistent results mid-session.
- Map pins: since pin coordinates are fetched once and stored in the CMS/config (not re-fetched on every page load), a geo.admin.ch outage doesn't affect already-published pin positions — only blocks adding *new* places until the service is back.

---

## 7. Open questions

| # | Question | Blocking? |
|---|---|---|
| A | Calibration reference points for each map's affine transform (§2) — need the SVG source to pick stable landmarks | Yes, before pins can be placed from real coordinates |
| B | Where does the rail/tourism proxy run — existing backend, or a new serverless function? | Yes, before Rail Passes §3.1 can be unblocked |
| C | Refresh cadence for the pre-fetched tourism/rail store (daily? weekly? on CMS publish?) | No, can default to weekly and revisit |

---

## 8. Acceptance criteria

- Given a place search query, when results return, then displayed coordinates match the place on a known reference map (spot-check 3 places against Google Maps).
- Given the national map and the Bernese Oberland map, when a pin is placed from fetched coordinates, then it lands within a few pixels of the correct real-world location at design width.
- Given the page loads, then no opentransportdata.swiss or Switzerland Tourism API key appears in any client-side request (verify via browser network tab).
- Given geo.admin.ch is mocked as unreachable, then search shows the unavailable state instead of a silent failure or a crash.
- Given the map is rendered, then a `© swisstopo` credit is visible.
