"use client";

// Integration layer for ticket 03 (global "Find a place" search). Drives
// PlaceSearch's `results`/`status` props from lookupPlace (ticket 01),
// debounced and filtered to the current in-app region coverage (CONTEXT.md
// "Place Search") — currently just Bernese Oberland, v1's only region.

import { useEffect, useRef, useState } from "react";
import { lookupPlace, type Place } from "./lookup";
import { REGIONS } from "@/lib/data/regions";
import type { PlaceSearchStatus } from "@/components/PlaceSearch";

const DEBOUNCE_MS = 280;

const BERNESE_OBERLAND_BOUNDS = REGIONS["bernese-oberland"].tileBounds;

function isWithinBounds(place: Place): boolean {
  return (
    place.lat >= BERNESE_OBERLAND_BOUNDS.south &&
    place.lat <= BERNESE_OBERLAND_BOUNDS.north &&
    place.lng >= BERNESE_OBERLAND_BOUNDS.west &&
    place.lng <= BERNESE_OBERLAND_BOUNDS.east
  );
}

/**
 * Debounced, region-filtered wrapper around `lookupPlace`. Returns the query
 * string plus the derived `results`/`status` pair `PlaceSearch` expects.
 *
 * Race safety: every call to `lookupPlace` is tagged with a monotonically
 * increasing request id; a response is only applied if it's still the latest
 * request in flight by the time it resolves, so a slow, stale keystroke can
 * never clobber a newer one's results (no AbortController needed since
 * lookupPlace doesn't accept a signal).
 *
 * State updates for a query change are driven from `updateQuery` (the actual
 * event handler) rather than an effect's body, so nothing calls setState
 * synchronously during an effect (react-hooks/set-state-in-effect) — the
 * effect below only owns the debounce timer + the async lookup callback.
 */
export function usePlaceSearch() {
  const [query, setQueryState] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [status, setStatus] = useState<PlaceSearchStatus>("idle");
  const latestRequestId = useRef(0);

  function updateQuery(next: string) {
    setQueryState(next);

    const trimmed = next.trim();
    if (!trimmed) {
      latestRequestId.current += 1; // invalidate any in-flight request
      setResults([]);
      setStatus("idle");
    } else {
      setStatus("loading");
    }
  }

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const requestId = ++latestRequestId.current;

    const timer = setTimeout(() => {
      lookupPlace(trimmed).then((outcome) => {
        if (requestId !== latestRequestId.current) return; // stale response

        if (outcome.status === "unavailable") {
          setResults([]);
          setStatus("unavailable");
          return;
        }

        const inBounds = outcome.results.filter(isWithinBounds);
        setResults(inBounds);
        setStatus(inBounds.length > 0 ? "ok" : "empty");
      });
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query]);

  function reset() {
    latestRequestId.current += 1;
    setQueryState("");
    setResults([]);
    setStatus("idle");
  }

  return { query, setQuery: updateQuery, results, status, reset };
}
