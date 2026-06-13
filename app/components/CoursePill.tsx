import type { Course, CourseStatus } from "../lib/types";
import { AlertIcon, CheckIcon, GripIcon } from "./icons";

const statusStyles: Record<
  CourseStatus,
  { border: string; dot: string; chip: string }
> = {
  approved: {
    border: "border-l-approved",
    dot: "bg-approved",
    chip: "bg-approved-50 text-approved",
  },
  planned: {
    border: "border-l-planned",
    dot: "bg-planned",
    chip: "bg-planned-50 text-planned",
  },
  warning: {
    border: "border-l-warning",
    dot: "bg-warning",
    chip: "bg-warning-50 text-warning",
  },
};

interface CoursePillProps {
  course: Course;
  draggable?: boolean;
  dragging?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export function CoursePill({
  course,
  draggable = false,
  dragging = false,
  onDragStart,
  onDragEnd,
}: CoursePillProps) {
  const styles = statusStyles[course.status];

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`group relative rounded-[0.625rem] border border-line border-l-4 bg-surface p-3 shadow-sm transition-all ${styles.border} ${
        draggable ? "cursor-grab active:cursor-grabbing hover:-translate-y-0.5 hover:shadow-card" : ""
      } ${dragging ? "scale-[0.98] opacity-40" : ""}`}
    >
      <div className="flex items-start gap-2">
        {draggable ? (
          <GripIcon
            width={16}
            height={16}
            className="mt-0.5 shrink-0 text-line transition-colors group-hover:text-muted"
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[0.8rem] font-semibold tracking-tight text-navy">
              {course.code}
            </span>
            <span
              className={`inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 font-mono text-[0.65rem] font-semibold tabular-nums ${styles.chip}`}
            >
              {course.credits} cr
            </span>
          </div>
          <p className="mt-0.5 truncate text-[0.8rem] text-ink" title={course.title}>
            {course.title}
          </p>
          {course.status === "warning" && course.note ? (
            <p className="mt-1.5 flex items-center gap-1 text-[0.7rem] font-medium text-warning">
              <AlertIcon width={12} height={12} strokeWidth={2.5} />
              {course.note}
            </p>
          ) : null}
          {course.status === "approved" ? (
            <p className="mt-1.5 flex items-center gap-1 text-[0.7rem] font-medium text-approved">
              <CheckIcon width={12} height={12} strokeWidth={3} />
              Completed
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
