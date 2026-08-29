import type {
  CompanionPhase,
  LevelUpPayload,
} from "@/lib/companion/house-machine";

type Props = {
  phase: CompanionPhase;
  levelUp: LevelUpPayload | null;
};

export function LevelCelebration({ phase, levelUp }: Props) {
  const visible = phase === "LEVEL_UP_CELEBRATING" && Boolean(levelUp);

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none absolute bottom-14 right-28 z-10 w-44 rounded-2xl border border-cyan-300/20 bg-slate-900/95 p-4 text-sm text-white shadow-xl transition-[transform,opacity] duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-2 opacity-0"
      }`}
    >
      <p className="font-semibold text-cyan-300">+{levelUp?.xpGained} XP</p>
      {levelUp?.unlockedReward ? (
        <p className="mt-2 text-slate-300">
          Unlocked: {levelUp.unlockedReward}
        </p>
      ) : null}
    </div>
  );
}
