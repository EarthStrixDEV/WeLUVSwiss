// Landing page sample data — transcribed verbatim from design-source/Main.dc.html
// (desktop) and Mobile.dc.html (mobile variants). Editorial content (spec §3.3):
// hand-maintained, no external integration required.

import type { FilterDef, SceneVariant } from '../types';

export interface HeroStat {
  value: string;
  label: string;
}

/** Hardcoded in the artboard hero (Main.dc.html ~L180–196). */
export const HERO_STATS: HeroStat[] = [
  { value: '41,285 km²', label: 'Smaller than Sri Lanka' },
  { value: '48 peaks', label: 'Above 4,000 metres' },
  { value: '~5,300 km', label: 'Of railway, mostly electric' },
  { value: '1291', label: 'The confederation begins' },
];

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
  /** Kept in the abridged six-entry mobile timeline (Mobile.dc.html). */
  mobile: boolean;
}

export const TIMELINE: TimelineEntry[] = [
  { year: '1291', title: 'The Rütli oath', mobile: true, body: 'Uri, Schwyz and Unterwalden swear a defensive pact in a meadow above Lake Lucerne. The date is still the national holiday, 1 August.' },
  { year: '1499', title: 'Effective independence', mobile: false, body: 'The Swabian War ends imperial authority over the confederation in practice, a century and a half before anyone writes it down.' },
  { year: '1648', title: 'Formally recognised', mobile: true, body: 'The Peace of Westphalia settles the paperwork: the confederation leaves the Holy Roman Empire for good.' },
  { year: '1815', title: 'Neutrality on paper', mobile: true, body: 'The Congress of Vienna guarantees permanent armed neutrality and draws borders that have barely moved since.' },
  { year: '1848', title: 'One federal state', mobile: true, body: 'After a short civil war the cantons adopt a federal constitution — direct democracy, Bern as the seat of government.' },
  { year: '1863', title: 'The Red Cross', mobile: true, body: 'Founded in Geneva by Henry Dunant. The emblem is the Swiss flag with the colours reversed.' },
  { year: '1971', title: 'Women vote federally', mobile: false, body: 'Late, and contested canton by canton — Appenzell Innerrhoden only followed in 1990, by court order.' },
  { year: '2002', title: 'Joins the UN', mobile: true, body: 'By referendum, and still outside the EU. Schengen followed in 2008; the franc stayed.' },
];

export interface StyleCard {
  tag: string;
  title: string;
  scene: SceneVariant;
  image: string;
  days: string;
  cost: string;
  body: string;
}

/** The three 3D travel-style cards. */
export const STYLE_CARDS: StyleCard[] = [
  {
    tag: 'Rail', title: 'The window seat', scene: 'sky-clear t-glacier', image: '/images/home/style-rail.png', days: '7–10 days', cost: 'Pass-heavy budget',
    body: 'Base yourself in three towns and let the trains do the climbing. Panoramic routes, lake steamers and post buses on one ticket.',
  },
  {
    tag: 'Trail', title: 'Hut to hut', scene: 'sky-gold t-emerald', image: '/images/home/style-trail.png', days: '5–14 days', cost: 'Cheapest per day',
    body: 'Sleep in SAC mountain huts and mid-altitude hostels, walk the marked yellow network, resupply in valley Coops.',
  },
  {
    tag: 'Cities', title: 'The short hop', scene: 'sky-dusk t-slate', image: '/images/home/style-cities.png', days: '4–6 days', cost: 'Hostel dorms',
    body: 'Zürich, Bern, Lucerne and Basel sit within two hours of each other, with Geneva a straight run down the lake. Museums, old towns, river swimming in summer.',
  },
];

export interface Slide {
  region: string;
  title: string;
  scene: SceneVariant;
  image: string;
  body: string;
}

