// Icon rule (spec §2.5): every interactive control pairs an inline stroke SVG
// with a text label. 24px viewBox, stroke 1.6–1.8, round caps/joins, rendered
// at 16–22px, inheriting currentColor. No emoji, no icon fonts — ever.

export function Icon({
  d,
  size = 18,
  strokeWidth = 1.7,
  className,
  color,
}: {
  d: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color ?? "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
