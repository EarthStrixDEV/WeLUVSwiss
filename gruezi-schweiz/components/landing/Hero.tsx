import { Header } from "@/components/Header";
import { Scene } from "@/components/Scene";
import { Icon } from "@/components/Icon";
import buttons from "@/components/buttons.module.css";
import { HERO_STATS } from "@/lib/data/landing";
import styles from "./Hero.module.css";

/** Hero banner (spec §4.1 §1): full-bleed scene, floating header, 96px serif
 *  headline over a 560px lead, two CTAs, and a stat strip pinned to the bottom
 *  edge with a translucent dark backdrop-blur. The strip is full-bleed (each
 *  cell carries its own gutter-matching padding), not wrapped in `.gutter`. */
export function Hero() {
  return (
    <section className={styles.hero}>
      <Scene variant="sky-dawn t-alpine" image="/images/home/hero.png" className={styles.scene} />
      <div className={styles.overlay} />

      <Header variant="floating" />

      <div className={`${styles.copy} gutter`}>
        <div className={`eyebrow ${styles.eyebrow}`}>
          A backpacker&#39;s guide to the Alps · 26 cantons · 4 languages
        </div>
        <h1 className={`serif ${styles.title}`}>
          The mountains
          <br />
          are three hours
          <br />
          from <em className={styles.accent}>everywhere</em>.
        </h1>
        <p className={styles.lead}>
          Switzerland is small enough to cross before lunch and dense enough to spend a season
          in. This guide covers the routes, the passes, the hostels and the corner-shop chocolate
          that make it affordable on a backpack budget.
        </p>
        <div className={styles.ctas}>
          <a href="#" className={`${buttons.btn} ${buttons.red}`}>
            <Icon d="M3 20l6-13 4 8 3-5 5 10z" size={19} strokeWidth={1.7} />
            Start with the routes
          </a>
          <a href="#" className={`${buttons.btn} ${buttons.ghost}`}>
            <Icon d="M3 5h18v14H3zM3 9h18M8 3v4M16 3v4" size={19} strokeWidth={1.7} />
            Best months to go
          </a>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statsInner}>
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <div className={`serif ${styles.statValue}`}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
