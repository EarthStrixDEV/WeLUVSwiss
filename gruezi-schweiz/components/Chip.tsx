import { Icon } from "./Icon";
import styles from "./Chip.module.css";

/**
 * Filter/selection chip (spec §2.5): 46px, 999px radius, icon + label.
 * Active state is a red fill. Filter chips carry aria-pressed and, where the
 * design shows one, a match count (spec §5.2 / §6).
 */
export function Chip({
  label,
  icon,
  count,
  pressed,
  onDark = false,
  compact = false,
  onClick,
}: {
  label: string;
  icon?: string;
  count?: number;
  pressed?: boolean;
  onDark?: boolean;
  compact?: boolean;
  onClick?: () => void;
}) {
  const classes = [
    styles.chip,
    onDark && styles.onDark,
    compact && styles.compact,
    pressed && styles.pressed,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={classes} aria-pressed={pressed} onClick={onClick}>
      {icon && <Icon d={icon} size={compact ? 16 : 18} />}
      {label}
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </button>
  );
}
