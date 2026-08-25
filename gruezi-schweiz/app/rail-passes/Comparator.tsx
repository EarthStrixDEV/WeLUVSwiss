"use client";

// Price comparison island (spec §5.5): station/day controls, the four-row
// comparison, and the sticky recommendation panel. All state lives here.

import { useState } from "react";
import { Chip } from "@/components/Chip";
import { Stepper } from "@/components/Stepper";
import { Icon } from "@/components/Icon";
import buttons from "@/components/buttons.module.css";
import { STATIONS } from "@/lib/data/rail";
import { chf, compareOptions } from "@/lib/rail-calc";
import styles from "./page.module.css";

export function Comparator() {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(4);
  const [days, setDays] = useState(5);

  const { options, best, second, gap } = compareOptions(from, to, days);

  return (
    <div className={styles.comparatorGrid}>
      <div>
        {/* Control card. */}
        <div className={styles.controlCard}>
          <div className={styles.controlLabel}>
            <Icon d="M12 2a9 9 0 100 18 9 9 0 000-18zM12 6v6M17 12h-5" size={17} strokeWidth={1.7} color="var(--red)" />
            Departing from
          </div>
          <div className={styles.chipRow} role="group" aria-label="Departing from">
            {STATIONS.map((s, i) => (
              <Chip key={s.name} label={s.name} compact pressed={i === from} onClick={() => setFrom(i)} />
            ))}
          </div>

          <div className={`${styles.controlLabel} ${styles.controlLabelSpaced}`}>
            <Icon
              d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"
              size={17}
              strokeWidth={1.7}
              color="var(--red)"
            />
            Travelling to
          </div>
          <div className={styles.chipRow} role="group" aria-label="Travelling to">
            {STATIONS.map((s, i) => (
              <Chip key={s.name} label={s.name} compact pressed={i === to} onClick={() => setTo(i)} />
            ))}
          </div>

          <div className={styles.daysRow}>
            <div>
              <div className={styles.controlLabel}>Days you will be moving</div>
              <div className={styles.daysHint}>Only count days you take a long train, not rest days.</div>
            </div>
            <Stepper label="Days you will be moving" noun="day" value={days} min={1} max={15} onChange={setDays} />
          </div>
        </div>

        {/* Comparison rows. */}
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <div>How you buy it</div>
            <div>Up front</div>
            <div>Per journey</div>
            <div className={styles.tableHeadTotal}>Total</div>
          </div>
          {options.map((o) => (
            <div key={o.id} className={`${styles.row} ${o.isBest ? styles.rowBest : ""}`}>
              <div className={styles.rowMain}>
                <div className={styles.rowNameLine}>
                  <span className={styles.rowName}>{o.name}</span>
                  {o.isBest && <span className={styles.badge}>Best rate</span>}
                </div>
                <div className={styles.rowNote}>{o.note}</div>
              </div>
              <div className={styles.cellLabel}>Up front</div>
              <div className={styles.cellValue}>{o.upfront}</div>
              <div className={styles.cellLabel}>Per journey</div>
              <div className={styles.cellValue}>{o.per}</div>
              <div className={styles.cellLabel}>Total</div>
              <div className={`serif ${styles.rowTotal} ${o.isBest ? styles.rowTotalBest : ""}`}>{chf(o.total)}</div>
            </div>
          ))}
        </div>
        <div className={styles.footnote}>
          * Sample fares for layout, second class, adult. Distances are approximate and pass prices
          change yearly — wire this to live SBB data before launch.
        </div>

        <p className="sr-only" aria-live="polite">
          {best.name} is currently the cheapest option, at {chf(best.total)} for {days} moving days.
        </p>
      </div>

      {/* Sticky recommendation panel. */}
      <div className={styles.recPanel}>
        <div className={styles.recEyebrow}>
          <Icon
            d="M12 3l2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.4 9.4l6.1-.8z"
            size={17}
            strokeWidth={1.7}
            color="var(--on-dark-accent)"
          />
          Our recommendation
        </div>
        <h3 className={`serif ${styles.recName}`}>{best.name}</h3>
        <div className={styles.recTotalRow}>
          <div className={`serif ${styles.recTotal}`}>{chf(best.total)}</div>
          <div className={styles.recTotalCaption}>for {days} moving days</div>
        </div>
        <p className={styles.recWhy}>{best.why}</p>
        <div className={styles.recSecond}>
          Second best is <span className={styles.recSecondName}>{second.name}</span> at{" "}
          {chf(second.total)} — a difference of CHF {gap}.
        </div>
        <div className={styles.recCaveat}>
          <Icon
            d="M12 3a9 9 0 100 18 9 9 0 000-18zM12 8v5M12 16v.01"
            size={17}
            strokeWidth={1.7}
            color="var(--on-dark-accent)"
          />
          <span>
            Mountain railways above the main network are only part-covered by any pass — budget
            separately for those.
          </span>
        </div>
        <button type="button" className={`${buttons.btn} ${buttons.red} ${styles.recButton}`}>
          <Icon d="M4 4h16v12H4zM4 10h16M8 20l2-3M16 20l-2-3" size={18} strokeWidth={1.7} />
          Where to buy it
        </button>
      </div>
    </div>
  );
}
