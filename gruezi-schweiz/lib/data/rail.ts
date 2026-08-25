// Rail Passes sample data — transcribed verbatim from design-source/RailPasses.dc.html.
// Every price here is a SAMPLE value pending a named source (spec §3.1, blocking):
// point-to-point fares → SBB open data, pass prices → Swiss Travel System tariff.
// Keep the asterisks in display strings — they mark sample figures (spec §3.4).

import type { SceneVariant } from '../types';

/** Pseudo grid positions in km, used only to derive a plausible placeholder
 *  fare (lib/rail-calc.ts). NOT real coordinates. */
export interface Station {
  name: string;
  x: number;
  y: number;
}

export const STATIONS: Station[] = [
  { name: 'Zürich', x: 240, y: 80 },
  { name: 'Basel', x: 150, y: 20 },
  { name: 'Bern', x: 100, y: 170 },
  { name: 'Lucerne', x: 185, y: 130 },
  { name: 'Interlaken', x: 140, y: 215 },
  { name: 'Lauterbrunnen', x: 145, y: 245 },
  { name: 'Zermatt', x: 110, y: 320 },
  { name: 'Geneva', x: 0, y: 250 },
  { name: 'Lugano', x: 250, y: 330 },
  { name: 'St. Moritz', x: 350, y: 200 },
];

/** Sample pass prices (spec §3.1). */
export const HALF_FARE_CARD = 120;
export const SAVER_PER_DAY = 52;
export const STP_TIERS = [
  { d: 3, p: 244 },
  { d: 4, p: 295 },
  { d: 6, p: 379 },
  { d: 8, p: 419 },
  { d: 15, p: 459 },
] as const;

/** Copy for the four buying options in the comparison (name/note fixed;
 *  `why` is the recommendation-panel rationale when that option wins). */
export const OPTION_META = [
  {
    id: 'p2p',
    name: 'Point-to-point tickets',
    note: 'Buy each journey as you go, no card',
    why: 'You are moving on few enough days that no card pays for itself. Buy singles and keep the flexibility.',
  },
  {
    id: 'half',
    name: 'Half Fare Card',
    note: 'Every ticket at 50% for one month',
    why: 'The card costs less than the fares it saves you over this many days — and it also halves the mountain railways.',
  },
  {
    id: 'saver',
    name: 'Saver Day Pass',
    note: 'One flat day of travel, booked ahead',
    why: 'Cheapest when you make long legs on a handful of days and can commit to the dates in advance.',
  },
  {
    id: 'stp',
    name: 'Swiss Travel Pass',
    note: 'Consecutive days, boats and buses included',
    why: 'You are moving often enough that unlimited travel wins outright — and it covers lake boats and most museums too.',
  },
] as const;

export interface PassCard {
  name: string;
  price: string;
  icon: string;
  body: string;
  who: string;
}

export const PASS_CARDS: PassCard[] = [
  {
    name: 'Swiss Travel Pass', price: 'From CHF 244 · 3 days*',
    icon: 'M4 4h16v12H4zM4 10h16M8 20l2-3M16 20l-2-3',
    body: 'Unlimited trains, buses and lake boats on consecutive days, plus free entry to most museums and discounts on the mountain railways.',
    who: 'Moving most days',
  },
  {
    name: 'Half Fare Card', price: 'CHF 120 · one month*',
    icon: 'M4 7h16v11H4zM4 11h16M12 4v3',
    body: 'Halves the price of almost everything on rails, including many cable cars. Not a ticket in itself — you still buy each journey.',
    who: 'Two weeks or more',
  },
  {
    name: 'Saver Day Pass', price: 'From CHF 52 a day*',
    icon: 'M5 5h14v14H5zM5 9h14M9 3v4M15 3v4',
    body: 'A flat-rate day of unlimited travel, priced by how far ahead you book and how busy the date is. Dates are fixed once bought.',
    who: 'Planned long legs',
  },
  {
    name: 'Regional passes', price: 'From CHF 250 · 3 days*',
    icon: 'M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 7v6M9 10h6',
    body: 'One region, deeper coverage — the Berner Oberland Pass covers the local mountain railways a national pass only discounts.',
    who: 'Staying in one region',
  },
];

export interface PassRegion {
  name: string;
  scene: SceneVariant;
  image: string;
  body: string;
  /** Route slug when the region page exists; only Bernese Oberland is populated in v1. */
  slug: string | null;
}

export const PASS_REGIONS: PassRegion[] = [
  {
    name: 'Bernese Oberland', scene: 'sky-mist t-emerald', image: '/images/rail/oberland.png', slug: 'bernese-oberland',
    body: 'Two lakes and the mountain railway network the regional pass was built for.',
  },
  {
    name: 'Valais', scene: 'sky-dawn t-alpine', image: '/images/rail/valais.png', slug: null,
    body: 'Zermatt, Saas-Fee and the high passes. Long legs, so a Half Fare Card earns its keep.',
  },
  {
    name: 'Graubünden', scene: 'sky-clear t-glacier', image: '/images/rail/graubuenden.png', slug: null,
    body: 'The Rhaetian Railway runs on its own network — check what your pass actually covers.',
  },
  {
    name: 'Ticino', scene: 'sky-gold t-golden', image: '/images/rail/ticino.png', slug: null,
    body: 'One long ride south, then short local hops and lake boats to Italy.',
  },
];
