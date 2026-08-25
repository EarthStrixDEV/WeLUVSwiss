import styles from "./Scene.module.css";

/**
 * Alpine editorial photography with a subtle tonal treatment. `variant` keeps
 * the original sky × tone API so existing page compositions retain their mood.
 *
 * Decorative only — always aria-hidden. Captions and overlays belong outside.
 */
export function Scene({ variant, className, image }: { variant: string; className?: string; image?: string }) {
  const classes = [
    styles.scene,
    ...variant.split(" ").map((c) => styles[c]),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      aria-hidden="true"
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <i className={styles.vg} />
    </div>
  );
}
