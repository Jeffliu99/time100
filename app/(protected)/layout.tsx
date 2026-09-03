import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AppShell from "@/components/layout/AppShell";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      preferredLanguage: true,
      companionName: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const language = user.preferredLanguage === "zh" ? "zh" : "en";

  return (
    <AppShell
      language={language}
      companionName={user.companionName}
    >
      {children}
    </AppShell>
  );
}
