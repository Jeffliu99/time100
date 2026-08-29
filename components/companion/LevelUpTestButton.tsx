"use client";

import { announceCompanionLevelUp } from "@/lib/companion/events";

export function LevelUpTestButton() {
  return (
    <button
      type="button"
      onClick={() =>
        announceCompanionLevelUp({
          previousLevel: 1,
          newLevel: 2,
          xpGained: 20,
          levelTitle: "Growth Sprout",
          unlockedReward: "House Lv2",
          sourceEventId: "development-test",
        })
      }
      className="rounded-lg bg-cyan-300 px-4 py-2 text-slate-950"
    >
      Test Level Up
    </button>
  );
}
