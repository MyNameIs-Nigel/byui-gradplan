"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CloseIcon, PlusIcon } from "./icons";

const degrees = [
  "Computer Science, B.S.",
  "Software Engineering, B.S.",
  "Web Design & Development, B.S.",
  "Applied Technology, A.A.S.",
];

export function CreatePlanDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [degree, setDegree] = useState(degrees[0]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    firstFieldRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") trapFocus(e);
    }

    function trapFocus(e: KeyboardEvent) {
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 items-center gap-2 rounded-card bg-emerald px-5 text-sm font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-emerald/90"
      >
        <PlusIcon width={18} height={18} strokeWidth={2.5} />
        Create New Plan
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <button
            type="button"
            aria-label="Close dialog"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-navy/40 backdrop-blur-sm animate-rise"
            tabIndex={-1}
          />
          <div
            ref={dialogRef}
            className="animate-rise relative w-full max-w-md rounded-card border border-line bg-surface p-6 shadow-float"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="label-caps text-action">New Academic Plan</span>
                <h2
                  id={titleId}
                  className="mt-1 text-xl font-bold tracking-tight text-navy"
                >
                  Start planning your path
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid size-9 shrink-0 place-items-center rounded-[0.5rem] text-muted transition-colors hover:bg-canvas hover:text-navy"
              >
                <CloseIcon width={18} height={18} />
              </button>
            </div>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
            >
              <div>
                <label
                  htmlFor="plan-name"
                  className="mb-1.5 block text-sm font-semibold text-ink"
                >
                  Plan name
                </label>
                <input
                  id="plan-name"
                  ref={firstFieldRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Spring 2027 Graduation"
                  className="h-11 w-full rounded-card border border-line bg-canvas px-3.5 text-sm text-ink placeholder:text-muted focus:border-action focus:bg-surface focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="plan-degree"
                  className="mb-1.5 block text-sm font-semibold text-ink"
                >
                  Degree program
                </label>
                <select
                  id="plan-degree"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="h-11 w-full rounded-card border border-line bg-canvas px-3 text-sm text-ink focus:border-action focus:bg-surface focus:outline-none"
                >
                  {degrees.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="rounded-card border border-dashed border-line bg-canvas px-4 py-3 text-xs text-muted">
                New plans start as a <span className="font-semibold text-ink">Draft</span>{" "}
                and can be submitted to your Academic Discovery Center mentor
                for approval at any time.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-11 rounded-card px-4 text-sm font-semibold text-muted transition-colors hover:bg-canvas hover:text-navy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex h-11 items-center gap-2 rounded-card bg-emerald px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald/90"
                >
                  <PlusIcon width={17} height={17} strokeWidth={2.5} />
                  Create plan
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
