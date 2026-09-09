// Matches a searched-for place (ticket 03) to one of a region's hardcoded
// spots (lib/data/regions.ts) by name. Extracted from
// app/regions/[region]/page.tsx so the comparison can be unit tested without
// rendering the Server Component.
//
// geo.admin.ch labels a result with a trailing canton qualifier, e.g.
// "Mürren (BE)" (see lookupGeoAdmin in ./lookup.ts and the geoAdminResponse
// fixture in ./lookup.test.ts) — that qualifier isn't part of any spot's
// `name`, so it has to be stripped before comparing. Nominatim's `name`
// field (lookupNominatim in ./lookup.ts) is already bare, so stripping a
// qualifier that isn't there is a no-op and bare names keep matching as
// before.
function stripQualifier(name: string): string {
  return name.replace(/\s*\([^)]*\)\s*$/, '').trim();
}

/**
 * Returns the index of the spot whose name matches `requestedPlace`, ignoring
 * case and a trailing " (XX)"-style qualifier, or -1 if none match.
 */
export function findMatchingSpotIndex<T extends { name: string }>(
  spots: readonly T[],
  requestedPlace: string,
): number {
  const target = stripQualifier(requestedPlace).toLowerCase();
  return spots.findIndex((spot) => spot.name.toLowerCase() === target);
}
