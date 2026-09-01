import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CompanionHouse from "@/components/companion/CompanionHouse";
import type { CompanionLanguage } from "@/components/companion/companion-copy";

export const dynamic = "force-dynamic";

export default async function CompanionPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      preferredLanguage: true,
      companionName: true,
      companionType: true,
      companionAvatar: true,
      companionLevel: true,
      companionXp: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const language: CompanionLanguage =
    user.preferredLanguage === "zh" ? "zh" : "en";

  return (
    <CompanionHouse
      language={language}
      companionName={user.companionName}
      companionType={user.companionType}
      companionAvatar={user.companionAvatar}
      companionLevel={user.companionLevel}
      companionXp={user.companionXp}
    />
  );
}
