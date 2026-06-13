import type { Plan, Requirement } from "../lib/types";
import { ProgressRing } from "./ProgressRing";
import { CheckIcon } from "./icons";

function RequirementRow({ req }: { req: Requirement }) {
  const done = req.completed >= req.total;
  const pct = req.total > 0 ? (req.completed / req.total) * 100 : 0;

  return (
    <li className="py-3 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`grid size-5 place-items-center rounded-full text-white transition-colors ${
              done ? "bg-approved" : "bg-line"
            }`}
          >
            {done ? <CheckIcon width={12} height={12} strokeWidth={3} /> : null}
          </span>
          <span className="text-sm font-medium text-ink">{req.label}</span>
        </div>
        <span className="font-mono text-xs font-semibold tabular-nums text-muted">
          {req.completed}/{req.total}
        </span>
      </div>
      <div className="mt-2 ml-7 h-1.5 overflow-hidden rounded-full bg-line">
        <div
          className={`h-full rounded-full transition-all ${done ? "bg-approved" : "bg-action"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </li>
  );
}

export function ProgressSidebar({
  plan,
  requirements,
}: {
  plan: Plan;
  requirements: Requirement[];
}) {
  const totalReqs = requirements.reduce((s, r) => s + r.total, 0);
  const doneReqs = requirements.reduce((s, r) => s + r.completed, 0);

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="space-y-5">
        <div className="rounded-card border border-line bg-surface p-6 shadow-card">
          <span className="label-caps">Degree Completion</span>
          <div className="mt-4 flex justify-center">
            <ProgressRing
              value={plan.creditsEarned}
              max={plan.creditsRequired}
              colorClass="text-emerald"
              sublabel="Complete"
            />
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4 text-center">
            <div>
              <dt className="label-caps">Earned</dt>
              <dd className="mt-0.5 font-mono text-lg font-bold tabular-nums text-emerald">
                {plan.creditsEarned}
              </dd>
            </div>
            <div>
              <dt className="label-caps">Required</dt>
              <dd className="mt-0.5 font-mono text-lg font-bold tabular-nums text-navy">
                {plan.creditsRequired}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-card border border-line bg-surface p-6 shadow-card">
          <div className="flex items-center justify-between">
            <span className="label-caps">Requirements</span>
            <span className="font-mono text-xs font-semibold tabular-nums text-muted">
              {doneReqs}/{totalReqs}
            </span>
          </div>
          <ul className="mt-4 divide-y divide-line">
            {requirements.map((req) => (
              <RequirementRow key={req.id} req={req} />
            ))}
          </ul>
        </div>

        <div className="rounded-card border border-emerald/20 bg-emerald-50 p-5">
          <p className="text-sm font-semibold text-emerald">On track to graduate</p>
          <p className="mt-1 text-xs leading-relaxed text-emerald/80">
            At your current pace you&apos;ll finish by {plan.expectedGraduation}.
            Resolve the {""}
            <span className="font-semibold">2 flagged courses</span> to keep your
            plan certified by your mentor.
          </p>
        </div>
      </div>
    </aside>
  );
}
