import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Scene } from "@/components/Scene";
import { Icon } from "@/components/Icon";
import { SectionHead } from "@/components/SectionHead";
import { CrossLinks } from "@/components/CrossLinks";
import { MapExplorer } from "@/components/map/MapExplorer";
import buttons from "@/components/buttons.module.css";
import { REGIONS } from "@/lib/data/regions";
import type { MapLegendItem, MapPlace } from "@/lib/types";
import { RegionMapSvg } from "./RegionMapSvg";
import styles from "./page.module.css";

const CLOCK_ICON = "M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2";
const WALLET_ICON = "M4 7h16v11H4zM4 11h16M8 14.5h.01";
const FLAG_ICON = "M3 20l6-13 4 8 3-5 5 10z";
const RAIL_ICON = "M4 4h16v12H4zM4 10h16M8 20l2-3M16 20l-2-3";
const BED_ICON = "M6 21V9l6-5 6 5v12M10 21v-6h4v6";
const SEARCH_ICON = "M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4.3-4.3";

const MAP_LEGEND: MapLegendItem[] = [
  { kind: "selected", label: "Selected" },
  { kind: "dimmed", label: "Filtered out" },
  { kind: "dash", label: "Rail & cable car" },
  { kind: "lake", label: "Lakes Thun & Brienz" },
];

export function generateStaticParams() {
  return Object.keys(REGIONS).map((region) => ({ region }));
}

export async function generateMetadata(props: PageProps<"/regions/[region]">): Promise<Metadata> {
  const { region } = await props.params;
  const content = REGIONS[region];
  if (!content) return {};
  return { title: `${content.name} — Grüezi Schweiz` };
}

