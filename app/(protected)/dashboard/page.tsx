import { requireProfile } from "@/lib/auth-guard";
import { redirect } from "next/navigation";
import Time100Dashboard from "@/components/dashboard/Time100Dashboard";

export default async function DashboardPage() {
  const { user } = await requireProfile();

  if (!user.profileCompleted) {
    redirect("/onboarding");
  }

  return <Time100Dashboard />;
}