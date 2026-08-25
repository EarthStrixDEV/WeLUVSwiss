import { SectionHead } from "@/components/SectionHead";
import { MapExplorer } from "@/components/map/MapExplorer";
import type { MapLegendItem, MapPlace } from "@/lib/types";
import { CH_MAP, DESTINATIONS, TRAVELER_FILTERS } from "@/lib/data/landing";
import styles from "./RecommendationMap.module.css";

const PLACES: MapPlace[] = DESTINATIONS.map((d) => ({
  name: d.name,
  x: d.x,
  y: d.y,
  tags: d.tags,
  scene: d.scene,
  image: d.image,
  eyebrow: d.canton,
  body: d.body,
  facts: [
    { icon: "M4 4h16v12H4zM4 10h16M8 20l2-3M16 20l-2-3", text: d.getting },
    { icon: "M4 7h16v11H4zM4 11h16M8 14.5h.01", text: d.budget },
    { icon: "M5 5h14v14H5zM5 9h14M9 3v4M15 3v4", text: d.when },
  ],
}));

const LEGEND: MapLegendItem[] = [
  { kind: "selected", label: "Selected" },
  { kind: "match", label: "Matches your filter" },
  { kind: "dimmed", label: "Filtered out" },
  { kind: "dash", label: "Main rail corridors" },
];

/** National recommendation map (spec §4.1 §7 / §5.2) — dark section wrapping
 *  the shared MapExplorer with the CH outline + rail-corridor SVG. */
export function RecommendationMap() {
  return (
    <section className={styles.section}>
      <div className="gutter">
      <SectionHead
        eyebrow="Where should you actually go?"
        title="The recommendation map"
        lead="Tell it what kind of traveller you are; it dims everything that will not suit you. Then tap a pin for the honest version — cost, effort, and the best way in."
        onDark
        leadAside
      />
      <MapExplorer
        places={PLACES}
        filters={TRAVELER_FILTERS}
        legend={LEGEND}
        initialIndex={0}
        placeNoun="destinations"
        mapSvg={
          <svg viewBox={CH_MAP.viewBox}>
            <path d={CH_MAP.outline} fill="#2A241D" stroke="#4A4036" strokeWidth={2} />
            <path
              d={CH_MAP.corridors}
              stroke="#3A3229"
              strokeWidth={1.5}
              fill="none"
              strokeDasharray="5 7"
            />
          </svg>
        }
      />
      </div>
    </section>
  );
}
