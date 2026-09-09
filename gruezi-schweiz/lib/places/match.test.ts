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

  it('matches the real live geo.admin.ch compound shape: leading category label, embedded canton qualifier, and trailing disambiguator', () => {
    // Confirmed live against api3.geo.admin.ch/rest/services/api/SearchServer
    // (searchText=Murren&type=locations&sr=4326): the raw result is
    // '<i>Ort</i> <b>Mürren</b> (BE) - Lauterbrunnen'; the UI renders/passes
    // through a shape like "Populated Place Mürren (BE) - Lauterbrunnen"
    // after HTML stripping. A trailing-anchored qualifier regex never
    // matches this because " - Lauterbrunnen" trails after "(BE)".
    expect(findMatchingSpotIndex(spots, 'Populated Place Mürren (BE) - Lauterbrunnen')).toBe(4);
  });

  it('matches a label with a comma-separated list of trailing disambiguators', () => {
    // Real shape for "Schynige Platte": geo.admin.ch can list multiple
    // neighbouring municipalities after the canton qualifier.
    expect(
      findMatchingSpotIndex(spots, 'Massiv Schynige Platte (BE) - Bönigen,Gsteigwiler,Gündlischwand'),
    ).toBe(2);
  });

  it('does not match a spot name that is only a substring of a longer place name', () => {
    // "Thun" must not match inside "Thunstetten" — a real BE municipality
    // distinct from the Thun spot.
    expect(findMatchingSpotIndex(spots, 'Thunstetten (BE)')).toBe(-1);
  });
});
