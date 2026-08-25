import Link from "next/link";
import { Icon } from "./Icon";
import styles from "./CrossLinks.module.css";

export interface CrossLinkItem {
  icon: string;
  title: string;
  body: string;
  href: string;
}

/** Row of .xlink cross-page cards ending each page (spec §4). */
export function CrossLinks({ eyebrow = "Next", items }: { eyebrow?: string; items: CrossLinkItem[] }) {
  return (
    <section className={`${styles.section} gutter`}>
      <div className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</div>
      <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((item) => (
          <Link key={item.title} href={item.href} className={styles.xlink}>
            <Icon d={item.icon} size={22} className={styles.icon} />
            <span>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.body}>{item.body}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
