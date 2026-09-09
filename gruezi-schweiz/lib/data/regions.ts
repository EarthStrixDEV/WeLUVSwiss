// Region page content — transcribed verbatim from design-source/Region.dc.html.
// The template is data-driven (spec §1): other regions become entries here, not
// code. Only Bernese Oberland is populated at launch. The map SVG geometry is
// part of each region's data because it is hand-drawn per valley (open question
// Q7, spec §7 — revisit before region two).

import type { FilterDef, SceneVariant } from '../types';

export interface Spot {
  name: string;
  kind: string;
  type: 'village' | 'ride' | 'water';
  /** Real-world WGS84 coordinates (ticket 02), resolved once via
   *  lib/places/lookup.ts against geo.admin.ch and pasted in here — this is
   *  static editorial content, not fetched at request time. Projected to an
   *  on-map percentage position by lib/map-projection.ts against the
   *  region's tileBounds; superseded the old hand-picked x/y percentages. */
  lat: number;
  lng: number;
  scene: SceneVariant;
  image: string;
  time: string;
  cost: string;
  body: string;
}

export interface RegionPick {
  rank: string;
  name: string;
  kind: string;
  scene: SceneVariant;
  image: string;
  effort: string;
  cost: string;
  body: string;
}

export interface Base {
  name: string;
  alt: string;
  dorm: string;
  access: string;
  evening: string;
  who: string;
}

export interface DayPlan {
  n: string;
  tag: string;
  title: string;
  cost: string;
  steps: { t: string; d: string }[];
}

export interface RegionMapSvg {
  viewBox: string;
  /** Landmass fill path. */
  ground: string;
  /** Lake ellipses: cx, cy, rx, ry, rotate. */
  lakes: { cx: number; cy: number; rx: number; ry: number; rotate: number }[];
  /** River connecting the lakes. */
  river: string;
  /** Dashed rail & cable car lines. */
  rail: string;
  /** Mountain ridge marks. */
  ridges: string;
}

/** Locked viewport for the region's OSM tile map (ADR 0001, ticket 02) — a
 *  fixed south-west/north-east WGS84 box framing all of the region's spots
 *  with margin. The tile layer is clamped to exactly this view (no user pan
 *  or zoom), and `spots[].lat/lng` are projected into on-map percentage
 *  positions against these same bounds so pins land where the tiles put
 *  them. Padded ~18% beyond the spots' own bounding box on each side. */
export interface RegionTileBounds {
  south: number;
  west: number;
  north: number;
  east: number;
}

export interface RegionContent {
  slug: string;
  name: string;
  breadcrumb: string;
  heroScene: SceneVariant;
  heroImage: string;
  lead: string;
  keyfacts: { v: string; l: string }[];
  mapSvg: RegionMapSvg;
  /** Locked viewport bounds for the tile-based region map (ticket 02). */
  tileBounds: RegionTileBounds;
  spotFilters: FilterDef[];
  spots: Spot[];
  /** Ranking is editorial, explicitly not by fame (spec §4.2). */
  picks: RegionPick[];
  bases: Base[];
  days: DayPlan[];
}

