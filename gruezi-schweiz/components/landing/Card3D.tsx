import { Icon } from "@/components/Icon";
import { Scene } from "@/components/Scene";
import type { StyleCard } from "@/lib/data/landing";
import styles from "./Card3D.module.css";

/**
 * One 3D travel-style card (spec §2.4 / §4.1 §3). CSS-only — no client JS
 * needed, hover is a pure CSS transform. CRITICAL: `.inner` carries
 * `transform-style: preserve-3d` and must NOT also carry `overflow: hidden`
 * (that flattens the transform) — clipping lives on the `.clip` child instead.
 */
export function Card3D({ card }: { card: StyleCard }) {
  return (
    <div className={styles.card3d}>
      <div className={styles.inner}>
        <div className={styles.clip}>
          <Scene variant={card.scene} image={card.image} className={styles.scene} />
          <div className={styles.gradient} />
        </div>
        <div className={`${styles.lift} ${styles.badge}`}>{card.tag}</div>
        <div className={`${styles.lift} ${styles.body}`}>
          <h3 className={`serif ${styles.title}`}>{card.title}</h3>
          <p className={styles.text}>{card.body}</p>
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <svg
                viewBox="0 0 24 24"
                width={17}
                height={17}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              {card.days}
            </div>
            <div className={styles.metaItem}>
              <Icon d="M4 7h16v11H4zM4 11h16M8 14.5h.01" size={17} strokeWidth={1.7} />
              {card.cost}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
