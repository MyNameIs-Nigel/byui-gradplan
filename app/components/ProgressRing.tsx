interface ProgressRingProps {
  value: number;
  max: number;
  size?: number;
  stroke?: number;
  /** Tailwind text-* color class for the progress arc. */
  colorClass?: string;
  label?: string;
  sublabel?: string;
}

export function ProgressRing({
  value,
  max,
  size = 132,
  stroke = 11,
  colorClass = "text-emerald",
  label,
  sublabel,
}: ProgressRingProps) {
  const pct = max > 0 ? Math.min(value / max, 1) : 0;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct);

  return (
    <div
      className="relative inline-grid place-items-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${Math.round(pct * 100)} percent complete`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="text-line"
          stroke="currentColor"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          className={`ring-progress ${colorClass}`}
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={
            { ["--ring-circumference" as string]: `${circumference}` }
          }
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-2xl font-bold tracking-tight text-navy tabular-nums">
            {label ?? `${Math.round(pct * 100)}%`}
          </div>
          {sublabel ? (
            <div className="label-caps mt-0.5">{sublabel}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
