// Hostels sample data — transcribed verbatim from design-source/Hostels.dc.html.
// All nightly rates are SAMPLE values (spec §3.2, blocking): a real feed with
// per-property dorm/twin/four-bed rates must replace them before launch.

export interface Hostel {
  name: string;
  town: string;
  /** Index into HOSTEL_REGIONS. */
  region: 0 | 1 | 2 | 3;
  /** Nightly rates, CHF: dorm per person; twin and quad per room. */
  dorm: number;
  twin: number;
  quad: number;
  /** Walk time to the station — display string, not always numeric ("Cable car"). */
  walk: string;
}

export const HOSTEL_REGIONS = ['Bernese Oberland', 'Valais', 'Graubünden', 'Ticino'] as const;

export const HOSTELS: Hostel[] = [
  { name: 'Valley Hostel', town: 'Lauterbrunnen', region: 0, dorm: 39, twin: 108, quad: 176, walk: '4 min' },
  { name: 'Alpenblick Backpackers', town: 'Interlaken', region: 0, dorm: 34, twin: 96, quad: 164, walk: '9 min' },
  { name: 'Eiger Lodge', town: 'Grindelwald', region: 0, dorm: 46, twin: 124, quad: 200, walk: '6 min' },
  { name: 'Chalet Bergsicht', town: 'Mürren', region: 0, dorm: 52, twin: 138, quad: 224, walk: 'Cable car' },
  { name: 'Aareblick Beds', town: 'Thun', region: 0, dorm: 31, twin: 88, quad: 148, walk: '12 min' },
  { name: 'Matterhorn Bunk', town: 'Randa', region: 1, dorm: 36, twin: 98, quad: 168, walk: '3 min' },
  { name: 'Rhone Valley Hostel', town: 'Sion', region: 1, dorm: 30, twin: 84, quad: 144, walk: '7 min' },
  { name: 'Engadin Base', town: 'Pontresina', region: 2, dorm: 42, twin: 116, quad: 192, walk: '10 min' },
  { name: 'Chur Old Town Beds', town: 'Chur', region: 2, dorm: 33, twin: 92, quad: 156, walk: '5 min' },
  { name: 'Grotto Hostel', town: 'Lugano', region: 3, dorm: 35, twin: 94, quad: 160, walk: '11 min' },
  { name: 'Lakeside Bunk', town: 'Locarno', region: 3, dorm: 32, twin: 90, quad: 152, walk: '8 min' },
];

export type Mode = 'cheap' | 'mixed' | 'private';

export const MODES: { id: Mode; label: string; icon: string }[] = [
  { id: 'cheap', label: 'Cheapest beds', icon: 'M4 7h16v11H4zM4 11h16' },
  { id: 'mixed', label: 'Share a room', icon: 'M3 18v-7a2 2 0 012-2h14v9M3 14h18M7 9V6h5v3' },
  { id: 'private', label: 'Privacy', icon: 'M7 11V8a5 5 0 0110 0v3M5 11h14v9H5z' },
];

/** One-paragraph tip shown for the active mode. */
export const MODE_TIPS: Record<Mode, string> = {
  cheap: 'Dorms are the cheapest way to sleep here, but bring earplugs and expect a 10am checkout.',
  mixed: 'Four-bed rooms are the sweet spot for groups — near dorm prices with your own door.',
  private: 'Twin rooms cost roughly three dorm beds. Worth it past a week; rarely worth it for two nights.',
};

/** Bed icon colours in the room-mix diagram (spec §5.4): occupied beds by room
 *  type; paid-for-but-empty beds render in EMPTY_BED. */
export const BED_COLORS: Record<'dorm' | 'twin' | 'quad', string> = {
  dorm: 'var(--faint)',
  twin: 'var(--red)',
  quad: 'var(--ink)',
};
export const EMPTY_BED = '#DED7CE';