export const SLIDES: Slide[] = [
  {
    region: 'Valais', title: 'Zermatt and the Matterhorn', scene: 'sky-dawn t-alpine', image: '/images/home/slide-valais.png',
    body: 'A car-free village under a mountain most people can draw from memory. Arrive on the Matterhorn Gotthard Bahn from Täsch, walk the Five Lakes trail, and watch the east face catch the first light.',
  },
  {
    region: 'Bernese Oberland', title: 'The Lauterbrunnen valley', scene: 'sky-mist t-emerald', image: '/images/home/slide-oberland.png',
    body: 'Seventy-two waterfalls falling into one flat-bottomed glacial trench. Cheap campsites, expensive cable cars, and the trail up to Mürren that costs nothing at all.',
  },
  {
    region: 'Graubünden', title: 'Engadin, in the thin air', scene: 'sky-clear t-glacier', image: '/images/home/slide-engadin.png',
    body: 'High valleys at 1,800 metres, larch forests that turn gold in October, and villages whose walls are scratched with sgraffito patterns rather than painted.',
  },
  {
    region: 'Ticino', title: 'The Italian side', scene: 'sky-gold t-golden', image: '/images/home/slide-ticino.png',
    body: 'Cross the Gotthard and the language, the food and the prices all shift at once. Lake steamers that carry on into Italy, and valleys where the church bells are the only timetable.',
  },
];

export interface GalleryTile {
  name: string;
  canton: string;
  scene: SceneVariant;
  image: string;
  colSpan: 1 | 2;
  rowSpan: 1 | 2;
  /** Kept in the six-tile two-column mobile gallery. */
  mobile: boolean;
}

/** Nine tiles that span-tile exactly into 4 rows of a 4-column grid (spec §4.1). */
export const GALLERY: GalleryTile[] = [
  { name: 'Oeschinensee', canton: 'Bern', scene: 'sky-clear t-glacier', image: '/images/gallery/oeschinensee.png', colSpan: 2, rowSpan: 2, mobile: true },
  { name: 'Chapel Bridge', canton: 'Lucerne', scene: 'sky-mist t-slate', image: '/images/gallery/chapel-bridge.png', colSpan: 1, rowSpan: 1, mobile: true },
  { name: 'Aletsch Glacier', canton: 'Valais', scene: 'sky-storm t-glacier', image: '/images/gallery/aletsch-glacier.png', colSpan: 1, rowSpan: 2, mobile: true },
  { name: 'Limmat quays', canton: 'Zürich', scene: 'sky-gold t-golden', image: '/images/gallery/limmat-quays.png', colSpan: 1, rowSpan: 1, mobile: false },
  { name: 'Staubbach Falls', canton: 'Bern', scene: 'sky-mist t-emerald', image: '/images/gallery/staubbach-falls.png', colSpan: 2, rowSpan: 2, mobile: true },
  { name: 'Bernina Express', canton: 'Graubünden', scene: 'sky-dusk t-slate', image: '/images/gallery/bernina-express.png', colSpan: 1, rowSpan: 1, mobile: false },
  { name: 'Lake Lugano', canton: 'Ticino', scene: 'sky-gold t-emerald', image: '/images/gallery/lake-lugano.png', colSpan: 1, rowSpan: 1, mobile: true },
  { name: 'Gornergrat', canton: 'Valais', scene: 'sky-dawn t-alpine', image: '/images/gallery/gornergrat.png', colSpan: 1, rowSpan: 1, mobile: true },
  { name: 'Rhine Falls', canton: 'Schaffhausen', scene: 'sky-clear t-emerald', image: '/images/gallery/rhine-falls.png', colSpan: 1, rowSpan: 1, mobile: false },
];

export interface Good {
  name: string;
  kind: 'Grocery' | 'Souvenir';
  tab: 'grocery' | 'souvenir';
  price: string;
  where: string;
  swatch: string;
  ink: string;
  icon: string;
  note: string;
}