export default async function RegionPage(props: PageProps<"/regions/[region]">) {
  const { region } = await props.params;
  const content = REGIONS[region];
  if (!content) notFound();

  const places: MapPlace[] = content.spots.map((spot) => ({
    name: spot.name,
    x: spot.x,
    y: spot.y,
    tags: [spot.type],
    scene: spot.scene,
    image: spot.image,
    eyebrow: spot.kind,
    body: spot.body,
    facts: [
      { icon: CLOCK_ICON, text: spot.time },
      { icon: WALLET_ICON, text: spot.cost },
    ],
  }));

  return (
    <>
      <Header active="regions" variant="solid" />

      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <Scene variant={content.heroScene} image={content.heroImage} className={styles.heroScene} />
          <div className={styles.heroGradient} />
          <div className={`${styles.breadcrumb} gutter`}>
            <Link href="/regions/bernese-oberland">Regions</Link>
            <Icon d="M9 5l7 7-7 7" size={14} strokeWidth={2} />
            <span className={styles.breadcrumbCurrent}>{content.name}</span>
          </div>
          <div className={styles.heroBody}>
            <div className={`eyebrow ${styles.heroEyebrow}`}>Canton of Bern · German-speaking</div>
            <h1 className={`serif ${styles.heroTitle}`}>{content.name}</h1>
            <p className={styles.heroLead}>{content.lead}</p>
            <div className={styles.keyfacts}>
              {content.keyfacts.map((fact) => (
                <div key={fact.l} className={styles.keyfact}>
                  <div className={`serif ${styles.keyfactValue}`}>{fact.v}</div>
                  <div className={styles.keyfactLabel}>{fact.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mini map */}
        <section className={styles.mapSection}>
          <div className="gutter">
          <div className={styles.mapHead}>
            <SectionHead
              eyebrow="The valley map"
              title="Nine places worth the ride"
              lead="Everything here is within ninety minutes of Interlaken. Filter by what you came for, then tap a pin."
              onDark
              leadAside
            />
          </div>
          <MapExplorer
            places={places}
            filters={content.spotFilters}
            legend={MAP_LEGEND}
            mapSvg={<RegionMapSvg data={content.mapSvg} />}
            initialIndex={3}
            placeNoun="places"
          />
          </div>
        </section>

        {/* Recommended landmarks */}
        <section className={`${styles.landmarks} gutter`}>
          <SectionHead
            eyebrow="If you only do three things"
            title="Recommended landmarks"
            lead="Ranked by what you get back for the cable-car fare, not by how famous they are. The top two are walkable from the valley if you have the legs."
            leadAside
          />
          {/* Ranking is editorial, explicitly not by fame (spec §4.2) — the CMS
           * needs a manual rank field on RegionPick, not a popularity sort. */}
          <div className={styles.pickGrid}>
            {content.picks.map((pick) => (
              <article key={pick.name} className={styles.pickCard}>
                <div className={styles.pickScene}>
                  <Scene variant={pick.scene} image={pick.image} className={styles.pickScene} />
                  <div className={styles.rankBadge}>{pick.rank}</div>
                </div>
                <div className={styles.pickBody}>
                  <div className={`eyebrow ${styles.pickKind}`}>{pick.kind}</div>
                  <h3 className={`serif ${styles.pickTitle}`}>{pick.name}</h3>
                  <p className={styles.pickText}>{pick.body}</p>
                  <div className={styles.pickFooter}>
                    <div className={styles.pickEffort}>
                      <Icon d={FLAG_ICON} size={16} color="var(--red)" />
                      {pick.effort}
                    </div>
                    <div className={styles.pickCost}>{pick.cost}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <hr className={styles.rule} />

        {/* Where to base yourself */}
        <section className={`${styles.baseSection} gutter`}>
          <div className={styles.baseGrid}>
            <div>
              <div className="eyebrow" style={{ color: "var(--red)" }}>
                Sleep here, not there
              </div>
              <h2 className="serif" style={{ margin: "12px 0 0", fontSize: 46, lineHeight: 1.04, fontWeight: 400 }}>
                Where to base yourself
              </h2>
              <p className={styles.baseIntroText}>
                Pick one base and day-trip from it. Moving hotels every night in this region costs
                more in cable-car fares and lost mornings than it saves.
              </p>
              <div className={styles.baseNote}>
                <div className={styles.baseNoteHead}>
                  <Icon d="M12 8v5M12 16v.01" size={17} />
                  Worth knowing
                </div>
                <p className={styles.baseNoteText}>
                  Guest cards from Oberland accommodation often include free local buses. Ask at
                  check-in — it is rarely offered.
                </p>
              </div>
            </div>

            <div className={styles.baseTable}>
              <div className={styles.baseHeadRow}>
                <div className={styles.baseHeadCell}>Base</div>
                <div className={styles.baseHeadCell}>Dorm from</div>
                <div className={styles.baseHeadCell}>To the trailheads</div>
                <div className={styles.baseHeadCell}>Evening</div>
                <div className={styles.baseHeadCell}>Best for</div>
              </div>
              {content.bases.map((base) => (
                <div key={base.name} className={styles.baseRow}>
                  <div className={styles.baseCellName}>
                    <div className={`serif ${styles.baseName}`}>{base.name}</div>
                    <div className={styles.baseAlt}>{base.alt}</div>
                  </div>
                  <div className={styles.baseField}>
                    <span className={styles.baseFieldLabel}>Dorm from</span>
                    <span className={styles.baseDorm}>{base.dorm}</span>
                  </div>
                  <div className={styles.baseField}>
                    <span className={styles.baseFieldLabel}>To the trailheads</span>
                    <span className={styles.baseCell}>{base.access}</span>
                  </div>
                  <div className={styles.baseField}>
                    <span className={styles.baseFieldLabel}>Evening</span>
                    <span className={styles.baseCell}>{base.evening}</span>
                  </div>
                  <div className={styles.baseField}>
                    <span className={styles.baseFieldLabel}>Best for</span>
                    <span className={styles.baseCell}>{base.who}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Three days from one bed */}
        <section className={styles.daysSection}>
          <div className="gutter">
          <div className={styles.daysHead}>
            <div>
              <div className="eyebrow" style={{ color: "var(--red)" }}>
                A route that works
              </div>
              <h2 className="serif" style={{ margin: "12px 0 0", fontSize: 50, lineHeight: 1.04, fontWeight: 400 }}>
                Three days from one bed
              </h2>
            </div>
            <button type="button" className={`${buttons.btn} ${buttons.ink}`}>
              <Icon d="M12 3v12M8 11l4 4 4-4M4 19h16" size={18} />
              Save this route
            </button>
          </div>
          <div className={styles.daysGrid}>
            {content.days.map((day) => (
              <article key={day.n} className={styles.dayCard}>
                <div className={styles.dayHeadRow}>
                  <div className={`serif ${styles.dayNumber}`}>{day.n}</div>
                  <div className={`eyebrow ${styles.dayTag}`}>{day.tag}</div>
                </div>
                <h3 className={`serif ${styles.dayTitle}`}>{day.title}</h3>
                <div className={styles.steps}>
                  {day.steps.map((step) => (
                    <div key={step.t} className={styles.step}>
                      <div className={styles.stepTime}>{step.t}</div>
                      <div className={styles.stepText}>{step.d}</div>
                    </div>
                  ))}
                </div>
                <div className={styles.dayFares}>
                  <Icon d={WALLET_ICON} size={16} color="var(--red)" />
                  {day.cost}
                </div>
              </article>
            ))}
          </div>
          </div>
        </section>

        <CrossLinks
          items={[
            {
              icon: RAIL_ICON,
              title: "Rail passes for the Oberland",
              body: "Compare point-to-point fares against the regional pass",
              href: "/rail-passes",
            },
            {
              icon: BED_ICON,
              title: "Hostels in this region",
              body: "Beds in Lauterbrunnen, Interlaken, Grindelwald and Mürren",
              href: "/hostels",
            },
            {
              icon: SEARCH_ICON,
              title: "Find a trip",
              body: "Filter every region by month, budget and how long you have",
              href: "/find-a-trip",
            },
          ]}
        />
      </main>

      <Footer
        variant="slim"
        note="Fares and dorm rates are sample figures for layout — replace with live data before launch."
      />
    </>
  );
}
