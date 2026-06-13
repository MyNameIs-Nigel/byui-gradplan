import Link from "next/link";
import { notFound } from "next/navigation";
import { GlobalHeader } from "../../components/GlobalHeader";
import { PlannerWorkspace } from "../../components/PlannerWorkspace";
import { ProgressSidebar } from "../../components/ProgressSidebar";
import { CoursePill } from "../../components/CoursePill";
import { StatusBadge } from "../../components/StatusBadge";
import { ArrowLeftIcon } from "../../components/icons";
import {
  completedSemesters,
  courses,
  getPlan,
  plans,
  requirements,
  semesters,
} from "../../lib/data";

export function generateStaticParams() {
  return plans.map((plan) => ({ id: plan.id }));
}

const legend = [
  { label: "Approved", className: "bg-approved" },
  { label: "Planned", className: "bg-planned" },
  { label: "Needs attention", className: "bg-warning" },
];

export default async function PlannerPage(props: PageProps<"/planner/[id]">) {
  const { id } = await props.params;
  const plan = getPlan(id);

  if (!plan) {
    notFound();
  }

  return (
    <div className="flex min-h-full flex-col">
      <GlobalHeader />

      {/* Plan toolbar */}
      <div className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="min-w-0">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition-colors hover:text-action"
            >
              <ArrowLeftIcon width={15} height={15} />
              All plans
            </Link>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-navy">
                {plan.name}
              </h1>
              <StatusBadge status={plan.status} />
            </div>
            <p className="mt-1 text-sm text-muted">
              {plan.degree} · Catalog {plan.catalogYear} · Expected{" "}
              {plan.expectedGraduation}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-10 rounded-card border border-line bg-surface px-4 text-sm font-semibold text-navy transition-colors hover:bg-canvas"
            >
              Share
            </button>
            <button
              type="button"
              className="h-10 rounded-card bg-emerald px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald/90"
            >
              Submit to Advisor
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Workspace (8 cols) */}
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-navy">
                Academic Timeline
              </h2>
              <ul className="flex items-center gap-4">
                {legend.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-1.5 text-xs font-medium text-muted"
                  >
                    <span className={`size-2.5 rounded-full ${item.className}`} />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-1 text-sm text-muted">
              Drag course pills between semesters to rebalance your load.
            </p>

            <div className="mt-5">
              <PlannerWorkspace
                initialSemesters={semesters}
                courses={courses}
              />
            </div>

            {/* Completed coursework (read-only) */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold tracking-tight text-navy">
                Completed Coursework
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {completedSemesters.map((term) => (
                  <section
                    key={term.id}
                    className="rounded-card border border-line bg-canvas/60 p-4 opacity-90"
                    aria-label={`${term.term} ${term.year}, completed`}
                  >
                    <header className="flex items-center justify-between pb-3">
                      <h3 className="text-sm font-bold tracking-tight text-navy">
                        {term.term} {term.year}
                      </h3>
                      <span className="rounded-full bg-approved-50 px-2.5 py-1 text-xs font-semibold text-approved">
                        Earned
                      </span>
                    </header>
                    <div className="flex flex-col gap-2">
                      {term.courseIds.map((cid) => {
                        const course = courses[cid];
                        return course ? (
                          <CoursePill key={cid} course={course} />
                        ) : null;
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <ProgressSidebar plan={plan} requirements={requirements} />
          </div>
        </div>
      </main>
    </div>
  );
}
