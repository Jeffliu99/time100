"use client";

import { CompanionBreathingAvatar } from "./CompanionBreathingAvatar";
import { CompanionDialog } from "./CompanionDialog";
import type { CompanionPhase } from "@/lib/companion/house-machine";

type CompanionAvatarProps = {
  phase: CompanionPhase;
  companionName: string;
  companionAvatar: string;
  message: string | null;
};

export function CompanionAvatar({
  phase,
  companionName,
  companionAvatar,
  message,
}: CompanionAvatarProps) {
 const visible =
  phase !== "IDLE" &&
  phase !== "RETURNING";
  const celebrating = phase === "LEVEL_UP_CELEBRATING";

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none absolute bottom-14 right-2 z-20 transition-[transform,opacity] ease-out motion-reduce:transform-none motion-reduce:transition-none ${
        celebrating ? "duration-700" : "duration-300"
      } ${
        visible
          ? celebrating
            ? "-translate-y-2 opacity-100"
            : "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      }`}
    >
      <div className="relative">
        <CompanionDialog phase={phase} message={message} />

        <CompanionBreathingAvatar
          name={companionName}
          avatar={companionAvatar}
          size={96}
          variant="idle"
          showHalo
        />
      </div>
    </div>
  );
}
