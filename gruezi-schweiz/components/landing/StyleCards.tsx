import { STYLE_CARDS } from "@/lib/data/landing";
import { Card3D } from "./Card3D";
import styles from "./StyleCards.module.css";

/** "Pick your altitude" section (spec §4.1 §3): three 3D cards in a 3-col
 *  grid on desktop; a horizontally scrolling row on mobile (same cards, the
 *  Card3D CSS collapses the transform below 760px). */
export function StyleCards() {
  return (
    <section className={`${styles.section} gutter`}>
      <div className={styles.head}>
        <div>
          <div className={`eyebrow ${styles.eyebrow}`}>Three ways to travel</div>
          <h2 className={`serif ${styles.title}`}>Pick your altitude</h2>
        </div>
        <p className={styles.lead}>
          Every trip here is really one of three trips. Choose the one that matches your legs,
          your budget and how many hours a day you want to be moving.
        </p>
      </div>

      <div className={styles.grid}>
        {STYLE_CARDS.map((card) => (
          <Card3D key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}
