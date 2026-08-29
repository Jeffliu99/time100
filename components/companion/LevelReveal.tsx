import type {
  CompanionPhase,
  LevelUpPayload,
} from "@/lib/companion/house-machine";

type Props = {
  phase: CompanionPhase;
  levelUp: LevelUpPayload | null;
};

export function LevelReveal({ phase, levelUp }: Props) {
  const visible = phase === "LEVEL_UP_REVEAL" && Boolean(levelUp);

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none absolute bottom-36 right-0 z-20 w-64 rounded-3xl border border-cyan-300/30 bg-slate-950/95 p-5 text-center text-white shadow-2xl transition-[transform,opacity] duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-2 opacity-0"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">
        Level Up
      </p>
      <p className="mt-3 text-sm text-slate-400">
        Level {levelUp?.previousLevel}
        <span className="mx-2">→</span>
        Level {levelUp?.newLevel}
      </p>
      <p className="mt-2 text-2xl font-semibold">{levelUp?.levelTitle}</p>
    </div>
  );
}
