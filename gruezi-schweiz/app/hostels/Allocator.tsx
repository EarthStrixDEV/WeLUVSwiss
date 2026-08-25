"use client";

// The hostel allocator (spec §5.4) — the most complex logic on the site.
// Owns every piece of interactive state on the page: people, nights, sleeping
// mode, region and the selected hostel. `hostel` is an index into the
// SORTED list, and the selection follows the sort — every render re-derives
// `selected` from the freshly sorted `priced` array at that index, so if the
// sort order changes the index still points at "the row currently there",
// exactly like the artboard's reference logic.
import { useMemo, useState } from "react";
import Link from "next/link";
import { Chip } from "@/components/Chip";
import { Stepper } from "@/components/Stepper";
import { Icon } from "@/components/Icon";
import buttons from "@/components/buttons.module.css";
import { allocate, priceAndSort, PEOPLE_MIN, PEOPLE_MAX, NIGHTS_MIN, NIGHTS_MAX } from "@/lib/allocate";
import {
  HOSTELS,
  HOSTEL_REGIONS,
  MODES,
  MODE_TIPS,
  BED_COLORS,
  EMPTY_BED,
  type Mode,
} from "@/lib/data/hostels";
import styles from "./Allocator.module.css";

function chf(n: number) {
  return `CHF ${n}`;
}

