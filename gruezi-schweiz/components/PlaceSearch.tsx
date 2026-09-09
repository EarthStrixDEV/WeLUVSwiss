"use client";

// Global "Find a place" search overlay (ticket 03, UI half). Presentational +
// interaction shell only — no lookupPlace call and no navigation live here.
// The integration layer (ticket 03's other half) drives this via the
// `query` / `onQueryChange` / `results` / `status` / `onSelect` props below.

import { useEffect, useRef } from "react";
import { Icon } from "./Icon";
import type { Place } from "@/lib/places/lookup";
import styles from "./PlaceSearch.module.css";

const SEARCH_ICON_D = "M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4.3-4.3";
const CLOSE_ICON_D = "M6 6l12 12M18 6L6 18";

export type PlaceSearchStatus = "idle" | "loading" | "ok" | "empty" | "unavailable";

export function PlaceSearch({
  open,
  query,
  results,
  status,
  onQueryChange,
  onSelect,
  onClose,
}: {
  /** Whether the overlay is open. Mounting/unmounting is the caller's call. */
  open: boolean;
  /** Current input value — controlled by the caller. */
  query: string;
  /** Matching places for the current query, already region-filtered upstream. */
  results: Place[];
  /** Drives which presentational state the results area shows. */
  status: PlaceSearchStatus;
  /** Fired on every input change; the caller owns debouncing the lookup. */
  onQueryChange: (query: string) => void;
  /** Fired when a result row is chosen; the caller owns navigation/pin-select. */
  onSelect: (place: Place) => void;
  /** Fired on X click, backdrop click, or Escape. */
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus the input whenever the overlay opens.
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  // Escape closes; click outside the dialog panel closes.
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    function handlePointerDown(e: PointerEvent) {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.backdrop}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="place-search-title"
      >
        <div className={styles.header}>
          <div className={styles.headerLabel}>
            <Icon d={SEARCH_ICON_D} size={20} strokeWidth={1.7} color="var(--red)" />
            <h2 id="place-search-title" className={`serif ${styles.title}`}>
              Find a place
            </h2>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close search">
            <Icon d={CLOSE_ICON_D} size={18} strokeWidth={1.8} />
          </button>
        </div>

        <label htmlFor="place-search-input" className="sr-only">
          Search for a place in the Bernese Oberland
        </label>
        <div className={styles.inputRow}>
          <Icon d={SEARCH_ICON_D} size={18} strokeWidth={1.7} className={styles.inputIcon} />
          <input
            ref={inputRef}
            id="place-search-input"
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Try “Mürren” or “Interlaken”"
            className={styles.input}
            autoComplete="off"
          />
        </div>

        <div className={styles.results} aria-live="polite">
          {status === "idle" && (
            <p className={styles.hint}>Start typing to search places in the Bernese Oberland.</p>
          )}

          {status === "loading" && <p className={styles.hint}>Searching…</p>}

          {status === "unavailable" && (
            <div className={styles.state}>
              <Icon d="M12 9v4M12 17h.01M12 3l9 16H3z" size={26} strokeWidth={1.5} color="var(--red)" />
              <p className={styles.stateTitle}>Search is unavailable right now</p>
              <p className={styles.stateText}>
                We couldn&apos;t reach either place lookup source. Please try again in a moment.
              </p>
            </div>
          )}

          {status === "empty" && (
            <div className={styles.state}>
              <Icon d={SEARCH_ICON_D} size={26} strokeWidth={1.5} color="var(--faint-readable)" />
              <p className={styles.stateTitle}>No places found</p>
              <p className={styles.stateText}>
                Nothing in the Bernese Oberland matches &ldquo;{query}&rdquo;. Try a different spelling.
              </p>
            </div>
          )}

          {status === "ok" && results.length > 0 && (
            <ul className={styles.list}>
              {results.map((place) => (
                <li key={`${place.name}-${place.lat}-${place.lng}`}>
                  <button type="button" className={styles.resultRow} onClick={() => onSelect(place)}>
                    <Icon
                      d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 7.6a2.4 2.4 0 100 4.8 2.4 2.4 0 000-4.8"
                      size={17}
                      strokeWidth={1.6}
                      color="var(--red)"
                    />
                    {place.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
