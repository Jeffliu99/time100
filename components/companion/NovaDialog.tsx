import type { CompanionPhase } from "@/lib/companion/house-machine";

type Props = {
  phase: CompanionPhase;
  message: string | null;
};

export function NovaDialog({ phase, message }: Props) {
  const visible =
    Boolean(message) &&
    (phase === "TALKING" || phase === "LEVEL_UP_CELEBRATING");

  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
      className={`pointer-events-none absolute bottom-36 right-0 z-20 w-64 rounded-2xl border border-white/10 bg-slate-900/95 px-4 py-3 text-sm leading-6 text-white shadow-xl transition-[transform,opacity] duration-200 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-2 opacity-0"
      }`}
    >
      {message}
    </div>
  );
}
