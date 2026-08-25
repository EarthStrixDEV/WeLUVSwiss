import styles from "./FlagMark.module.css";

/** The Swiss-cross brand mark — a red square with a white cross drawn in CSS. */
export function FlagMark({ size = 30 }: { size?: number }) {
  return (
    <div className={styles.flag} style={{ width: size, height: size }} aria-hidden="true">
      <i className={styles.v} />
      <i className={styles.h} />
    </div>
  );
}
