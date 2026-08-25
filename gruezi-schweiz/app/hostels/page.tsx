// Hostels page (spec §4.4). The allocator carries all interactive state — see
// spec §5.4, "the most complex logic on the site" — so everything from the
// control card down through the cross-links lives in one client island
// (Allocator.tsx). This file is the static shell: header, hero, footer.
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Scene } from "@/components/Scene";
import { Allocator } from "./Allocator";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hostels",
  description:
    "Price beds for your real group size, not a headline dorm rate. Works out the cheapest room mix at each hostel for the way you want to sleep.",
};

const RATES_NOTE =
  "Sample nightly rates for layout. Real prices move with the season and fill up months ahead in July and August.";

export default function HostelsPage() {
  return (
    <>
      <Header active="hostels" />

      {/* Hero — 400px, 62px headline (spec §4.4 / artboard L131-145). */}
      <section className={styles.hero}>
        <Scene variant="sky-gold t-golden" className={styles.heroScene} />
        <div className={styles.heroGradient} />
        <div className={`${styles.heroContent} gutter`}>
          <div className="eyebrow" style={{ color: "#F1DED4" }}>Hostels</div>
          <h1 className={`serif ${styles.heroTitle}`}>
            Beds, split the way your group actually sleeps
          </h1>
          <p className={styles.heroLead}>
            Tell it how many of you there are and how much privacy you want. It works out the
            cheapest room mix at each hostel, not just the headline dorm rate.
          </p>
        </div>
      </section>

      <Allocator />

      <Footer variant="slim" note={RATES_NOTE} />
    </>
  );
}
