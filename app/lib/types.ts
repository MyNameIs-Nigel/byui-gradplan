export type CourseStatus = "approved" | "planned" | "warning";

export type PlanStatus = "approved" | "in-review" | "draft";

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  status: CourseStatus;
  /** Short reason surfaced for warning-state courses (e.g. missing prereq). */
  note?: string;
}

export interface Semester {
  id: string;
  term: string;
  year: number;
  courseIds: string[];
}

export interface Requirement {
  id: string;
  label: string;
  completed: number;
  total: number;
}

export interface Plan {
  id: string;
  name: string;
  degree: string;
  catalogYear: string;
  status: PlanStatus;
  creditsEarned: number;
  creditsRequired: number;
  expectedGraduation: string;
  updatedAt: string;
  isPrimary?: boolean;
}
