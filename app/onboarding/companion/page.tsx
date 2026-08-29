import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CompanionSetupWizard } from "@/components/companion/CompanionSetupWizard";

export default async function CompanionOnboardingPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { companionSetupCompleted: true },
  });

  if (!user) {
    redirect("/api/auth/signin");
  }

  if (user.companionSetupCompleted) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-white">
      <CompanionSetupWizard />
    </main>
  );
}
