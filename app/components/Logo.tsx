import Link from "next/link";
import { GraduationIcon } from "./icons";

export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5"
      aria-label="Grad Plan — BYU-Idaho home"
    >
      <span className="grid size-9 place-items-center rounded-[0.625rem] bg-navy text-white shadow-sm transition-transform group-hover:-translate-y-0.5">
        <GraduationIcon width={20} height={20} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-bold tracking-tight text-navy">
          Grad Plan
        </span>
        <span className="label-caps mt-0.5 !text-[0.5625rem] text-action">
          BYU-Idaho
        </span>
      </span>
    </Link>
  );
}
