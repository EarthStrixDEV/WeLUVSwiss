import { describe, expect, it } from 'vitest';
import { findMatchingSpotIndex } from './match';

const spots = [
  { name: 'Thun' },
  { name: 'Interlaken' },
  { name: 'Schynige Platte' },
  { name: 'Lauterbrunnen' },
  { name: 'Mürren' },
];

describe('findMatchingSpotIndex', () => {
  it('matches a geo.admin.ch-shaped label with a trailing canton qualifier', () => {
    // "Mürren (BE)" is the real shape lookupGeoAdmin returns (see
    // lookup.test.ts's geoAdminResponse fixture for "Zermatt (VS)").
    expect(findMatchingSpotIndex(spots, 'Mürren (BE)')).toBe(4);
  });

  it('matches a bare Nominatim-style name unchanged', () => {
    expect(findMatchingSpotIndex(spots, 'Mürren')).toBe(4);
  });

  it('does not false-positive match an unrelated place from another region', () => {
    expect(findMatchingSpotIndex(spots, 'Zermatt (VS)')).toBe(-1);
  });

  it('is case-insensitive', () => {
    expect(findMatchingSpotIndex(spots, 'mürren (be)')).toBe(4);
  });

  it('tolerates surrounding whitespace', () => {
    expect(findMatchingSpotIndex(spots, '  Mürren (BE)  ')).toBe(4);
  });
});
