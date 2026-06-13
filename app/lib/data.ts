import type { Course, Plan, Requirement, Semester } from "./types";

export const plans: Plan[] = [
  {
    id: "cs-bs",
    name: "Computer Science, B.S.",
    degree: "Bachelor of Science · BYU-Idaho",
    catalogYear: "2024–2025",
    status: "approved",
    creditsEarned: 87,
    creditsRequired: 120,
    expectedGraduation: "Spring 2027",
    updatedAt: "Updated 2 days ago",
    isPrimary: true,
  },
  {
    id: "wdd-minor",
    name: "Web Design & Development Minor",
    degree: "Minor · BYU-Idaho",
    catalogYear: "2024–2025",
    status: "in-review",
    creditsEarned: 12,
    creditsRequired: 21,
    expectedGraduation: "Spring 2027",
    updatedAt: "Updated 6 days ago",
  },
  {
    id: "cs-accel",
    name: "Accelerated Graduation Path",
    degree: "Bachelor of Science · BYU-Idaho",
    catalogYear: "2024–2025",
    status: "draft",
    creditsEarned: 87,
    creditsRequired: 120,
    expectedGraduation: "Winter 2026",
    updatedAt: "Updated 3 weeks ago",
  },
];

export const courses: Record<string, Course> = {
  cse110: { id: "cse110", code: "CSE 110", title: "Intro to Programming", credits: 3, status: "approved" },
  cse210: { id: "cse210", code: "CSE 210", title: "Data Structures", credits: 3, status: "approved" },
  math112: { id: "math112", code: "MATH 112", title: "Calculus I", credits: 4, status: "approved" },
  fdeng201: { id: "fdeng201", code: "FDENG 201", title: "Writing & Reasoning Foundations", credits: 3, status: "approved" },
  cse212: { id: "cse212", code: "CSE 212", title: "Object-Oriented Programming", credits: 3, status: "approved" },
  math113: { id: "math113", code: "MATH 113", title: "Calculus II", credits: 4, status: "approved" },
  cse230: { id: "cse230", code: "CSE 230", title: "Web Programming", credits: 3, status: "planned" },
  stat121: { id: "stat121", code: "STAT 121", title: "Principles of Statistics", credits: 3, status: "planned" },
  cse310: { id: "cse310", code: "CSE 310", title: "Algorithm Design", credits: 3, status: "planned" },
  cse340: { id: "cse340", code: "CSE 340", title: "Systems Programming", credits: 3, status: "warning", note: "Requires CSE 230 (planned)" },
  phys121: { id: "phys121", code: "PHYS 121", title: "College Physics I", credits: 3, status: "planned" },
  cse425: { id: "cse425", code: "CSE 425", title: "Software Engineering", credits: 3, status: "planned" },
  cse453: { id: "cse453", code: "CSE 453", title: "Database Systems", credits: 3, status: "warning", note: "Conflicts with CSE 425" },
  cse351: { id: "cse351", code: "CSE 351", title: "Computer Graphics", credits: 3, status: "planned" },
  elective: { id: "elective", code: "ELECT 3xx", title: "Upper-Division Elective", credits: 3, status: "planned" },
};

export const semesters: Semester[] = [
  { id: "f25", term: "Fall", year: 2025, courseIds: ["cse212", "math113", "cse230", "stat121"] },
  { id: "w26", term: "Winter", year: 2026, courseIds: ["cse310", "cse340", "phys121"] },
  { id: "s26", term: "Spring", year: 2026, courseIds: ["cse425", "cse453", "elective"] },
  { id: "f26", term: "Fall", year: 2026, courseIds: ["cse351"] },
];

export const completedSemesters: Semester[] = [
  { id: "f24", term: "Fall", year: 2024, courseIds: ["cse110", "math112", "fdeng201"] },
  { id: "w25", term: "Winter", year: 2025, courseIds: ["cse210"] },
];

export const requirements: Requirement[] = [
  { id: "core", label: "Major Core", completed: 7, total: 11 },
  { id: "foundations", label: "Foundations & GE", completed: 9, total: 12 },
  { id: "religion", label: "Religion Courses", completed: 4, total: 6 },
  { id: "electives", label: "Upper-Div Electives", completed: 1, total: 4 },
  { id: "internship", label: "Internship / Senior Project", completed: 0, total: 1 },
];

export function getPlan(id: string): Plan | undefined {
  return plans.find((plan) => plan.id === id);
}

export function getCourse(id: string): Course | undefined {
  return courses[id];
}

export function termCredits(courseIds: string[]): number {
  return courseIds.reduce((sum, id) => sum + (courses[id]?.credits ?? 0), 0);
}
