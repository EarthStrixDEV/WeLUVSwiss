import { Scene } from "@/components/Scene";
import { Icon } from "@/components/Icon";
import { GALLERY } from "@/lib/data/landing";
import styles from "./Gallery.module.css";

/** Photo wall (spec §4.1 §5): 4-col grid, `grid-auto-rows: 236px`, nine tiles
 *  span-placed by colSpan/rowSpan. Below 760px: 2-col grid of only the six
 *  `mobile: true` tiles, spans normalised to 1×1 (spec §4.1 mobile). */
export function Gallery() {
  return (
    <section className={`${styles.section} gutter`}>
      <div className={styles.head}>
        <div>
          <div className={`eyebrow ${styles.eyebrow}`}>The photo wall</div>
          <h2 className={`serif ${styles.title}`}>Nine frames from the trail</h2>
        </div>
        <div className={styles.openLink}>
          <Icon d="M3 5h18v14H3zM8.5 8.4a1.6 1.6 0 100 3.2 1.6 1.6 0 000-3.2zM21 16l-5-5-6 8" size={18} strokeWidth={1.7} />
          Open full gallery
        </div>
      </div>

      <div className={styles.grid}>
        {GALLERY.map((tile) => (
          <div
            key={tile.name}
            className={`${styles.tile} ${tile.mobile ? styles.mobileTile : ""}`}
            style={{ gridColumn: `span ${tile.colSpan}`, gridRow: `span ${tile.rowSpan}` }}
          >
            <Scene variant={tile.scene} image={tile.image} className={styles.scene} />
            <div className={styles.gradient} />
            <div className={styles.caption}>
              <div className={styles.name}>{tile.name}</div>
              <div className={styles.canton}>{tile.canton}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