export const GOODS: Good[] = [
  {
    name: 'Toblerone', kind: 'Grocery', tab: 'grocery', price: 'CHF 3–5 · 100 g', where: 'Any Coop',
    swatch: '#F2E3C6', ink: '#6B5327', icon: 'M12 4l8 14H4zM8 18l4-7 4 7',
    note: 'The triangular one, with a bear hidden inside the mountain on the label. Supermarket price is roughly a third of the airport price.',
  },
  {
    name: 'Läderach FrischSchoggi', kind: 'Souvenir', tab: 'souvenir', price: 'CHF 10–14 · 100 g', where: 'Chocolatier',
    swatch: '#E3D2C4', ink: '#5A4232', icon: 'M4 5h16v14H4zM4 12h16M12 5v14',
    note: 'Broken slabs of fresh chocolate sold by weight. Buy a small piece — it does not survive a week in a warm backpack.',
  },
  {
    name: 'Le Gruyère AOP', kind: 'Grocery', tab: 'grocery', price: 'CHF 3–6 · portion', where: 'Cheese counter',
    swatch: '#F0DFB4', ink: '#6E5518', icon: 'M3 16l9-8h9v8zM8 13v.01M13 12v.01M17 14v.01',
    note: 'Hard, nutty, no holes — the holes are Emmental. Ask for a wedge cut, not the pre-packed one; it keeps for days on the trail.',
  },
  {
    name: 'Rivella', kind: 'Grocery', tab: 'grocery', price: 'CHF 1.5–2.5 · 500 ml', where: 'Any Coop',
    swatch: '#DCE6EA', ink: '#2E4A55', icon: 'M10 3h4v3l2 4v11H8V10l2-4z',
    note: 'A soft drink made from milk whey. Sounds wrong, tastes like a light herbal cola, and is almost impossible to find abroad.',
  },
  {
    name: 'Aromat', kind: 'Grocery', tab: 'grocery', price: 'CHF 3–4 · shaker', where: 'Any Coop',
    swatch: '#F3D9AE', ink: '#6A4A17', icon: 'M9 4h6v3H9zM8 7h8v13H8zM10 11h4M10 14h4',
    note: 'The yellow seasoning shaker in every Swiss kitchen. Goes on eggs, potatoes and hostel pasta, and weighs almost nothing.',
  },
  {
    name: 'Victorinox knife', kind: 'Souvenir', tab: 'souvenir', price: 'CHF 25–70', where: 'Hardware & kiosks',
    swatch: '#EDD3D0', ink: '#7A2A26', icon: 'M4 12a8 8 0 0116 0v3H4zM4 15h16M12 8v4',
    note: 'Made in Ibach since 1884. Buy the small Classic for the keyring — and put it in checked luggage, not your daypack.',
  },
  {
    name: 'Cowbell (Treichel)', kind: 'Souvenir', tab: 'souvenir', price: 'CHF 20–120', where: 'Mountain villages',
    swatch: '#E7DCCB', ink: '#5C4A2E', icon: 'M9 4h6v4a5 5 0 013 4.6V17H6v-4.4A5 5 0 019 8zM6 17h12M11 20h2',
    note: 'Sold in every size from keyring to knee-height. The leather collar with hand-painted alpine scenes is the part worth paying for.',
  },
  {
    name: 'Ricola herb drops', kind: 'Grocery', tab: 'grocery', price: 'CHF 2–3 · bag', where: 'Any kiosk',
    swatch: '#D9E5D2', ink: '#3C5433', icon: 'M12 21V9M12 12c-4 0-6-3-6-6 3 0 6 1 6 6zM12 14c4 0 6-3 6-6-3 0-6 1-6 6z',
    note: 'Thirteen Swiss herbs, made in Laufen. Cheap, light, and the most portable souvenir on this list.',
  },
];

export const SHOP_TABS: FilterDef[] = [
  { id: 'all', label: 'Everything', icon: 'M4 6h16M4 12h16M4 18h16' },
  { id: 'grocery', label: 'Groceries', icon: 'M4 6h16l-1.4 10.4a2 2 0 01-2 1.6H7.4a2 2 0 01-2-1.6zM9 6V4.5A3 3 0 0115 4.5V6' },
  { id: 'souvenir', label: 'Souvenirs', icon: 'M12 3l2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.4 9.4l6.1-.8z' },
];

export type TravelerTag = 'budget' | 'hiking' | 'city' | 'rail' | 'lakes';

export interface Destination {
  name: string;
  canton: string;
  x: string;
  y: string;
  scene: SceneVariant;
  image: string;
  tags: TravelerTag[];
  body: string;
  getting: string;
  budget: string;
  when: string;
}

