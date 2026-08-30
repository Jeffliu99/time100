import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDashboardData } from "@/lib/dashboard/get-dashboard-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const data = await getDashboardData(session.user.id);

    if (!data) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(data, {
      headers: {
        // Dashboard data is personal and must not be stored by shared caches.
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("GET /api/dashboard failed", error);

    return NextResponse.json(
      { error: "Failed to load dashboard" },
      { status: 500 },
    );
  }
}