export const REGIONS: Record<string, RegionContent> = {
  'bernese-oberland': {
    slug: 'bernese-oberland',
    name: 'Bernese Oberland',
    breadcrumb: 'Regions › Bernese Oberland',
    heroScene: 'sky-mist t-emerald',
    heroImage: '/images/regions/bernese-oberland/hero.png',
    lead: 'Two lakes, one wall of 4,000-metre peaks and the densest cluster of mountain railways in the country. If you only have a week in Switzerland, most people spend it here — and it is the easiest region to do cheaply.',
    keyfacts: [
      { v: '2 lakes', l: 'Thun and Brienz' },
      { v: '4,158 m', l: 'Jungfrau, the high point' },
      { v: '90 min', l: 'Anywhere from Interlaken' },
      { v: 'Jun–Oct', l: 'High trails clear of snow' },
    ],
    mapSvg: {
      viewBox: '0 0 1000 620',
      ground: 'M60 300 L200 200 L330 250 L430 170 L560 210 L690 120 L820 190 L950 150 L950 600 L60 600 Z',
      lakes: [
        { cx: 210, cy: 265, rx: 118, ry: 40, rotate: -16 },
        { cx: 608, cy: 196, rx: 104, ry: 34, rotate: -11 },
      ],
      river: 'M322 252 C 370 244, 440 232, 502 214',
      rail: 'M150 270 L400 240 L625 380 M400 240 L395 415 L520 515 M150 270 L175 470',
      ridges: 'M300 470 L360 380 L420 460 M560 470 L620 400 L700 480 M760 300 L830 230 L900 320',
    },
    // Bounding box framing all 9 spots below with ~18% margin on each side,
    // adjusted to the .mapBox aspect ratio (padding-bottom: 62%) so the
    // locked tile view and the percentage-projected pins agree (ticket 02).
    tileBounds: { south: 46.416062, west: 7.385858, north: 46.789943, east: 8.263581 },
    spotFilters: [
      { id: 'all', label: 'Everything', icon: 'M12 3l2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.4 9.4l6.1-.8z' },
      { id: 'village', label: 'Villages', icon: 'M6 21V9l6-5 6 5v12M10 21v-6h4v6' },
      { id: 'ride', label: 'Mountain railways', icon: 'M4 4h16v12H4zM4 10h16M8 20l2-3M16 20l-2-3' },
      { id: 'water', label: 'Lakes', icon: 'M3 15c3-3 6 3 9 0s6-3 9 0M3 19c3-3 6 3 9 0s6-3 9 0M12 4l3 5H9z' },
    ],
    spots: [
      {
        name: 'Thun', kind: 'Lakeside town', type: 'village', lat: 46.740459, lng: 7.607642, scene: 'sky-gold t-golden', image: '/images/regions/bernese-oberland/spot-thun.png',
        time: 'Half a day', cost: 'Free to walk',
        body: 'A castle above a covered wooden bridge, and the cheapest beds within reach of the lake. Most people skip it, which is the argument for going.',
      },
      {
        name: 'Interlaken', kind: 'Hub town', type: 'village', lat: 46.684219, lng: 7.878633, scene: 'sky-clear t-glacier', image: '/images/regions/bernese-oberland/spot-interlaken.png',
        time: 'Base yourself here', cost: 'Free',
        body: 'Wedged between the two lakes with a station at each end. Touristy in the middle, but every train in the region starts here.',
      },
      {
        name: 'Schynige Platte', kind: 'Ridge walk', type: 'ride', lat: 46.653625, lng: 7.908412, scene: 'sky-mist t-emerald', image: '/images/regions/bernese-oberland/spot-schynige.png',
        time: '5–6 hours', cost: 'CHF 32 return*',
        body: 'A wooden cog train from 1893 climbs to an alpine garden and the finest ridge walk in the Oberland — the whole Eiger–Mönch–Jungfrau wall, side on.',
      },
      {
        name: 'Lauterbrunnen', kind: 'Valley floor', type: 'village', lat: 46.553196, lng: 7.903941, scene: 'sky-mist t-emerald', image: '/images/regions/bernese-oberland/spot-lauterbrunnen.png',
        time: 'Half a day', cost: 'Free',
        body: 'Seventy-two waterfalls into one flat trench. Campsites and hostels on the floor, cliffs on both sides, and trains up either wall.',
      },
      {
        name: 'Mürren', kind: 'Car-free village', type: 'village', lat: 46.559620, lng: 7.891747, scene: 'sky-clear t-alpine', image: '/images/regions/bernese-oberland/spot-murren.png',
        time: '3–4 hours', cost: 'CHF 12 up*',
        body: 'A shelf village at 1,650 m facing the Eiger head on. Walk up from Lauterbrunnen through the woods and the ride is free.',
      },
      {
        name: 'Jungfraujoch', kind: 'High railway', type: 'ride', lat: 46.548008, lng: 7.979473, scene: 'sky-storm t-glacier', image: '/images/regions/bernese-oberland/spot-jungfraujoch.png',
        time: 'Full day', cost: 'CHF 100+ return*',
        body: 'The highest railway station in Europe at 3,454 m. Spectacular and expensive; on a cloudy day you pay it to stand in fog. Check the summit webcam first.',
      },
      {
        name: 'Grindelwald', kind: 'Trail base', type: 'village', lat: 46.620018, lng: 8.041797, scene: 'sky-gold t-emerald', image: '/images/regions/bernese-oberland/spot-grindelwald.png',
        time: 'Two days', cost: 'Free to walk',
        body: 'Under the Eiger north face, with more marked trails leaving town than anywhere else in the region. Busier and pricier than Lauterbrunnen.',
      },
      {
        name: 'Kandersteg', kind: 'Quiet valley', type: 'village', lat: 46.465546, lng: 7.713510, scene: 'sky-mist t-slate', image: '/images/regions/bernese-oberland/spot-kandersteg.png',
        time: 'A day', cost: 'Free',
        body: 'The west end of the region, on the line to Valais. Far fewer visitors, and the trailhead for the Oeschinensee.',
      },
      {
        name: 'Oeschinensee', kind: 'Alpine lake', type: 'water', lat: 46.498360, lng: 7.726671, scene: 'sky-clear t-glacier', image: '/images/regions/bernese-oberland/spot-oeschinensee.png',
        time: '4 hours', cost: 'Free on foot',
        body: 'A turquoise lake in a rock amphitheatre above Kandersteg. Walk up in about ninety minutes rather than paying for the gondola.',
      },
    ],
    picks: [
      {
        rank: '1', name: 'Schynige Platte to First', kind: 'Ridge traverse', scene: 'sky-mist t-emerald', image: '/images/regions/bernese-oberland/pick-schynige-first.png',
        effort: '6 hrs, 700 m up', cost: 'CHF 32 up*',
        body: 'One train ride buys a whole day above the treeline, with the Eiger, Mönch and Jungfrau in front of you the entire way. The best value in the region by a distance.',
      },
      {
        rank: '2', name: 'Oeschinensee', kind: 'Alpine lake', scene: 'sky-clear t-glacier', image: '/images/regions/bernese-oberland/pick-oeschinensee.png',
        effort: '90 min up', cost: 'Free on foot',
        body: 'Turquoise water in a rock bowl, reachable on foot from Kandersteg station. Go early; the gondola crowds arrive from ten.',
      },
      {
        rank: '3', name: 'Mürren and the Northface Trail', kind: 'Cliff-shelf walk', scene: 'sky-clear t-alpine', image: '/images/regions/bernese-oberland/pick-murren.png',
        effort: '3 hrs, mostly flat', cost: 'CHF 12 up*',
        body: 'A near-level path along a shelf at 1,900 m staring straight into the Eiger north face. The one walk here that is easy and unforgettable at once.',
      },
      {
        rank: '4', name: 'Staubbach and the valley floor', kind: 'Waterfall walk', scene: 'sky-mist t-emerald', image: '/images/regions/bernese-oberland/pick-staubbach.png',
        effort: '2 hrs, flat', cost: 'Free',
        body: 'A flat loop past nearly a dozen falls, ending behind the curtain of Trümmelbach inside the rock. Costs nothing and works in bad weather.',
      },
      {
        rank: '5', name: 'Lake Brienz by boat', kind: 'Lake crossing', scene: 'sky-gold t-golden', image: '/images/regions/bernese-oberland/pick-lake-brienz.png',
        effort: 'Sit down', cost: 'Covered by most passes',
        body: 'The greener, quieter lake. Steamers stop at villages with no road in, and the crossing is included on the Swiss Travel Pass.',
      },
      {
        rank: '6', name: 'Jungfraujoch', kind: 'High railway', scene: 'sky-storm t-glacier', image: '/images/regions/bernese-oberland/pick-jungfraujoch.png',
        effort: 'Full day, sitting', cost: 'CHF 100+*',
        body: 'The famous one, and the one to skip if the budget is tight or the forecast is poor. Worth it on a clear day if you have never stood on a glacier.',
      },
    ],
    bases: [
      { name: 'Lauterbrunnen', alt: 'Valley floor, 795 m', dorm: 'CHF 35–45*', access: 'Trains up both walls', evening: 'Two pubs, one shop', who: 'Hikers and tight budgets' },
      { name: 'Interlaken', alt: 'Between the lakes, 567 m', dorm: 'CHF 32–48*', access: '20–40 min to everything', evening: 'The liveliest option', who: 'First visit, solo travellers' },
      { name: 'Grindelwald', alt: 'Under the Eiger, 1,034 m', dorm: 'CHF 45–60*', access: 'Trails from the door', evening: 'Quiet, expensive', who: 'Serious walkers' },
      { name: 'Mürren', alt: 'Car-free shelf, 1,650 m', dorm: 'CHF 50–65*', access: 'Cable car dependent', evening: 'Silent after nine', who: 'Views over convenience' },
    ],
    days: [
      {
        n: '1', tag: 'Arrival', title: 'Land soft, walk the floor', cost: 'Under CHF 20 in fares*',
        steps: [
          { t: 'Midday', d: 'Train to Lauterbrunnen, drop the bag at the hostel.' },
          { t: 'Afternoon', d: 'Flat loop past Staubbach and into Trümmelbach inside the cliff.' },
          { t: 'Evening', d: 'Cook at the hostel; the valley shop shuts at half six.' },
        ],
      },
      {
        n: '2', tag: 'The big one', title: 'Schynige Platte ridge', cost: 'About CHF 32 in fares*',
        steps: [
          { t: '07:00', d: 'First cog train up from Wilderswil — the light is better and the ridge is empty.' },
          { t: 'Morning', d: 'Alpine garden, then the traverse toward Faulhorn with the wall on your right.' },
          { t: 'Late', d: 'Drop to First and ride down, or walk out to Grindelwald if the legs hold.' },
        ],
      },
      {
        n: '3', tag: 'Easy finish', title: 'Mürren shelf and out', cost: 'About CHF 12 in fares*',
        steps: [
          { t: 'Morning', d: 'Walk up through the woods to Mürren instead of taking the cable car.' },
          { t: 'Midday', d: 'The near-level Northface Trail, straight at the Eiger.' },
          { t: 'Evening', d: 'Down to Interlaken Ost and on to the next region.' },
        ],
      },
    ],
  },
};
