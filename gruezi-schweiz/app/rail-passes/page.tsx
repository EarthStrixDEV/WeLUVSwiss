// Rail Passes page (spec §4.3). Everything except the comparator is static
// server-rendered markup — the comparator is the only client island.
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Scene } from "@/components/Scene";
import { SectionHead } from "@/components/SectionHead";
import { CrossLinks } from "@/components/CrossLinks";
import { Icon } from "@/components/Icon";
import { PASS_CARDS, PASS_REGIONS } from "@/lib/data/rail";
import { Comparator } from "./Comparator";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Rail Passes",
  description:
    "Work out which way of paying for Swiss trains is cheapest for your route and your number of moving days.",
};

const FARES_NOTE =
  "Fares and pass prices are sample figures for layout — replace with live SBB data before launch.";

export default function RailPassesPage() {
  return (
    <>
      <Header active="rail-passes" />

      {/* Hero — 420px, left-weighted gradient (spec §4.3 / artboard L132-146). */}
      <section className={styles.hero}>
        <Scene variant="sky-dusk t-slate" image="/images/rail/hero.png" className={styles.heroScene} />
        <div className={styles.heroGradient} />
        <div className={`${styles.heroContent} gutter`}>
          <div className="eyebrow" style={{ color: "#F1DED4" }}>Rail passes</div>
          <h1 className={`serif ${styles.heroTitle}`}>
            The right pass is the one that matches your moving days
          </h1>
          <p className={styles.heroLead}>
            Nobody needs every pass. Put in the journey you actually plan to make and how many
            days you will be on the move, and the comparison below picks the cheapest way to buy it.
          </p>
        </div>
      </section>

      {/* Price comparison — the core of the page (spec §5.5). */}
      <section className={`${styles.comparisonSection} gutter`}>
        <SectionHead
          eyebrow="Station to station"
          title="Price comparison"
          lead="Pick the leg you make most often. Everything below recalculates against it — including whether a pass is worth buying at all."
          leadAside
        />
        <Comparator />
      </section>

      <hr className={styles.rule} />

      {/* Pass cards. */}
      <section className={`${styles.section} gutter`}>
        <SectionHead eyebrow="What each one actually is" title="Four ways to pay for trains" />
        <div className={styles.passGrid}>
          {PASS_CARDS.map((p) => (
            <div key={p.name} className={styles.passCard}>
              <Icon d={p.icon} size={24} strokeWidth={1.6} color="var(--red)" />
              <div>
                <h3 className={`serif ${styles.passName}`}>{p.name}</h3>
                <div className={styles.passPrice}>{p.price}</div>
              </div>
              <p className={styles.passBody}>{p.body}</p>
              <div className={styles.passWho}>
                <Icon d="M5 12.5l4.5 4.5L19 7" size={16} strokeWidth={1.8} color="var(--red)" />
                {p.who}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Passes by region. */}
      <section className={styles.regionSection}>
        <div className="gutter">
        <SectionHead
          eyebrow="Where it takes you"
          title="Passes by region"
          lead="A regional pass beats a national one if you are staying put. These are the four regions where that is usually true."
          leadAside
        />
        <div className={styles.regionGrid}>
          {PASS_REGIONS.map((r) =>
            r.slug ? (
              <Link key={r.name} href={`/regions/${r.slug}`} className={styles.regionCard}>
                <Scene variant={r.scene} image={r.image} className={styles.regionScene} />
                <div className={styles.regionBody}>
                  <h3 className={`serif ${styles.regionName}`}>{r.name}</h3>
                  <div className={styles.regionText}>{r.body}</div>
                  <div className={styles.regionLink}>
                    <Icon d="M5 12h14M13 6l6 6-6 6" size={16} strokeWidth={1.8} />
                    Open the region
                  </div>
                </div>
              </Link>
            ) : (
              <div key={r.name} className={`${styles.regionCard} ${styles.regionCardStatic}`}>
                <Scene variant={r.scene} image={r.image} className={styles.regionScene} />
                <div className={styles.regionBody}>
                  <h3 className={`serif ${styles.regionName}`}>{r.name}</h3>
                  <div className={styles.regionText}>{r.body}</div>
                </div>
              </div>
            )
          )}
        </div>
        </div>
      </section>

      <CrossLinks
        items={[
          {
            icon: "M6 21V9l6-5 6 5v12M10 21v-6h4v6",
            title: "Hostels along this route",
            body: "Beds priced per person, allocated for your group size",
            href: "/hostels",
          },
          {
            icon: "M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4.3-4.3",
            title: "Find a trip",
            body: "Start from a month and a budget instead of a station",
            href: "/find-a-trip",
          },
        ]}
      />

      <Footer variant="slim" note={FARES_NOTE} />
    </>
  );
}
