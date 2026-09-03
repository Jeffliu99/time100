import { redirect } from "next/navigation";
import { auth } from "@/auth";
import DailyRoutine from "@/components/guide/DailyRoutine";
import FaqSection from "@/components/guide/FaqSection";
import FeatureCards from "@/components/guide/FeatureCards";
import GuideHero from "@/components/guide/GuideHero";
import QuickLinks from "@/components/guide/QuickLinks";
import WorkflowSteps from "@/components/guide/WorkflowSteps";
import { getGuideCopy } from "@/components/guide/guide-copy";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function GuidePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { preferredLanguage: true },
  });

  if (!user) redirect("/login");

  const language = user.preferredLanguage === "zh" ? "zh" : "en";
  const copy = getGuideCopy(language);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <GuideHero copy={copy.hero} />
      <WorkflowSteps copy={copy.workflow} />
      <FeatureCards copy={copy.features} />
      <DailyRoutine copy={copy.routine} />
      <FaqSection copy={copy.faq} />
      <QuickLinks copy={copy.links} />
    </div>
  );
}
