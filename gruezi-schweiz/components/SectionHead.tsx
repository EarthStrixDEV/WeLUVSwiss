import type { ReactNode } from "react";
import styles from "./SectionHead.module.css";

/**
 * Section heading block: eyebrow + serif h2 + optional side/lead paragraph.
 * Eyebrows are red on light backgrounds and --on-dark-accent on dark ones —
 * red is illegible on dark (spec §2.1).
 */
export function SectionHead({
  eyebrow,
  title,
  lead,
  onDark = false,
  leadAside = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  onDark?: boolean;
  /** Render the lead as a right-aligned aside beside the title (desktop). */
  leadAside?: boolean;
}) {
  return (
    <div className={`${styles.head} ${leadAside ? styles.aside : ""} ${onDark ? styles.onDark : ""}`}>
      <div>
        <div className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</div>
        <h2 className={`serif ${styles.title}`}>{title}</h2>
      </div>
      {lead && <p className={styles.lead}>{lead}</p>}
    </div>
  );
}
