import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Time100Dashboard from "@/components/dashboard/Time100Dashboard";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return <Time100Dashboard />;
}