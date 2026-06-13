"use client";

import { useState } from "react";
import { Logo } from "./Logo";
import { BellIcon, SearchIcon } from "./icons";

export function GlobalHeader() {
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <label className="relative hidden items-center sm:flex">
            <span className="sr-only">Search courses and plans</span>
            <SearchIcon
              width={17}
              height={17}
              className="pointer-events-none absolute left-3 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses, plans…"
              className="h-10 w-44 rounded-card border border-line bg-canvas pl-9 pr-3 text-sm text-ink transition-[width,box-shadow] placeholder:text-muted focus:w-64 focus:border-action focus:bg-surface focus:outline-none lg:w-56"
            />
          </label>

          <button
            type="button"
            className="relative grid size-10 place-items-center rounded-card border border-line bg-surface text-navy transition-colors hover:bg-canvas"
            aria-label="Notifications, 3 unread"
          >
            <BellIcon width={19} height={19} />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-warning ring-2 ring-surface" />
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-card border border-line bg-surface py-1 pl-1 pr-2.5 text-left transition-colors hover:bg-canvas"
            aria-label="Account menu for Nigel Smith"
          >
            <span className="grid size-8 place-items-center rounded-[0.5rem] bg-navy text-xs font-bold text-white">
              NS
            </span>
            <span className="hidden leading-tight md:block">
              <span className="block text-sm font-semibold text-navy">
                Nigel Smith
              </span>
              <span className="block text-[0.6875rem] text-muted">
                Junior · Computer Science
              </span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
