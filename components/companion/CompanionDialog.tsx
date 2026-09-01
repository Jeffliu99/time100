"use client";

import Link from "next/link";
import type { CompanionPhase } from "@/lib/companion/house-machine";

type CompanionDialogProps = {
  phase: CompanionPhase;
  message: string | null;
};

const VISIBLE_PHASES: CompanionPhase[] = [
  "TALKING",
  "LEVEL_UP_CELEBRATING",
];

export function CompanionDialog({
  phase,
  message,
}: CompanionDialogProps) {
  const visible = Boolean(message) && VISIBLE_PHASES.includes(phase);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
      className={`pointer-events-auto absolute bottom-[calc(100%-1rem)] right-0 z-30 w-max min-w-[180px] max-w-[min(260px,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-slate-900/95 px-4 py-3 text-left text-sm leading-6 text-white shadow-2xl backdrop-blur-sm transition-[transform,opacity] duration-200 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <p className="m-0 break-words">{message}</p>

      <Link
        href="/timeline"
        className="mt-3 inline-flex text-xs font-semibold text-cyan-300 transition-opacity hover:opacity-80"
      >
        View Timeline →
      </Link>

      <span
        aria-hidden="true"
        className="absolute -bottom-2 right-10 h-4 w-4 rotate-45 border-b border-r border-white/10 bg-slate-900"
      />
    </div>
  );
}
