"use client";

// Search hero + filter panel + results island (spec §4.5, §5.6). One piece of
// state (season/length/budget/style) drives the filter chips, the results
// header copy and the card grid — kept together because they all read and
// write the same four values.

import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Scene } from "@/components/Scene";
import { Icon } from "@/components/Icon";
import { Chip } from "@/components/Chip";
import buttons from "@/components/buttons.module.css";
import { TRIPS, TRIP_FILTER_GROUPS, tripMatches, type TripFilterKey } from "@/lib/data/trips";
import styles from "./page.module.css";

const DEFAULT_FILTERS: Record<TripFilterKey, string> = {
  season: "any",
  length: "any",
  budget: "any",
  style: "any",
};

export function TripFinder() {
  const [filters, setFilters] = useState<Record<TripFilterKey, string>>(DEFAULT_FILTERS);

  const results = useMemo(() => TRIPS.filter((t) => tripMatches(t, filters)), [filters]);

  const appliedCount = (Object.keys(filters) as TripFilterKey[]).filter(
    (k) => filters[k] !== "any"
  ).length;

  const summary =
    appliedCount > 0
      ? `${appliedCount} filter${appliedCount > 1 ? "s" : ""} applied`
      : "Everything we cover";

  const headline =
    results.length > 0
      ? `${results.length} ${results.length === 1 ? "trip fits" : "trips fit"}`
      : "No trips fit";

  function reset() {
    setFilters(DEFAULT_FILTERS);
  }

  return (
    <>
      {/* Search hero — 800px, full-bleed scene (spec §4.5). */}
      <section className={styles.hero}>
        <Scene variant="sky-dawn t-glacier" image="/images/trips/hero.png" className={styles.heroScene} />
        <div className={styles.heroGradient} />

        <Header variant="floating" active="find-a-trip" />

        <div className={`${styles.heroContent} gutter`}>
          <div className="eyebrow" style={{ color: "#F1DED4" }}>Find a trip</div>
          <h1 className={`serif ${styles.heroTitle}`}>
            Start with a month and a budget.
            <br />
            We will find the valley.
          </h1>

          {/* Search box — presentational in v1, does not wire to results (spec §1). */}
          <form className={styles.searchBox} onSubmit={(e) => e.preventDefault()}>
            <Icon
              d="M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4.3-4.3"
              size={26}
              strokeWidth={1.7}
              color="var(--red)"
              className={styles.searchIcon}
            />
            <label htmlFor="trip-search" className="sr-only">
              Search trips
            </label>
            <input
              id="trip-search"
              type="text"
              placeholder="A place, a peak, or “somewhere quiet with good trains”"
              className={styles.searchInput}
            />
            <button type="submit" className={`${buttons.btn} ${buttons.red} ${styles.searchButton}`}>
              <Icon d="M5 12h14M13 6l6 6-6 6" size={19} strokeWidth={1.8} />
              Search trips
            </button>
          </form>

          {/* Filter panel — four labelled rows of compact chips. */}
          <div className={styles.filterPanel}>
            {TRIP_FILTER_GROUPS.map((group) => (
              <div key={group.key} className={styles.filterRow}>
                <div className={styles.filterLabel}>
                  <Icon d={group.icon} size={17} strokeWidth={1.7} color="var(--on-dark-accent)" />
                  {group.label}
                </div>
                <div className={styles.filterChips} role="group" aria-label={group.label}>
                  {group.opts.map(([value, label]) => (
                    <Chip
                      key={value}
                      label={label}
                      compact
                      onDark
                      pressed={filters[group.key] === value}
                      onClick={() => setFilters((f) => ({ ...f, [group.key]: value }))}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results (spec §4.5, §5.6). */}
      <section className={`${styles.results} gutter`}>
        <div className={styles.resultsHead}>
          <div>
            <div className="eyebrow" style={{ color: "var(--red)" }}>{summary}</div>
            <h2 className={`serif ${styles.resultsTitle}`}>{headline}</h2>
          </div>
          <Chip
            label="Clear filters"
            icon="M4 4v6h6M20 20v-6h-6M20 9A8 8 0 006 5.3M4 15a8 8 0 0014 3.7"
            onClick={reset}
          />
        </div>

        <p className="sr-only" aria-live="polite">
          {results.length} trip{results.length === 1 ? "" : "s"} match
        </p>

        {results.length > 0 ? (
          <div className={styles.grid}>
            {results.map((trip) => (
              <div key={trip.name} className={styles.card}>
                <div className={styles.cardScene}>
                  <Scene variant={trip.scene} image={trip.image} className={styles.cardSceneInner} />
                  <div className={styles.cardSceneGradient} />
                  <div className={styles.cardRegion}>{trip.region}</div>
                  <div className={styles.cardDays}>{trip.days}</div>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={`serif ${styles.cardTitle}`}>{trip.name}</h3>
                  <p className={styles.cardText}>{trip.body}</p>
                  <div className={styles.cardTags}>
                    {trip.tags.map((tag) => (
                      <span key={tag} className={styles.cardTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className={styles.cardFooter}>
                    <div className={styles.cardFrom}>From</div>
                    <div className={styles.cardPriceRow}>
                      <div className={`serif ${styles.cardPrice}`}>{trip.price}</div>
                      <div className={styles.cardPriceCaption}>a day*</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state (spec §4.5) — reachable, e.g. winter + long + high budget. */
          <div className={styles.empty}>
            <Icon
              d="M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4.3-4.3M9 11h4"
              size={34}
              strokeWidth={1.4}
              color="var(--red)"
            />
            <div className={`serif ${styles.emptyTitle}`}>Nothing matches all four filters</div>
            <p className={styles.emptyText}>
              The tightest constraint is usually the season. Loosen that one first — most of these
              valleys are worth a different month rather than a different country.
            </p>
            <button type="button" className={`${buttons.btn} ${buttons.red} ${styles.emptyButton}`} onClick={reset}>
              Clear the filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
