// Projects a WGS84 lat/lng onto a percentage position inside a fixed,
// locked-viewport map box (ticket 02 / docs/adr/0001-region-map-tile-based.md).
//
// The region map's tile layer is clamped to an exact `RegionTileBounds` box
// (no user pan/zoom — see CONTEXT.md "Locked Viewport"), so a plain Web
// Mercator projection (EPSG:3857, the same one the tile layer itself uses)
// evaluated against those same bounds tells us exactly where a pin's real
// coordinates fall inside the box, as a left/top percentage pair. This lets
// the region map keep reusing MapExplorer's existing absolutely-positioned
// pin markup — no Leaflet marker layer, no change to MapExplorer at all.

import type { RegionTileBounds } from './data/regions';

// Sphere radius EPSG:3857 assumes — irrelevant to the final ratio (it cancels
// out), kept only for readability of the intermediate math.
const EARTH_RADIUS = 6378137;

function mercatorX(lng: number): number {
  return EARTH_RADIUS * (lng * Math.PI) / 180;
}

function mercatorY(lat: number): number {
  const rad = (lat * Math.PI) / 180;
  return EARTH_RADIUS * Math.log(Math.tan(Math.PI / 4 + rad / 2));
}

/** Returns `{ x, y }` as percentage strings (e.g. "56.1%"), `y` measured from
 *  the top, matching the `left`/`top` percentages MapExplorer's `.pin` uses. */
export function projectToPercent(lat: number, lng: number, bounds: RegionTileBounds): { x: string; y: string } {
  const minX = mercatorX(bounds.west);
  const maxX = mercatorX(bounds.east);
  const minY = mercatorY(bounds.south);
  const maxY = mercatorY(bounds.north);

  const px = ((mercatorX(lng) - minX) / (maxX - minX)) * 100;
  const py = (1 - (mercatorY(lat) - minY) / (maxY - minY)) * 100;

  return { x: `${px.toFixed(2)}%`, y: `${py.toFixed(2)}%` };
}
