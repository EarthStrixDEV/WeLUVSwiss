// Hostel room allocation — spec §5.4, ported verbatim from the design artboard
// (design-source/Hostels.dc.html, allocate()). The room-type model assumes every
// property offers dorm, twin and four-bed rates (spec §3.2 — a feed that only
// exposes dorm rates breaks `mixed` and `private`).
//
// Q3 (spec §7) is deliberately unresolved: behaviour when a group exceeds a
// property's real capacity is not designed yet. Do not invent a fallback here.

import type { Hostel, Mode } from './data/hostels';

export interface Room {
  kind: 'dorm' | 'twin' | 'quad';
  /** Beds occupied by the group. */
  n: number;
  /** Beds paid for (room capacity) — may exceed `n`; the diagram renders the
   *  difference as grey "paid for and empty" beds. That is the point of the
   *  whole feature (spec §5.4). */
  cap: number;
  /** Cost per night for these rooms, CHF. */
  cost: number;
  label: string;
  detail: string;
}

export interface Allocation {
  rooms: Room[];
  perNight: number;
  total: number;
}

export function allocate(h: Hostel, people: number, nights: number, mode: Mode): Allocation {
  const rooms: Room[] = [];
  if (mode === 'cheap') {
    rooms.push({
      kind: 'dorm', n: people, cap: people, cost: people * h.dorm,
      label: 'Shared dorm', detail: `${people} beds in a mixed dorm`,
    });
  } else if (mode === 'private') {
    const twins = Math.ceil(people / 2);
    rooms.push({
      kind: 'twin', n: people, cap: twins * 2, cost: twins * h.twin,
      label: `${twins} twin room${twins > 1 ? 's' : ''}`, detail: 'Two beds, own door',
    });
  } else {
    const quads = Math.floor(people / 4);
    const rest = people - quads * 4;
    if (quads) {
      rooms.push({
        kind: 'quad', n: quads * 4, cap: quads * 4, cost: quads * h.quad,
        label: `${quads} four-bed room${quads > 1 ? 's' : ''}`, detail: 'Private, just your group',
      });
    }
    if (rest === 1) {
      rooms.push({ kind: 'dorm', n: 1, cap: 1, cost: h.dorm, label: '1 dorm bed', detail: 'The odd one out' });
    } else if (rest > 1) {
      const twins = Math.ceil(rest / 2);
      rooms.push({
        kind: 'twin', n: rest, cap: twins * 2, cost: twins * h.twin,
        label: `${twins} twin room${rest > 2 ? 's' : ''}`, detail: 'For the remainder',
      });
    }
  }
  const perNight = rooms.reduce((t, r) => t + r.cost, 0);
  return { rooms, perNight, total: perNight * nights };
}

export interface PricedHostel {
  hostel: Hostel;
  allocation: Allocation;
}

/** Price every hostel in a region for the group and sort ascending by total.
 *  The "Best rate" badge follows index 0 — it moves with the state, never a
 *  fixed property (spec §5.4 acceptance). Array.prototype.sort is stable, so
 *  ties keep the data order like the artboard. */
export function priceAndSort(
  hostels: Hostel[], region: number, people: number, nights: number, mode: Mode,
): PricedHostel[] {
  return hostels
    .filter((h) => h.region === region)
    .map((h) => ({ hostel: h, allocation: allocate(h, people, nights, mode) }))
    .sort((a, b) => a.allocation.total - b.allocation.total);
}

export const PEOPLE_MIN = 1;
export const PEOPLE_MAX = 12;
export const NIGHTS_MIN = 1;
export const NIGHTS_MAX = 21;
