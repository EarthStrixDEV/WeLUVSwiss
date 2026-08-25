// Find a Trip sample data — transcribed verbatim from design-source/FindTrip.dc.html.
// Daily budgets are sample estimates (editorial content, spec §3.3).

import type { SceneVariant } from '../types';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type TripLength = 'short' | 'mid' | 'long';
export type Budget = 'low' | 'mid' | 'high';

export interface Trip {
  name: string;
  region: string;
  scene: SceneVariant;
  image: string;
  seasons: Season[];
  len: TripLength;
  budget: Budget;
  styles: string[];
  days: string;
  /** Daily from-price, sample estimate. */
  price: string;
  tags: string[];
  body: string;
}

export const TRIPS: Trip[] = [
  {
    name: 'The Oberland from one bed', region: 'Bernese Oberland', scene: 'sky-mist t-emerald', image: '/images/trips/oberland.png',
    seasons: ['summer', 'autumn'], len: 'short', budget: 'low', styles: ['hiking', 'rail'],
    days: '3 days', price: 'CHF 95', tags: ['Hiking', 'Rail'],
    body: 'Lauterbrunnen as a base, the Schynige Platte ridge in the middle, and the Mürren shelf on the way out.',
  },
  {
    name: 'Glacier line to the Engadin', region: 'Graubünden', scene: 'sky-clear t-glacier', image: '/images/trips/engadin.png',
    seasons: ['summer', 'winter'], len: 'mid', budget: 'mid', styles: ['rail'],
    days: '6 days', price: 'CHF 140', tags: ['Rail', 'High valleys'],
    body: 'Slow regional trains instead of the branded panoramic ones, ending in the thin air above St. Moritz.',
  },
  {
    name: 'Zermatt without the price tag', region: 'Valais', scene: 'sky-dawn t-alpine', image: '/images/trips/zermatt.png',
    seasons: ['summer'], len: 'short', budget: 'mid', styles: ['hiking'],
    days: '4 days', price: 'CHF 130', tags: ['Hiking', 'Peaks'],
    body: 'Sleep down the valley in Randa, walk the Five Lakes trail, and let the Gornergrat be the one splurge.',
  },
  {
    name: 'Five cities, one week', region: 'Mittelland', scene: 'sky-dusk t-slate', image: '/images/trips/cities.png',
    seasons: ['spring', 'autumn'], len: 'mid', budget: 'mid', styles: ['cities'],
    days: '7 days', price: 'CHF 125', tags: ['Cities', 'Museums'],
    body: 'Zürich, Bern, Lucerne, Basel and Geneva, with the river swimming and the old towns doing the work.',
  },
  {
    name: 'Lakes and grotti in the south', region: 'Ticino', scene: 'sky-gold t-emerald', image: '/images/trips/ticino.png',
    seasons: ['spring', 'summer'], len: 'short', budget: 'low', styles: ['lakes', 'cities'],
    days: '4 days', price: 'CHF 90', tags: ['Lakes', 'Food'],
    body: 'Cross the Gotthard and everything changes — the language, the food, and how far a franc goes at dinner.',
  },
  {
    name: 'Hut to hut on the Alpine Pass Route', region: 'Central Alps', scene: 'sky-storm t-slate', image: '/images/trips/alpine-route.png',
    seasons: ['summer'], len: 'long', budget: 'low', styles: ['hiking'],
    days: '12 days', price: 'CHF 85', tags: ['Hiking', 'Huts'],
    body: 'Sleep in SAC huts and mid-altitude hostels, resupply in valley Coops, and never book a hotel.',
  },
  {
    name: 'Winter without a lift pass', region: 'Bernese Oberland', scene: 'sky-mist t-alpine', image: '/images/trips/winter.png',
    seasons: ['winter'], len: 'short', budget: 'low', styles: ['hiking'],
    days: '4 days', price: 'CHF 100', tags: ['Snowshoe', 'Quiet'],
    body: 'Marked winter walking paths, sledge runs and empty valleys, for a fraction of what the ski week costs.',
  },
  {
    name: 'Lake Geneva and the vineyards', region: 'Vaud', scene: 'sky-gold t-golden', image: '/images/trips/vineyards.png',
    seasons: ['spring', 'autumn'], len: 'short', budget: 'mid', styles: ['lakes', 'cities'],
    days: '3 days', price: 'CHF 120', tags: ['Lakes', 'Wine'],
    body: 'Terraced vineyards above the water between Lausanne and Montreux, walkable end to end in a long day.',
  },
  {
    name: 'The long way to Italy', region: 'Cross-country', scene: 'sky-dusk t-golden', image: '/images/trips/italy.png',
    seasons: ['spring', 'summer', 'autumn'], len: 'long', budget: 'high', styles: ['rail', 'lakes'],
    days: '9 days', price: 'CHF 175', tags: ['Rail', 'Slow travel'],
    body: 'Basel to Lugano the slow way, over three passes, with lake steamers filling the gaps between trains.',
  },
];

export type TripFilterKey = 'season' | 'length' | 'budget' | 'style';

export interface TripFilterGroup {
  key: TripFilterKey;
  label: string;
  icon: string;
  /** [value, label] pairs; 'any' is always first and the default. */
  opts: [string, string][];
}

export const TRIP_FILTER_GROUPS: TripFilterGroup[] = [
  {
    key: 'season', label: 'Season', icon: 'M12 3v18M3 12h18M6 6l12 12M18 6L6 18',
    opts: [['any', 'Any time'], ['spring', 'Apr–May'], ['summer', 'Jun–Sep'], ['autumn', 'Oct–Nov'], ['winter', 'Dec–Mar']],
  },
  {
    key: 'length', label: 'How long', icon: 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2',
    opts: [['any', 'Any length'], ['short', '3–4 days'], ['mid', '5–7 days'], ['long', '8 days or more']],
  },
  {
    key: 'budget', label: 'Budget', icon: 'M4 7h16v11H4zM4 11h16M8 14.5h.01',
    opts: [['any', 'Any budget'], ['low', 'Under CHF 110 a day'], ['mid', 'CHF 110–160'], ['high', 'Over CHF 160']],
  },
  {
    key: 'style', label: 'Style', icon: 'M3 20l6-13 4 8 3-5 5 10z',
    opts: [['any', 'Anything'], ['hiking', 'Hiking'], ['rail', 'Rail journeys'], ['cities', 'Cities'], ['lakes', 'Lakes']],
  },
];

/** AND-combination across the four groups (spec §5.6): season/style match
 *  against arrays, length/budget against the single value. */
export function tripMatches(
  trip: Trip,
  state: Record<TripFilterKey, string>,
): boolean {
  return (
    (state.season === 'any' || trip.seasons.includes(state.season as Season)) &&
    (state.length === 'any' || trip.len === state.length) &&
    (state.budget === 'any' || trip.budget === state.budget) &&
    (state.style === 'any' || trip.styles.includes(state.style))
  );
}
