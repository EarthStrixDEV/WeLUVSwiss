"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";
import styles from "./BottomTabBar.module.css";

const TABS = [
  { label: "Home", href: "/", icon: "M3 20l6-13 4 8 3-5 5 10z" },
  {
    label: "Regions",
    href: "/regions/bernese-oberland",
    icon: "M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 7.6a2.4 2.4 0 100 4.8 2.4 2.4 0 000-4.8",
  },
  { label: "Rail", href: "/rail-passes", icon: "M4 4h16v12H4zM4 10h16M8 20l2-3M16 20l-2-3" },
  { label: "Hostels", href: "/hostels", icon: "M6 21V9l6-5 6 5v12M10 21v-6h4v6" },
  { label: "Trips", href: "/find-a-trip", icon: "M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4.3-4.3" },
];

/** Five-item mobile tab bar (spec §4.1 mobile) — visible below 760px on every
 *  route, where it replaces the header nav. */
export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className={styles.bar} aria-label="Main">
      {TABS.map((tab) => {
        const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`${styles.tab} ${active ? styles.active : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon d={tab.icon} size={20} strokeWidth={1.6} />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
