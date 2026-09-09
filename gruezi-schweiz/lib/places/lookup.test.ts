import { afterEach, describe, expect, it, vi } from 'vitest';
import { lookupPlace } from './lookup';

// Real geo.admin.ch SearchServer shape (type=locations&sr=4326): results[].attrs
// nests lat/lon (WGS84, because sr=4326 was requested) and an HTML-formatted label.
function geoAdminResponse(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    results: [
      {
        id: 2069,
        weight: 100,
        attrs: {
          label: '<b>Zermatt (VS)</b>',
          lat: 45.99043273925781,
          lon: 7.742079257965088,
          x: 7.742079257965088,
          y: 45.99043273925781,
          rank: 2,
          origin: 'gg25',
          ...overrides,
        },
      },
    ],
  };
}

function nominatimResponse(overrides: Partial<Record<string, unknown>> = {}) {
  return [
    {
      place_id: 416629168,
      lat: '46.6855231',
      lon: '7.8585139',
      name: 'Interlaken',
      display_name:
        'Interlaken, Verwaltungskreis Interlaken-Oberhasli, Verwaltungsregion Oberland, Bern/Berne, 3800, Schweiz/Suisse/Svizzera/Svizra',
      boundingbox: ['46.6645890', '46.7040906', '7.8267786', '7.8887741'],
      ...overrides,
    },
  ];
}

function jsonResponse(body: unknown) {
  return { ok: true, json: async () => body } as Response;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('lookupPlace', () => {
  it('resolves a known Swiss place via geo.admin.ch with WGS84 coordinates', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(geoAdminResponse()));
    vi.stubGlobal('fetch', fetchMock);

    const result = await lookupPlace('Zermatt');

    expect(result).toEqual({
      status: 'ok',
      results: [{ name: 'Zermatt (VS)', lat: 45.99043273925781, lng: 7.742079257965088, source: 'geoadmin' }],
    });
    const [url] = fetchMock.mock.calls[0] as [string];
    expect(url).toContain('api3.geo.admin.ch/rest/services/api/SearchServer');
    expect(url).toContain('sr=4326');
    expect(url).toContain('type=locations');
  });

  it('never sends an API key to geo.admin.ch or Nominatim', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(geoAdminResponse()));
    vi.stubGlobal('fetch', fetchMock);

    await lookupPlace('Zermatt');

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit | undefined];
    expect(url.toLowerCase()).not.toContain('key=');
    expect(url.toLowerCase()).not.toContain('token=');
    expect(init?.headers).toBeUndefined();
  });

  it('falls back to OSM Nominatim when geo.admin.ch is unreachable', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error('network down'))
      .mockResolvedValueOnce(jsonResponse(nominatimResponse()));
    vi.stubGlobal('fetch', fetchMock);

    const result = await lookupPlace('Interlaken');

    expect(result).toEqual({
      status: 'ok',
      results: [{ name: 'Interlaken', lat: 46.6855231, lng: 7.8585139, source: 'osm' }],
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const [nominatimUrl] = fetchMock.mock.calls[1] as [string];
    expect(nominatimUrl).toContain('nominatim.openstreetmap.org/search');
    expect(nominatimUrl).toContain('format=json');
  });

  it('filters out Nominatim results outside the Swiss bounding box', async () => {
    const fetchMock = vi.fn().mockRejectedValueOnce(new Error('network down')).mockResolvedValueOnce(
      jsonResponse(
        nominatimResponse({
          name: 'Interlaken, Indonesia (not real, just far away)',
          lat: '-6.2000',
          lon: '106.8166',
        }),
      ),
    );
    vi.stubGlobal('fetch', fetchMock);

    const result = await lookupPlace('Interlaken');

    expect(result).toEqual({ status: 'ok', results: [] });
  });

  it('keeps Nominatim results on the edge of the Swiss bounding box', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error('network down'))
      .mockResolvedValueOnce(jsonResponse(nominatimResponse({ lat: '45.85', lon: '6.0' })));
    vi.stubGlobal('fetch', fetchMock);

    const result = await lookupPlace('Interlaken');

    expect(result.status).toBe('ok');
    expect(result.status === 'ok' && result.results).toHaveLength(1);
  });

  it('returns an explicit unavailable result when both sources are unreachable', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('network down'));
    vi.stubGlobal('fetch', fetchMock);

    const result = await lookupPlace('Zermatt');

    expect(result).toEqual({ status: 'unavailable' });
  });

  it('treats a non-ok HTTP response from geo.admin.ch as unreachable and falls back', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 500, json: async () => ({}) } as Response)
      .mockResolvedValueOnce(jsonResponse(nominatimResponse()));
    vi.stubGlobal('fetch', fetchMock);

    const result = await lookupPlace('Interlaken');

    expect(result.status).toBe('ok');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('returns unavailable, not a thrown error, when both sources return non-ok responses', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 503, json: async () => ({}) } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await expect(lookupPlace('Zermatt')).resolves.toEqual({ status: 'unavailable' });
  });
});