export const DESTINATIONS: Destination[] = [
  {
    name: 'Zermatt', canton: 'Valais', x: '40%', y: '72%', scene: 'sky-dawn t-alpine', image: '/images/home/map-zermatt.png', tags: ['hiking', 'rail'],
    body: 'Car-free, ringed by 4,000-metre peaks, and the base for the Gornergrat railway. Beds are expensive; the marked trails out of the village cost nothing.',
    getting: 'Change at Visp, then the Matterhorn Gotthard Bahn — cars stop at Täsch.',
    budget: 'Dorm beds are scarce; Täsch and Randa are cheaper bases.',
    when: 'July–September for trails, December–April for snow.',
  },
  {
    name: 'Lauterbrunnen', canton: 'Bern', x: '45.5%', y: '64%', scene: 'sky-mist t-emerald', image: '/images/home/map-lauterbrunnen.png', tags: ['budget', 'hiking'],
    body: 'A flat valley floor between three-hundred-metre cliffs, with car-free Wengen and Mürren on the terraces above. One of the cheapest serious mountain bases in the country.',
    getting: 'Train from Interlaken Ost, roughly 20 minutes.',
    budget: 'Campsites and hostels on the valley floor; walk up instead of riding cable cars.',
    when: 'May–October; waterfalls are fullest in early summer.',
  },
  {
    name: 'Interlaken', canton: 'Bern', x: '48.5%', y: '55%', scene: 'sky-clear t-glacier', image: '/images/home/map-interlaken.png', tags: ['budget', 'lakes', 'rail'],
    body: 'The hub between two lakes. Touristy in the centre, but every Oberland train starts here and the lakeside paths cost nothing.',
    getting: 'Direct trains from Bern, Lucerne and Zürich.',
    budget: 'One of the densest clusters of hostels in the Alps — book ahead in August.',
    when: 'Year-round; shoulder seasons are noticeably cheaper.',
  },
  {
    name: 'Lucerne', canton: 'Lucerne', x: '53%', y: '41%', scene: 'sky-gold t-golden', image: '/images/home/map-lucerne.png', tags: ['city', 'lakes', 'rail'],
    body: 'Covered wooden bridge, painted facades, and a lake with steamers that your rail pass may already cover.',
    getting: 'One hour from Zürich; nearer three from Geneva.',
    budget: 'Day-trippable from cheaper towns if beds here are full.',
    when: 'April–October for boats; the old town works in any weather.',
  },
  {
    name: 'Zürich', canton: 'Zürich', x: '59%', y: '29%', scene: 'sky-dusk t-slate', image: '/images/home/map-zurich.png', tags: ['city', 'rail'],
    body: 'The main gateway. River swimming in summer, a serious gallery scene, and the busiest station in the country, a bridge away from the old town.',
    getting: 'Airport is 10 minutes by train from the centre.',
    budget: 'Highest prices in the guide — eat from supermarkets, swim for free.',
    when: 'June–August for the river baths.',
  },
  {
    name: 'Bern', canton: 'Bern', x: '39.5%', y: '48%', scene: 'sky-gold t-golden', image: '/images/home/map-bern.png', tags: ['city', 'budget'],
    body: 'The federal capital: a sandstone old town inside a river bend, arcades for six kilometres, and locals floating down the Aare on hot days.',
    getting: 'Central on the rail network — under two hours from almost anywhere.',
    budget: 'Cheaper than Zürich or Geneva, and walkable end to end.',
    when: 'Summer for the river; arcades keep you dry the rest of the year.',
  },
  {
    name: 'Geneva', canton: 'Geneva', x: '12%', y: '61%', scene: 'sky-mist t-slate', image: '/images/home/map-geneva.png', tags: ['city', 'lakes'],
    body: 'French-speaking, international, and pressed against the far end of the lake. Good entry point if you are arriving from France.',
    getting: 'Airport with its own rail station; TGV to Paris.',
    budget: 'Free public transport ticket from most hotels and hostels.',
    when: 'Spring and autumn; the lakefront is best in warm weather.',
  },
  {
    name: 'Engadin', canton: 'Graubünden', x: '84%', y: '50%', scene: 'sky-clear t-glacier', image: '/images/home/map-engadin.png', tags: ['hiking', 'rail'],
    body: 'Thin air at 1,800 metres, lakes that stay frozen into April, and the Bernina line climbing past glaciers on ordinary regional tickets.',
    getting: 'Rhaetian Railway from Chur, climbing the whole way.',
    budget: 'Regional trains cost a fraction of the branded panoramic ones.',
    when: 'Late June–October, or February for the light.',
  },
  {
    name: 'Lugano', canton: 'Ticino', x: '69.5%', y: '87%', scene: 'sky-gold t-emerald', image: '/images/home/map-lugano.png', tags: ['lakes', 'city'],
    body: 'Italian-speaking Switzerland: palm trees on the promenade, grotti in the hills, and river gorges warm enough to swim in.',
    getting: 'Through the Gotthard base tunnel from Zürich, about two hours.',
    budget: 'Food is better value here than in most of the country — look for a grotto menu.',
    when: 'May–September.',
  },
];

