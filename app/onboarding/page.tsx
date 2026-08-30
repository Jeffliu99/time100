import { requireAuth } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";

export default async function OnboardingPage() {
  const session = await requireAuth();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      displayName: true,
      profileCompleted: true,
      preferredLanguage: true,
    },
  });

  if (!user) redirect("/login");
  if (user.profileCompleted) redirect("/dashboard");

  return (
    <OnboardingWizard
      initialLanguage={user.preferredLanguage === "zh" ? "zh" : "en"}
      userName={user.displayName || user.name || ""}
    />
  );
}
