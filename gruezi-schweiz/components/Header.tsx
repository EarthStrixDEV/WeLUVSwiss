import Link from "next/link";
import { FlagMark } from "./FlagMark";
import { Icon } from "./Icon";
import buttons from "./buttons.module.css";
import styles from "./Header.module.css";

export type NavKey = "regions" | "rail-passes" | "hostels" | "find-a-trip";

const NAV: { key: NavKey; label: string; href: string; icon: string }[] = [
  { key: "regions", label: "Regions", href: "/regions/bernese-oberland", icon: "M3 20l6-13 4 8 3-5 5 10z" },
  { key: "rail-passes", label: "Rail Passes", href: "/rail-passes", icon: "M4 4h16v12H4zM4 10h16M8 20l2-3M16 20l-2-3" },
  { key: "hostels", label: "Hostels", href: "/hostels", icon: "M6 21V9l6-5 6 5v12M10 21v-6h4v6" },
  { key: "find-a-trip", label: "Find a Trip", href: "/find-a-trip", icon: "M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4.3-4.3" },
];

/**
 * Shared page header. `variant="floating"` overlays a hero scene (landing);
 * `variant="solid"` is the inner pages' ink bar. Below 760px the nav links
 * hide — the bottom tab bar is the navigation there (spec §4.1 mobile).
 */
export function Header({
  active,
  variant = "solid",
}: {
  active?: NavKey;
  variant?: "solid" | "floating";
}) {
  return (
    <header className={variant === "floating" ? styles.floating : styles.solid}>
      <div className={`${styles.inner} gutter`}>
      <Link href="/" className={styles.brand}>
        <FlagMark size={variant === "floating" ? 34 : 30} />
        <span className={`serif ${styles.wordmark}`}>Grüezi Schweiz</span>
      </Link>
      <nav className={styles.nav} aria-label="Main">
        {NAV.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`${styles.navItem} ${active === item.key ? styles.navOn : ""}`}
            aria-current={active === item.key ? "page" : undefined}
          >
            <Icon d={item.icon} size={17} strokeWidth={1.6} />
            {item.label}
          </Link>
        ))}
        <Link href="/find-a-trip" className={`${buttons.btn} ${buttons.red} ${buttons.compact}`}>
          <Icon
            d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 7.6a2.4 2.4 0 100 4.8 2.4 2.4 0 000-4.8"
            size={17}
          />
          Plan My Route
        </Link>
      </nav>
      </div>
    </header>
  );
}
