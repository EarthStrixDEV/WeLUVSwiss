"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FlagMark } from "./FlagMark";
import { Icon } from "./Icon";
import { PlaceSearch } from "./PlaceSearch";
import { usePlaceSearch } from "@/lib/places/usePlaceSearch";
import type { Place } from "@/lib/places/lookup";
import buttons from "./buttons.module.css";
import styles from "./Header.module.css";

export type NavKey = "regions" | "rail-passes" | "hostels" | "find-a-trip";

const NAV: { key: NavKey; label: string; href: string; icon: string }[] = [
  { key: "regions", label: "Regions", href: "/regions/bernese-oberland", icon: "M3 20l6-13 4 8 3-5 5 10z" },
  { key: "rail-passes", label: "Rail Passes", href: "/rail-passes", icon: "M4 4h16v12H4zM4 10h16M8 20l2-3M16 20l-2-3" },
  { key: "hostels", label: "Hostels", href: "/hostels", icon: "M6 21V9l6-5 6 5v12M10 21v-6h4v6" },
  { key: "find-a-trip", label: "Find a Trip", href: "/find-a-trip", icon: "M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4.3-4.3" },
];

const SEARCH_ICON_D = "M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4.3-4.3";

/**
 * Shared page header. `variant="floating"` overlays a hero scene (landing);
 * `variant="solid"` is the inner pages' ink bar. Below 760px the nav links
 * hide — the bottom tab bar is the navigation there (spec §4.1 mobile).
 *
 * The magnifying-glass button (both variants) sits in `.inner` next to the
 * brand mark rather than inside `.nav`, so it stays reachable below 760px
 * where `.nav` is display:none — this is the mobile entry point for Place
 * Search (CONTEXT.md "Place Search"; ticket 03) without adding a 6th tab to
 * BottomTabBar. Query state and the lookup/navigation wiring live here via
 * `usePlaceSearch` (see PlaceSearch props) to keep this component focused on
 * layout/markup.
 */
export function Header({
  active,
  variant = "solid",
}: {
  active?: NavKey;
  variant?: "solid" | "floating";
}) {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const { query, setQuery, results, status, reset } = usePlaceSearch();

  function closeSearch() {
    setSearchOpen(false);
    reset();
  }

  function handleSelect(place: Place) {
    // Bernese Oberland is the only region in v1 (CONTEXT.md "Place Search"),
    // so the destination is fixed — only which pin to pre-select varies.
    // `initialIndex` on the region page's MapExplorer is read once on mount
    // (see MapExplorer.tsx), so the selected place has to reach it before
    // first render rather than imperatively after navigation — a URL search
    // param the region page resolves server-side into an index is the
    // simplest way to do that in the App Router (see app/regions/[region]/page.tsx).
    const params = new URLSearchParams({ place: place.name });
    router.push(`/regions/bernese-oberland?${params.toString()}`);
    closeSearch();
  }

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
      <button
        type="button"
        className={styles.searchButton}
        onClick={() => setSearchOpen(true)}
        aria-label="Find a place"
      >
        <Icon d={SEARCH_ICON_D} size={19} strokeWidth={1.7} />
      </button>
      </div>

      <PlaceSearch
        open={searchOpen}
        query={query}
        results={results}
        status={status}
        onQueryChange={setQuery}
        onSelect={handleSelect}
        onClose={closeSearch}
      />
    </header>
  );
}