export const TRAVELER_FILTERS: FilterDef[] = [
  { id: 'all', label: 'Show everything', icon: 'M12 3l2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.4 9.4l6.1-.8z' },
  { id: 'budget', label: 'Tight budget', icon: 'M8 7V5a4 4 0 018 0v2M5 7h14v13H5z' },
  { id: 'hiking', label: 'Hiking', icon: 'M3 20l6-13 4 8 3-5 5 10z' },
  { id: 'city', label: 'Cities & culture', icon: 'M6 21V9l6-5 6 5v12M10 21v-6h4v6' },
  { id: 'rail', label: 'Rail journeys', icon: 'M5 5h14v9H5zM5 10h14M8 20l2-3M16 20l-2-3' },
  { id: 'lakes', label: 'Lakes & swimming', icon: 'M3 15c3-3 6 3 9 0s6-3 9 0M3 19c3-3 6 3 9 0s6-3 9 0M12 4l3 5H9z' },
];

/** National map geometry (Main.dc.html L432–436): stylised CH outline plus
 *  dashed main rail corridors, on a 1000×620 viewBox. */
export const CH_MAP = {
  viewBox: '0 0 1000 620',
  outline: 'M70 380 L150 330 L212 300 L252 250 L300 190 L332 120 L362 76 L420 96 L470 70 L530 100 L600 86 L660 106 L720 96 L762 130 L820 160 L880 200 L950 250 L965 300 L930 332 L890 320 L860 350 L830 400 L790 420 L760 470 L730 520 L700 572 L664 546 L640 480 L600 460 L540 470 L480 450 L420 460 L360 440 L300 430 L250 415 L200 430 L150 420 L100 400 Z',
  corridors: 'M150 330 L300 430 M420 460 L470 350 L530 100 M470 350 L760 470 M660 106 L590 240 L470 350',
};

export interface Fact {
  label: string;
  value: string;
  note: string;
  icon: string;
}

export const FACTS: Fact[] = [
  { label: 'Languages', value: 'Four', note: 'German, French, Italian, Romansh — English is widely understood.', icon: 'M4 6h10M9 4v2c0 4-2 7-5 9M7 12c1.5 2.5 3.5 4 6 5M13 20l4-9 4 9M14.5 17h5' },
  { label: 'Currency', value: 'Swiss franc', note: 'CHF. Euros are sometimes accepted, at a poor rate; cards work everywhere.', icon: 'M4 7h16v11H4zM4 11h16M8 14.5h.01' },
  { label: 'Capital', value: 'Bern', note: 'Federal city, not officially a capital. Zürich is the largest.', icon: 'M6 21V9l6-5 6 5v12M10 21v-6h4v6' },
  { label: 'Getting around', value: 'Rail, mostly', note: 'One integrated timetable for trains, buses, boats and cable cars.', icon: 'M5 5h14v9H5zM5 10h14M8 20l2-3M16 20l-2-3' },
  { label: 'Tap water', value: 'Drinkable', note: 'Including most public fountains — carry a bottle and refill.', icon: 'M12 3s6 7 6 11a6 6 0 11-12 0c0-4 6-11 6-11z' },
  { label: 'Tipping', value: 'Not expected', note: 'Service is included. Rounding up is a courtesy, not a rule.', icon: 'M12 3v18M8 7.5A3 3 0 0112 6a3 3 0 010 6 3 3 0 000 6 3 3 0 004-1.5' },
  { label: 'Power', value: 'Type J, 230 V', note: 'Swiss three-pin. Many EU two-pin plugs fit; three-pin EU plugs do not.', icon: 'M8 3v6M16 3v6M6 9h12v3a6 6 0 01-12 0zM12 18v3' },
  { label: 'Best months', value: 'June–September', note: 'High trails clear of snow. December–March for skiing and short days.', icon: 'M12 3v18M3 12h18M6 6l12 12M18 6L6 18' },
  { label: 'Borders', value: 'Five countries', note: 'Germany, France, Italy, Austria, Liechtenstein. In Schengen, outside the EU.', icon: 'M4 19V6l5-2 6 3 5-2v13l-5 2-6-3z M9 4v13M15 7v13' },
];
