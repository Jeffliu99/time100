"use client";
import XpGrowthFeedback from "@/components/growth/XpGrowthFeedback";
export type GrowthResult = { companionName: string; totalXp: number; level: number; gainedXp: number };
export default function HouseXpPanel({growth,animationKey}:{growth:GrowthResult;animationKey:number}) {
  return <XpGrowthFeedback {...growth} triggerKey={animationKey} message="Nice work." />;
}
