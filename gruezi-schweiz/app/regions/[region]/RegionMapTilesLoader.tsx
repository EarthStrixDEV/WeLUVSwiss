"use client";

import dynamic from "next/dynamic";
import type { RegionTileBounds } from "@/lib/data/regions";

// Leaflet touches `window`/`document` at import time, so the tile map can
// only be loaded on the client. `ssr: false` is only valid from a Client
// Component in the App Router (RegionPage itself is a Server Component),
// hence this thin client-only loader between the two.
const RegionMapTiles = dynamic(
  () => import("./RegionMapTiles").then((mod) => mod.RegionMapTiles),
  { ssr: false },
);

export function RegionMapTilesLoader({ bounds }: { bounds: RegionTileBounds }) {
  return <RegionMapTiles bounds={bounds} />;
}
