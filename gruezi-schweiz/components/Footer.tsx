import Link from "next/link";
import { FlagMark } from "./FlagMark";
import styles from "./Footer.module.css";

/**
 * Shared footer. `variant="full"` is the landing footer with link columns;
 * `variant="slim"` is the inner pages' two-line bar. `note` carries the page's
 * data-provenance disclaimer (spec §3.4 — every page keeps one; add a
 * "checked on" date once real data lands).
 *
 * [YEAR] / [YOUR EMAIL] / [YOUR INSTAGRAM] are deliberate placeholders tracked
 * by the Definition of Done (spec §9) — fill, don't remove.
 */
export function Footer({
  variant = "slim",
  note = "Photography placeholders drawn in CSS — swap for licensed images before launch.",
}: {
  variant?: "full" | "slim";
  note?: string;
}) {
  if (variant === "slim") {
    return (
      <footer className={`${styles.footer} ${styles.slim}`}>
        <div className="gutter">
          <div className={styles.bottomBar}>
            <div>© [YEAR] Grüezi Schweiz</div>
            <div>{note}</div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className="gutter">
      <div className={styles.top}>
        <div className={styles.brandBlock}>
          <div className={styles.brandRow}>
            <FlagMark size={30} />
            <span className={`serif ${styles.wordmark}`}>Grüezi Schweiz</span>
          </div>
          <p className={styles.blurb}>
            An independent guide for backpackers and slow travellers. Not affiliated with any
            tourist board or transport operator.
          </p>
        </div>
        <div className={styles.cols}>
          <div className={styles.col}>
            <div className={styles.colHead}>Plan</div>
            <Link href="/rail-passes">Rail passes</Link>
            <Link href="/hostels">Hostels &amp; huts</Link>
            <Link href="/find-a-trip">Season by season</Link>
          </div>
          <div className={styles.col}>
            <div className={styles.colHead}>Regions</div>
            <Link href="/regions/bernese-oberland">Bernese Oberland</Link>
            {/* Valais and Graubünden are content, not code (spec §1) — no pages yet. */}
            <span>Valais</span>
            <span>Graubünden</span>
          </div>
          <div className={styles.col}>
            <div className={styles.colHead}>Contact</div>
            <span>[YOUR EMAIL]</span>
            <span>[YOUR INSTAGRAM]</span>
            <span>Submit a route</span>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div>© [YEAR] Grüezi Schweiz</div>
        <div>{note}</div>
      </div>
      </div>
    </footer>
  );
}
