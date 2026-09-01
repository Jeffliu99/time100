import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      profileCompleted: true,
    },
  });

  if (!user?.profileCompleted) {
    redirect("/onboarding");
  }

  redirect("/dashboard");
}