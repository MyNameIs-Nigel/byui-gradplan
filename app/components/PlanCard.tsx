import Link from "next/link";
import type { Plan } from "../lib/types";
import { ProgressRing } from "./ProgressRing";
import { StatusBadge } from "./StatusBadge";
import {
  ArrowRightIcon,
  CopyIcon,
  DotsIcon,
  EyeIcon,
} from "./icons";

function QuickAction({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-[0.5rem] border border-line bg-surface text-muted transition-colors hover:border-action/40 hover:bg-action-50 hover:text-action"
    >
      {children}
    </button>
  );
}

export function PlanCard({ plan }: { plan: Plan }) {
  if (plan.isPrimary) {
    return <PrimaryPlanCard plan={plan} />;
  }
  return <SecondaryPlanCard plan={plan} />;
}

function PrimaryPlanCard({ plan }: { plan: Plan }) {
  return (
    <article className="group relative overflow-hidden rounded-card border border-navy/15 bg-navy text-white shadow-float">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-action/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-10 size-56 rounded-full bg-emerald/20 blur-3xl"
      />
      <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="label-caps !text-white/60">Declared Plan</span>
            <StatusBadge status={plan.status} />
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-[1.7rem]">
            {plan.name}
          </h2>
          <p className="mt-1 text-sm text-white/70">
            {plan.degree} · Catalog {plan.catalogYear}
          </p>

          <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/15 pt-5">
            <div>
              <dt className="label-caps !text-white/55">Credits</dt>
              <dd className="mt-1 font-mono text-lg font-semibold tabular-nums">
                {plan.creditsEarned}
                <span className="text-white/50">/{plan.creditsRequired}</span>
              </dd>
            </div>
            <div>
              <dt className="label-caps !text-white/55">Graduates</dt>
              <dd className="mt-1 text-lg font-semibold">
                {plan.expectedGraduation}
              </dd>
            </div>
            <div>
              <dt className="label-caps !text-white/55">Remaining</dt>
              <dd className="mt-1 font-mono text-lg font-semibold tabular-nums">
                {plan.creditsRequired - plan.creditsEarned} cr
              </dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={`/planner/${plan.id}`}
              className="inline-flex h-11 items-center gap-2 rounded-card bg-white px-5 text-sm font-semibold text-navy transition-transform hover:-translate-y-0.5"
            >
              Open Planner
              <ArrowRightIcon width={17} height={17} />
            </Link>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-card border border-white/25 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <CopyIcon width={16} height={16} />
              Duplicate
            </button>
          </div>
        </div>

        <div className="flex shrink-0 justify-center sm:block">
          <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-inset ring-white/15 backdrop-blur-sm">
            <RingOnDark plan={plan} />
          </div>
        </div>
      </div>
    </article>
  );
}

/* A progress ring restyled for the dark primary card surface. */
function RingOnDark({ plan }: { plan: Plan }) {
  const pct = Math.round((plan.creditsEarned / plan.creditsRequired) * 100);
  const size = 132;
  const stroke = 11;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - plan.creditsEarned / plan.creditsRequired);

  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${pct} percent of degree complete`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          stroke="rgb(255 255 255 / 0.18)"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="ring-progress"
          stroke="#34d399"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ ["--ring-circumference" as string]: `${circumference}` }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-2xl font-bold tabular-nums">{pct}%</div>
          <div className="label-caps !text-white/55">Complete</div>
        </div>
      </div>
    </div>
  );
}

function SecondaryPlanCard({ plan }: { plan: Plan }) {
  return (
    <article className="group flex flex-col rounded-card border border-line bg-surface p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-action/30 hover:shadow-float">
      <div className="flex items-start justify-between gap-3">
        <ProgressRing
          value={plan.creditsEarned}
          max={plan.creditsRequired}
          size={64}
          stroke={7}
          colorClass={plan.status === "draft" ? "text-muted" : "text-action"}
        />
        <StatusBadge status={plan.status} />
      </div>

      <h3 className="mt-4 text-base font-semibold tracking-tight text-navy">
        {plan.name}
      </h3>
      <p className="mt-1 text-sm text-muted">
        {plan.degree} · {plan.expectedGraduation}
      </p>

      <div className="mt-3 flex items-center gap-2 font-mono text-xs text-muted tabular-nums">
        <span className="font-semibold text-ink">{plan.creditsEarned}</span>/
        {plan.creditsRequired} credits
        <span className="text-line">·</span>
        <span>{plan.updatedAt}</span>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
        <Link
          href={`/planner/${plan.id}`}
          className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-[0.5rem] bg-navy-50 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
        >
          <EyeIcon width={16} height={16} />
          View
        </Link>
        <QuickAction label="Duplicate plan">
          <CopyIcon width={16} height={16} />
        </QuickAction>
        <QuickAction label="Plan options">
          <DotsIcon width={16} height={16} />
        </QuickAction>
      </div>
    </article>
  );
}
