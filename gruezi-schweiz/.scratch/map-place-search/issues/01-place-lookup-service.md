# 01: Place lookup service (geo.admin.ch + OSM fallback)

**What to build:** A single lookup capability that resolves a place name to a real WGS84 lat/lng and a display label. It tries geo.admin.ch's SearchServer first (`sr=4326`, keyless, client-side); if that's unreachable, it falls back to OpenStreetMap Nominatim, with results restricted to the Swiss bounding box so a global/non-Swiss match never leaks through. No UI consumes it yet — this ticket delivers the lookup itself, demoable via direct calls (console/test), because everything downstream (the region map's pins, the global place search) depends on it returning correct, source-agnostic results.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Given a known Swiss place name, when looked up via geo.admin.ch, then the returned coordinates are WGS84 (not the raw LV03 projection) and match the place within a few metres of its known real-world location.
- [ ] Given geo.admin.ch is unreachable (mocked), when the same place is looked up, then the fallback to OSM Nominatim returns a result instead of failing outright.
- [ ] Given the Nominatim fallback returns a result outside Switzerland's bounding box, when that result is received, then it is filtered out rather than surfaced.
- [ ] Given both sources are unreachable, when a lookup is attempted, then the caller receives an explicit "unavailable" result rather than a silent failure, a thrown unhandled exception, or a crash.
- [ ] No opentransportdata.swiss or Switzerland Tourism API key is involved anywhere in this lookup path (out of scope — those remain server-side/proxied in a separate future effort).
