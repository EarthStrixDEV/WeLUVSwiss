"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { RegionTileBounds } from "@/lib/data/regions";
import styles from "./RegionMapTiles.module.css";

/**
 * Locked-viewport OSM tile backdrop for the region map (ticket 02,
 * docs/adr/0001-region-map-tile-based.md). Replaces the hand-drawn
 * RegionMapSvg for the Region Map only — the National Map keeps its SVG.
 *
 * The viewport is fixed to `bounds` with every pan/zoom interaction disabled,
 * so it renders as a static backdrop: MapExplorer still owns pin placement,
 * rendering its existing percentage-positioned buttons on top via
 * lib/map-projection.ts, which projects lat/lng against these same bounds.
 */
export function RegionMapTiles({ bounds }: { bounds: RegionTileBounds }) {
  const corners: [[number, number], [number, number]] = [
    [bounds.south, bounds.west],
    [bounds.north, bounds.east],
  ];

  return (
    <MapContainer
      bounds={corners}
      boundsOptions={{ animate: false }}
      // Allows fitBounds' computed zoom to stay fractional instead of being
      // floored/rounded to the nearest integer level (Leaflet default
      // zoomSnap=1). Without this, getBoundsZoom's snap step would zoom the
      // viewport out slightly further than `corners`, so the rendered tiles
      // would show more area than lib/map-projection.ts assumes when it
      // projects spots[].lat/lng into left/top percentages — pins would sit
      // closer to center than their real-world position (ticket 02 QA fix).
      zoomSnap={0}
      className={styles.map}
      // Locked viewport (CONTEXT.md "Locked Viewport"): no user pan/zoom.
      zoomControl={false}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      touchZoom={false}
      boxZoom={false}
      keyboard={false}
      attributionControl={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // OSM attribution is required by its tile usage policy; swisstopo
        // credit is required separately because the pin coordinates were
        // sourced from geo.admin.ch (ADR 0001 / CONTEXT.md).
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &middot; &copy; swisstopo'
      />
    </MapContainer>
  );
}
