import type { DashboardData } from "@/lib/dashboard/get-dashboard-data";

export async function fetchDashboardData(signal?: AbortSignal) {
  const response = await fetch("/api/dashboard", {
    method: "GET",
    credentials: "same-origin",
    cache: "no-store",
    signal,
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error || "Failed to load dashboard");
  }

  return payload as DashboardData;
}
