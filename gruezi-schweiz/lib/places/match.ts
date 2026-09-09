// Matches a searched-for place (ticket 03) to one of a region's hardcoded
// spots (lib/data/regions.ts) by name. Extracted from
// app/regions/[region]/page.tsx so the comparison can be unit tested without
// rendering the Server Component.
//
// geo.admin.ch's label shape is much messier than a bare name + trailing
// qualifier. Confirmed live against api3.geo.admin.ch (type=locations):
//   "Meyrin (GE)"                                     — bare name + canton
//   "Mürren (BE) - Lauterbrunnen"                      — canton + trailing
//                                                         disambiguator (the
//                                                         real ticket-03 case,
//                                                         with a leading
//                                                         category label like
//                                                         "Populated Place"
//                                                         prepended in the UI)
//   "Schynige Platte (BE) - Bönigen,Gsteigwiler,..."  — comma-separated list
//                                                         of disambiguators
//   "Grindelwald Aspi 50/25m (BE) - Grindelwald"       — bolded name itself is
//                                                         a compound that only
//                                                         *starts with* the
//                                                         spot name
//   "Muri AG (AG) - Muri (AG)"                         — parens inside the
//                                                         trailing part too
//   "Jungfraujoch"                                     — sometimes no canton
//                                                         or disambiguator at
//                                                         all
// Trying to strip an ever-expanding set of qualifier patterns down to an
// exact match chases this shape forever. Instead, check whether the spot's
// bare name appears as a whole word/token inside the label — case-
// insensitive, with a word boundary so "Thun" can't match inside a longer
// compound word. This app only ever has 9 hardcoded spot names per region
// (lib/data/regions.ts), all distinctive multi-word/multi-syllable Swiss
// names with no risk of one being an accidental substring of another, so
// this can't produce a false positive given the only two real sources
// (geo.admin.ch and Nominatim).
//
// A trailing disambiguator names the *parent municipality* of the resolved
// place (e.g. "Mürren (BE) - Lauterbrunnen" — Mürren is part of the
// Lauterbrunnen municipality), and that parent can itself be a valid spot
// name in the same region. So more than one spot can whole-word-match the
// same label, and picking "whichever spot happens first in the spots array"
// would silently prefer the wrong one whenever the correct spot sorts after
// its own parent municipality. geo.admin.ch always places the actually-
// resolved name before the "(canton)" qualifier and before any " - "
// disambiguator suffix, so the correct spot is always the leftmost match in
// the label — pick that one instead of the first spot in array order.
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Returns the index of the spot whose name appears earliest as a whole word
 * inside `requestedPlace`, ignoring case, or -1 if none match.
 */
export function findMatchingSpotIndex<T extends { name: string }>(
  spots: readonly T[],
  requestedPlace: string,
): number {
  const label = requestedPlace.trim();

  let bestIndex = -1;
  let bestPosition = Infinity;
  spots.forEach((spot, index) => {
    const pattern = new RegExp(`(?:^|\\P{L})(${escapeRegExp(spot.name)})(?:$|\\P{L})`, 'iu');
    const match = pattern.exec(label);
    if (match && match.index < bestPosition) {
      bestPosition = match.index;
      bestIndex = index;
    }
  });
  return bestIndex;
}
