// Rail pass comparison maths — spec §5.5.
//
// ============================================================================
// PLACEHOLDER FORMULA — MUST BE REPLACED, NOT TUNED (spec §3.1, Definition of
// Done). The fare below is derived from straight-line distances on a pseudo
// grid at a sample rate of CHF 0.55/km. Before launch this must be wired to
// real SBB point-to-point fares; the Saver Day Pass flat rate and pass prices
// are equally sample values (open questions Q1, spec §7).
// ============================================================================

import {
  STATIONS, STP_TIERS, HALF_FARE_CARD, SAVER_PER_DAY, OPTION_META,
} from './data/rail';

export const DAYS_MIN = 1;
export const DAYS_MAX = 15;

/** PLACEHOLDER: straight-line km × 1.25, then CHF 0.55/km, floor CHF 8. */
export function placeholderFare(fromIdx: number, toIdx: number): { km: number; fare: number } {
  const a = STATIONS[fromIdx];
  const b = STATIONS[toIdx];
  const km = Math.round(Math.hypot(a.x - b.x, a.y - b.y) * 1.25);
  return { km, fare: Math.max(8, Math.round(km * 0.55)) };
}

export interface RailOption {
  id: 'p2p' | 'half' | 'saver' | 'stp';
  name: string;
  note: string;
  why: string;
  /** Display strings — "Nothing" or "CHF n". */
  upfront: string;
  per: string;
  /** Numeric total, CHF. */
  total: number;
  isBest: boolean;
}

export interface RailComparison {
  fare: number;
  options: RailOption[];
  best: RailOption;
  second: RailOption;
  /** CHF gap between best and runner-up. */
  gap: number;
}

export const chf = (n: number) => `CHF ${n}`;

/** Swiss Travel Pass tier: first tier whose day count covers `days`, else the
 *  top tier (spec §5.5). */
export function stpTier(days: number) {
  return STP_TIERS.find((t) => days <= t.d) ?? STP_TIERS[STP_TIERS.length - 1];
}

export function compareOptions(fromIdx: number, toIdx: number, days: number): RailComparison {
  const { fare } = placeholderFare(fromIdx, toIdx);
  const stp = stpTier(days);
  const halfPer = Math.round(fare / 2);

  const meta = (id: RailOption['id']) => OPTION_META.find((m) => m.id === id)!;

  const raw: Omit<RailOption, 'isBest'>[] = [
    { ...meta('p2p'), upfront: 'Nothing', per: chf(fare), total: days * fare },
    { ...meta('half'), upfront: chf(HALF_FARE_CARD), per: chf(halfPer), total: HALF_FARE_CARD + days * halfPer },
    { ...meta('saver'), upfront: 'Nothing', per: chf(SAVER_PER_DAY), total: days * SAVER_PER_DAY },
    {
      ...meta('stp'),
      note: `${stp.d} consecutive days, boats and buses included`,
      upfront: chf(stp.p), per: 'Included', total: stp.p,
    },
  ];

  // Stable sort keeps the artboard's tie order (p2p, half, saver, stp).
  const sorted = raw.slice().sort((a, b) => a.total - b.total);
  const bestId = sorted[0].id;

  const options: RailOption[] = raw.map((o) => ({ ...o, isBest: o.id === bestId }));
  const best = options.find((o) => o.isBest)!;
  const second = options.find((o) => o.id === sorted[1].id)!;

  return { fare, options, best, second, gap: second.total - best.total };
}
