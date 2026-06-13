import type { PlanStatus } from "../lib/types";
import { CheckIcon, ClockIcon, SparkIcon } from "./icons";

const config: Record<
  PlanStatus,
  { label: string; className: string; Icon: typeof CheckIcon }
> = {
  approved: {
    label: "Approved",
    className: "bg-approved-50 text-approved ring-approved/20",
    Icon: CheckIcon,
  },
  "in-review": {
    label: "In Review",
    className: "bg-planned-50 text-planned ring-planned/20",
    Icon: ClockIcon,
  },
  draft: {
    label: "Draft",
    className: "bg-canvas text-muted ring-line",
    Icon: SparkIcon,
  },
};

export function StatusBadge({ status }: { status: PlanStatus }) {
  const { label, className, Icon } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${className}`}
    >
      <Icon width={13} height={13} strokeWidth={2.5} />
      {label}
    </span>
  );
}