export function Allocator() {
  const [people, setPeople] = useState(4);
  const [nights, setNights] = useState(3);
  const [mode, setMode] = useState<Mode>("cheap");
  const [region, setRegion] = useState(0);
  const [hostel, setHostel] = useState(0);

  const priced = useMemo(
    () => priceAndSort(HOSTELS, region, people, nights, mode),
    [region, people, nights, mode],
  );

  const cheapest = priced[0];
  const selected = priced[hostel] ?? cheapest;

  const regionName = HOSTEL_REGIONS[region];

  // Room-mix diagram for the selected hostel: one bed icon per bed of
  // capacity, not per person — beds n..cap-1 are paid for but empty (spec §5.4).
  const diagramRooms = selected.allocation.rooms.map((r) => {
    const beds = Array.from({ length: r.cap }, (_, i) => (i < r.n ? BED_COLORS[r.kind] : EMPTY_BED));
    return { ...r, beds };
  });

  const capacity = selected.allocation.rooms.reduce((t, r) => t + r.cap, 0);
  const spareBeds = capacity - people;
  const spareNote =
    spareBeds > 0 ? `${spareBeds} bed${spareBeds > 1 ? "s" : ""} paid for and empty` : "No wasted beds";

  const perPersonPerNight = (total: number) => Math.round(total / people / nights);

  // "Switching to {other mode}" delta, restated on the sticky panel — ported
  // from the artboard's reference logic (cheap <-> mixed comparison).
  const otherMode: Mode = mode === "cheap" ? "mixed" : "cheap";
  const otherTotal = allocate(cheapest.hostel, people, nights, otherMode).total;
  const delta = otherTotal - cheapest.allocation.total;
  const otherLabel = otherMode === "cheap" ? "cheapest beds" : "shared rooms";

  const liveAnnouncement = `${selected.hostel.name} selected. Total ${chf(
    selected.allocation.total,
  )} for ${people} over ${nights} night${nights > 1 ? "s" : ""}. ${spareNote}.`;

  return (
    <>
      {/* Allocator — control card, room-mix diagram, sticky best-rate panel (spec §5.4). */}
      <section className={`${styles.allocatorSection} gutter`}>
        <div className={styles.grid}>
          <div>
            <div className="eyebrow" style={{ color: "var(--red)" }}>Your group</div>
            <h2 className={`serif ${styles.title}`}>Allocate the beds</h2>

            <div className={styles.controlCard}>
              <div className={styles.stepperRow}>
                <div>
                  <div className={styles.fieldLabel}>People</div>
                  <div className={styles.stepperWrap}>
                    <Stepper
                      label="People in your group"
                      noun="traveller"
                      value={people}
                      min={PEOPLE_MIN}
                      max={PEOPLE_MAX}
                      onChange={(v) => {
                        setPeople(v);
                        setHostel(0);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className={styles.fieldLabel}>Nights</div>
                  <div className={styles.stepperWrap}>
                    <Stepper
                      label="Nights you will stay"
                      noun="night"
                      value={nights}
                      min={NIGHTS_MIN}
                      max={NIGHTS_MAX}
                      onChange={setNights}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.controlGroup}>
                <div className={styles.fieldLabel}>How you want to sleep</div>
                <div className={styles.chipRow}>
                  {MODES.map((m) => (
                    <Chip
                      key={m.id}
                      label={m.label}
                      icon={m.icon}
                      pressed={mode === m.id}
                      onClick={() => {
                        setMode(m.id);
                        setHostel(0);
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.controlGroup}>
                <div className={styles.fieldLabel}>Region</div>
                <div className={styles.chipRowWrap}>
                  {HOSTEL_REGIONS.map((name, i) => (
                    <Chip
                      key={name}
                      label={name}
                      icon="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"
                      pressed={region === i}
                      onClick={() => {
                        setRegion(i);
                        setHostel(0);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Room-mix diagram (spec §5.4) — the point of the whole feature: it
                makes the cost of an odd-sized group visible. */}
            <div className={styles.diagramCard}>
              <div className={styles.diagramHead}>
                <div>
                  <div className={styles.fieldLabel}>Room mix at {selected.hostel.name}</div>
                  <div className={`serif ${styles.diagramSummary}`}>
                    {chf(selected.allocation.perNight)} a night for {people}
                  </div>
                </div>
                <div className={styles.spareNote}>{spareNote}</div>
              </div>

              <div className={styles.roomList}>
                {diagramRooms.map((r, i) => (
                  <div key={`${r.kind}-${i}`} className={styles.roomRow}>
                    <div>
                      <div className={styles.roomLabel}>{r.label}</div>
                      <div className={styles.roomDetail}>{r.detail}</div>
                    </div>
                    <div className={styles.beds}>
                      {r.beds.map((color, bi) => (
                        <BedIcon key={bi} color={color} />
                      ))}
                    </div>
                    <div className={`serif ${styles.roomCost}`}>{chf(r.cost)} / night</div>
                  </div>
                ))}
              </div>

              <div className={styles.tipRow}>
                <Icon
                  d="M12 8v5M12 16v.01M12 3l9 16H3z"
                  size={17}
                  strokeWidth={1.7}
                  color="var(--red)"
                />
                {MODE_TIPS[mode]}
              </div>
            </div>

            {/* Live region — announces selection changes non-visually (spec §6). */}
            <p className="sr-only" role="status" aria-live="polite">
              {liveAnnouncement}
            </p>
          </div>

          {/* Sticky best-rate panel — always the cheapest row (spec §5.4). */}
          <div className={styles.bestPanel}>
            <div className={styles.bestEyebrow}>
              <Icon
                d="M12 3l2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.4 9.4l6.1-.8z"
                size={17}
                strokeWidth={1.7}
              />
              Best rate for {people}
            </div>
            <h3 className={`serif ${styles.bestName}`}>{cheapest.hostel.name}</h3>
            <div className={styles.bestTown}>{cheapest.hostel.town}</div>
            <div className={styles.bestTotalRow}>
              <div className={`serif ${styles.bestTotal}`}>{chf(cheapest.allocation.total)}</div>
              <div className={styles.bestTotalLabel}>total</div>
            </div>
            <div className={styles.bestPppn}>
              {chf(perPersonPerNight(cheapest.allocation.total))} per person per night
            </div>
            <p className={styles.bestWhy}>
              Cheapest room mix in {regionName} for {people} over {nights} night
              {nights > 1 ? "s" : ""}, once the whole group is accounted for rather than one bed at a
              time.
            </p>
            <div className={styles.bestSwitch}>
              Switching to <span className={styles.bestSwitchHighlight}>{otherLabel}</span> would cost{" "}
              {delta >= 0 ? `another ${chf(delta)}` : `${chf(Math.abs(delta))} less`}.
            </div>
            <button type="button" className={`${buttons.btn} ${buttons.red} ${styles.bestButton}`}>
              <Icon d="M5 5h14v14H5zM5 9h14M9 3v4M15 3v4" size={18} strokeWidth={1.7} />
              Hold these beds
            </button>
            <div className={styles.bestFootnote}>
              <Icon d="M4 4h16v12H4zM4 10h16M8 20l2-3M16 20l-2-3" size={16} strokeWidth={1.7} />
              <span>Every hostel here is under 15 minutes from a station.</span>
            </div>
          </div>
        </div>
      </section>

      <hr className={styles.rule} />

      {/* Hostel list — re-priced and re-sorted ascending on every state change
          (spec §5.4). Grid rows, not a table — restacks to cards below 900px
          (spec §6), never a horizontal scroll. */}
      <section className={`${styles.listSection} gutter`}>
        <div className={styles.listHead}>
          <div>
            <div className="eyebrow" style={{ color: "var(--red)" }}>Priced for your group</div>
            <h2 className={`serif ${styles.title}`}>
              {priced.length} hostels in {regionName}
            </h2>
          </div>
          <p className={styles.listLead}>
            Totals below already include the room mix above, so the cheapest dorm rate is not
            always the cheapest stay.
          </p>
        </div>

        <div className={styles.table}>
          <div className={styles.tableHeadRow}>
            <div className={styles.thHostel}>Hostel</div>
            <div className={styles.thMix}>Room mix for {people}</div>
            <div className={styles.thPppn}>Per person / night</div>
            <div className={styles.thWalk}>Walk to station</div>
            <div className={styles.thTotal}>Total</div>
          </div>

          {priced.map((p, i) => {
            const isSelected = p.hostel.name === selected.hostel.name;
            const isBest = i === 0;
            const mix = p.allocation.rooms.map((r) => r.label).join(" + ");
            return (
              <button
                key={p.hostel.name}
                type="button"
                className={`${styles.row} ${isSelected ? styles.rowSelected : ""}`}
                onClick={() => setHostel(i)}
              >
                <div className={styles.cellHostel}>
                  <div className={styles.hostelNameRow}>
                    <span className={`serif ${styles.hostelName}`}>{p.hostel.name}</span>
                    {isBest && <span className={styles.badge}>Best rate</span>}
                  </div>
                  <div className={styles.hostelTown}>{p.hostel.town}</div>
                </div>
                <div className={styles.cellMix}>
                  <span className={styles.cellLabelMobile}>Room mix for {people}</span>
                  {mix}
                </div>
                <div className={styles.cellPppn}>
                  <span className={styles.cellLabelMobile}>Per person / night</span>
                  {chf(perPersonPerNight(p.allocation.total))}
                </div>
                <div className={styles.cellWalk}>
                  <span className={styles.cellLabelMobile}>Walk to station</span>
                  {p.hostel.walk}
                </div>
                <div className={`serif ${styles.cellTotal}`}>{chf(p.allocation.total)}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Q3 (spec §7) unresolved: group exceeding a property's real capacity is not designed — no fallback invented. */}

      {/* Cross-links — interpolated with current state, so built inline rather
          than the shared CrossLinks (spec §4.4). Matches the shared .xlink look. */}
      <section className={styles.linksSection}>
        <div className="gutter">
        <div className="eyebrow" style={{ color: "var(--red)", marginBottom: 26 }}>Next</div>
        <div className={styles.linksGrid}>
          {region === 0 ? (
            <Link href="/regions/bernese-oberland" className={styles.xlink}>
              <Icon d="M3 20l6-13 4 8 3-5 5 10z" size={22} className={styles.xlinkIcon} />
              <span>
                <span className={styles.xlinkTitle}>Back to {regionName}</span>
                <span className={styles.xlinkBody}>
                  The map, the landmarks and a three-day route from one bed
                </span>
              </span>
            </Link>
          ) : (
            <div className={`${styles.xlink} ${styles.xlinkStatic}`}>
              <Icon d="M3 20l6-13 4 8 3-5 5 10z" size={22} className={styles.xlinkIcon} />
              <span>
                <span className={styles.xlinkTitle}>Back to {regionName}</span>
                <span className={styles.xlinkBody}>
                  Region guide not published yet — Bernese Oberland is the only one live
                </span>
              </span>
            </div>
          )}
          <Link href="/rail-passes" className={styles.xlink}>
            <Icon d="M4 4h16v12H4zM4 10h16M8 20l2-3M16 20l-2-3" size={22} className={styles.xlinkIcon} />
            <span>
              <span className={styles.xlinkTitle}>
                Which rail pass pays off for {nights} nights of moving
              </span>
              <span className={styles.xlinkBody}>Compare fares against the pass for these nights</span>
            </span>
          </Link>
        </div>
        </div>
      </section>
    </>
  );
}

/** Small inline bed glyph, ~18-22px, coloured by room type or grey when the
 * bed is paid for but unoccupied (spec §5.4). */
function BedIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={22}
      height={22}
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 18v-7a2 2 0 012-2h14v9M3 14h18M7 9V6h5v3" />
    </svg>
  );
}
