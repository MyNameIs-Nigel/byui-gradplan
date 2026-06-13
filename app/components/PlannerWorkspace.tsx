"use client";

import { useMemo, useState } from "react";
import type { Course, Semester } from "../lib/types";
import { CoursePill } from "./CoursePill";
import { PlusIcon } from "./icons";

interface DragInfo {
  courseId: string;
  fromSemester: string;
}

interface PlannerWorkspaceProps {
  initialSemesters: Semester[];
  courses: Record<string, Course>;
}

export function PlannerWorkspace({
  initialSemesters,
  courses,
}: PlannerWorkspaceProps) {
  const [board, setBoard] = useState<Semester[]>(initialSemesters);
  const [drag, setDrag] = useState<DragInfo | null>(null);
  const [hoverTarget, setHoverTarget] = useState<string | null>(null);

  const creditsByTerm = useMemo(() => {
    const map: Record<string, number> = {};
    for (const term of board) {
      map[term.id] = term.courseIds.reduce(
        (sum, id) => sum + (courses[id]?.credits ?? 0),
        0,
      );
    }
    return map;
  }, [board, courses]);

  function handleDrop(targetId: string) {
    setHoverTarget(null);
    if (!drag) return;
    if (drag.fromSemester === targetId) {
      setDrag(null);
      return;
    }

    setBoard((prev) =>
      prev.map((term) => {
        if (term.id === drag.fromSemester) {
          return {
            ...term,
            courseIds: term.courseIds.filter((id) => id !== drag.courseId),
          };
        }
        if (term.id === targetId) {
          return { ...term, courseIds: [...term.courseIds, drag.courseId] };
        }
        return term;
      }),
    );
    setDrag(null);
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {board.map((term) => {
        const credits = creditsByTerm[term.id];
        const overloaded = credits > 16;
        const isTarget = hoverTarget === term.id;

        return (
          <section
            key={term.id}
            onDragOver={(e) => {
              e.preventDefault();
              setHoverTarget(term.id);
            }}
            onDragLeave={(e) => {
              if (e.currentTarget.contains(e.relatedTarget as Node)) return;
              setHoverTarget((t) => (t === term.id ? null : t));
            }}
            onDrop={() => handleDrop(term.id)}
            className={`flex flex-col rounded-card border bg-canvas/60 p-4 transition-colors ${
              isTarget
                ? "border-action border-dashed bg-action-50"
                : "border-line"
            }`}
            aria-label={`${term.term} ${term.year} semester`}
          >
            <header className="flex items-center justify-between gap-2 pb-3">
              <div>
                <h3 className="text-sm font-bold tracking-tight text-navy">
                  {term.term} {term.year}
                </h3>
                <span className="label-caps">
                  {term.courseIds.length} courses
                </span>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 font-mono text-xs font-semibold tabular-nums ${
                  overloaded
                    ? "bg-warning-50 text-warning"
                    : "bg-surface text-muted ring-1 ring-inset ring-line"
                }`}
                title={overloaded ? "Above recommended 16 credit load" : undefined}
              >
                {credits} cr
              </span>
            </header>

            <div className="flex flex-1 flex-col gap-2">
              {term.courseIds.map((id) => {
                const course = courses[id];
                if (!course) return null;
                return (
                  <CoursePill
                    key={id}
                    course={course}
                    draggable
                    dragging={drag?.courseId === id}
                    onDragStart={() =>
                      setDrag({ courseId: id, fromSemester: term.id })
                    }
                    onDragEnd={() => {
                      setDrag(null);
                      setHoverTarget(null);
                    }}
                  />
                );
              })}

              <button
                type="button"
                className="mt-1 flex h-10 items-center justify-center gap-1.5 rounded-[0.625rem] border border-dashed border-line text-xs font-semibold text-muted transition-colors hover:border-action/50 hover:bg-action-50 hover:text-action"
              >
                <PlusIcon width={15} height={15} strokeWidth={2.5} />
                Add course
              </button>
            </div>
          </section>
        );
      })}
    </div>
  );
}
