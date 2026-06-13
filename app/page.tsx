import { GlobalHeader } from "./components/GlobalHeader";
import { CreatePlanDialog } from "./components/CreatePlanDialog";
import { PlanCard } from "./components/PlanCard";
import { LayersIcon, TargetIcon, ClockIcon } from "./components/icons";
import { plans } from "./lib/data";

const stats = [
  { label: "Active Plans", value: "3", Icon: LayersIcon, tint: "text-action bg-action-50" },
  { label: "Degree Progress", value: "73%", Icon: TargetIcon, tint: "text-emerald bg-emerald-50" },
  { label: "Terms to Grad", value: "4", Icon: ClockIcon, tint: "text-navy bg-navy-50" },
];

export default function DashboardPage() {
  const primary = plans.filter((p) => p.isPrimary);
  const secondary = plans.filter((p) => !p.isPrimary);

  return (
    <div className="flex min-h-full flex-col">
      <GlobalHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Page header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="animate-rise">
            <span className="label-caps text-action">Academic Plans</span>
            <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-navy sm:text-[2.25rem]">
              Welcome back, Nigel
            </h1>
            <p className="mt-2 max-w-xl text-[0.95rem] text-muted">
              Review your declared major plan, compare alternate paths at
              BYU-Idaho, and keep every requirement on track for graduation.
            </p>
          </div>
          <div className="animate-rise" style={{ animationDelay: "60ms" }}>
            <CreatePlanDialog />
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map(({ label, value, Icon, tint }, i) => (
            <div
              key={label}
              className="animate-rise flex items-center gap-4 rounded-card border border-line bg-surface p-5 shadow-card"
              style={{ animationDelay: `${100 + i * 60}ms` }}
            >
              <span className={`grid size-12 place-items-center rounded-card ${tint}`}>
                <Icon width={22} height={22} />
              </span>
              <div>
                <div className="text-2xl font-bold tracking-tight text-navy tabular-nums">
                  {value}
                </div>
                <div className="label-caps">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Primary (declared) plan */}
        <section className="mt-10" aria-labelledby="declared-heading">
          <h2 id="declared-heading" className="sr-only">
            Declared plan
          </h2>
          <div className="animate-rise" style={{ animationDelay: "180ms" }}>
            {primary.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        {/* Secondary plans */}
        <section className="mt-10" aria-labelledby="other-heading">
          <div className="flex items-center justify-between">
            <h2
              id="other-heading"
              className="text-lg font-semibold tracking-tight text-navy"
            >
              Other plans &amp; drafts
            </h2>
            <span className="label-caps">{secondary.length} plans</span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {secondary.map((plan, i) => (
              <div
                key={plan.id}
                className="animate-rise"
                style={{ animationDelay: `${220 + i * 70}ms` }}
              >
                <PlanCard plan={plan} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Grad Plan · BYU-Idaho</p>
          <p>Registration &amp; Academic Services · Rexburg, Idaho</p>
        </div>
      </footer>
    </div>
  );
}
