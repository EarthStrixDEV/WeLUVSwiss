"use client";

import { Icon } from "./Icon";
import styles from "./Stepper.module.css";

/**
 * Count stepper (spec §2.5 / §6): a pair of 44px circular buttons around a
 * serif value. Buttons, not a spinner — with a group label naming what it
 * counts. Controls disable at the bounds (spec §5.5 acceptance).
 */
export function Stepper({
  label,
  noun,
  value,
  min,
  max,
  onChange,
}: {
  /** Accessible name for the whole control, e.g. "Days you will be moving". */
  label: string;
  /** Singular noun for the +/- buttons, e.g. "day" → "Fewer days". */
  noun: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className={styles.stepper} role="group" aria-label={label}>
      <button
        type="button"
        className={styles.step}
        aria-label={`Fewer ${noun}s`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Icon d="M5 12h14" size={18} strokeWidth={2} />
      </button>
      <div className={`serif ${styles.value}`} aria-live="polite">
        {value}
      </div>
      <button
        type="button"
        className={styles.step}
        aria-label={`More ${noun}s`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Icon d="M12 5v14M5 12h14" size={18} strokeWidth={2} />
      </button>
    </div>
  );
}
