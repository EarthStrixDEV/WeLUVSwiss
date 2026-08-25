"use client";

import { useState, type ReactNode } from "react";
import { Chip } from "../Chip";
import { Icon } from "../Icon";
import { Scene } from "../Scene";
import type { FilterDef, MapLegendItem, MapPlace } from "@/lib/types";
import styles from "./MapExplorer.module.css";

/**
 * The shared map pattern (spec §5.2) — used at national scale on the landing
 * page and valley scale on the region page.
 *
 * State: `filter` (default "all") and `selected`. Pins that miss the filter dim
 * to opacity .22 but STAY clickable; the selected pin inverts and scales 1.35.
 * Selecting any pin swaps the detail card. The legend explains every rendered
 * state including the dimmed one, and a live region announces match counts
 * (spec §6). Pins are buttons positioned by percentage inside a box whose
 * padding-bottom fixes the SVG's aspect ratio, so they track at any width.
 */
export function MapExplorer({
  places,
  filters,
  legend,
  mapSvg,
  initialIndex = 0,
  placeNoun = "places",
}: {
  places: MapPlace[];
  filters: FilterDef[];
  legend: MapLegendItem[];
  mapSvg: ReactNode;
  initialIndex?: number;
  placeNoun?: string;
}) {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(initialIndex);

  const matches = (p: MapPlace) => filter === "all" || p.tags.includes(filter);
  const matchCount = places.filter(matches).length;
  const sel = places[selected];

  return (
    <div className={styles.explorer}>
      <div className={styles.filters}>
        {filters.map((f) => (
          <Chip
            key={f.id}
            label={f.label}
            icon={f.icon}
            count={f.id === "all" ? places.length : places.filter((p) => p.tags.includes(f.id)).length}
            pressed={filter === f.id}
            onDark
            onClick={() => setFilter(f.id)}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {matchCount} of {places.length} {placeNoun} match the current filter.
      </p>

      <div className={styles.grid}>
        <div className={styles.mapPanel}>
          <div className={styles.mapBox}>
            {mapSvg}
            {places.map((p, i) => (
              <button
                key={p.name}
                type="button"
                className={[
                  styles.pin,
                  i === selected && styles.pinOn,
                  !matches(p) && styles.pinOff,
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ left: p.x, top: p.y }}
                aria-pressed={i === selected}
                onClick={() => setSelected(i)}
              >
                <span className={styles.lab}>{p.name}</span>
                <span className={styles.dot} />
              </button>
            ))}
          </div>
          <div className={styles.legend}>
            {legend.map((item) => (
              <div key={item.label} className={styles.legendItem}>
                {item.kind === "selected" && <span className={styles.kSelected} />}
                {item.kind === "match" && <span className={styles.kMatch} />}
                {item.kind === "dimmed" && <span className={styles.kDimmed} />}
                {item.kind === "dash" && <span className={styles.kDash} />}
                {item.kind === "lake" && <span className={styles.kLake} />}
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.detail}>
          <Scene variant={sel.scene} image={sel.image} className={styles.detailScene} />
          <div className={styles.detailBody}>
            <div>
              <div className={`eyebrow ${styles.detailEyebrow}`}>{sel.eyebrow}</div>
              <h3 className={`serif ${styles.detailName}`}>{sel.name}</h3>
            </div>
            <p className={styles.detailText}>{sel.body}</p>
            <div className={styles.facts}>
              {sel.facts.map((fact) => (
                <div key={fact.text} className={styles.fact}>
                  <Icon d={fact.icon} size={17} color="var(--red)" className={styles.factIcon} />
                  {fact.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
