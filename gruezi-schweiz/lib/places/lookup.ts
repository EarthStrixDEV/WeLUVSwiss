// Place lookup: geo.admin.ch SearchServer (primary) with OSM Nominatim fallback.
// See CONTEXT.md "Primary Place Source / Fallback Source" for the source-priority contract.

export interface Place {
  name: string;
  lat: number;
  lng: number;
  source: 'geoadmin' | 'osm';
}

export type PlaceLookupResult = { status: 'ok'; results: Place[] } | { status: 'unavailable' };

// roughly lat 45.8-47.9, lng 5.9-10.5 (CONTEXT.md); widened 0.05deg at the low end
// so towns right on the border, like Geneva/Basel, aren't clipped by rounding.
const SWISS_BBOX = { minLat: 45.8, maxLat: 47.9, minLng: 5.9, maxLng: 10.5 };

function isInSwissBoundingBox(lat: number, lng: number): boolean {
  return lat >= SWISS_BBOX.minLat && lat <= SWISS_BBOX.maxLat && lng >= SWISS_BBOX.minLng && lng <= SWISS_BBOX.maxLng;
}

function stripHtml(label: string): string {
  return label.replace(/<[^>]*>/g, '');
}

interface GeoAdminResult {
  attrs: { label: string; lat: number; lon: number };
}

async function lookupGeoAdmin(query: string): Promise<Place[]> {
  const url = `https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=${encodeURIComponent(query)}&type=locations&sr=4326`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`geo.admin.ch responded with ${response.status}`);
  }
  const body = (await response.json()) as { results: GeoAdminResult[] };
  return body.results.map((result) => ({
    name: stripHtml(result.attrs.label),
    lat: result.attrs.lat,
    lng: result.attrs.lon,
    source: 'geoadmin',
  }));
}

interface NominatimResult {
  name: string;
  lat: string;
  lon: string;
}

async function lookupNominatim(query: string): Promise<Place[]> {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Nominatim responded with ${response.status}`);
  }
  const body = (await response.json()) as NominatimResult[];
  return body
    .map((result) => ({
      name: result.name,
      lat: Number.parseFloat(result.lat),
      lng: Number.parseFloat(result.lon),
      source: 'osm' as const,
    }))
    .filter((place) => isInSwissBoundingBox(place.lat, place.lng));
}

export async function lookupPlace(query: string): Promise<PlaceLookupResult> {
  try {
    return { status: 'ok', results: await lookupGeoAdmin(query) };
  } catch {
    // geo.admin.ch unreachable or erroring — fall back to the secondary source.
  }

  try {
    return { status: 'ok', results: await lookupNominatim(query) };
  } catch {
    return { status: 'unavailable' };
  }
}
