import XpGrowthFeedback from "@/components/growth/XpGrowthFeedback";

export default function HousePage() {
  return (
    <XpGrowthFeedback
      companionName="Orion"
      level={1}
      totalXp={45}
      gainedXp={0}
      message="Ready for today's progress."
    />
  );
}