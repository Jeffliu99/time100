import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const allowedGoals = new Set(["business", "career", "study", "health", "family", "other"]);
const allowedAges = new Set(["under-18", "18-24", "25-34", "35-44", "45-54", "55+"]);
const allowedLanguages = new Set(["en", "zh"]);
const allowedCountries = new Set(["Canada", "United States", "China", "Other"]);

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      displayName: true, email: true, image: true, goal: true, ageGroup: true,
      preferredLanguage: true, country: true, city: true, profileCompleted: true,
      companionName: true, companionType: true, companionAvatar: true,
    },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json(user);
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const displayName = typeof body.displayName === "string" ? body.displayName.trim().slice(0, 80) : "";
    const goal = String(body.goal || "");
    const ageGroup = String(body.ageGroup || "");
    const preferredLanguage = String(body.preferredLanguage || "");
    const country = String(body.country || "");
    const city = typeof body.city === "string" ? body.city.trim().slice(0, 80) : "";

    if (!allowedGoals.has(goal) || !allowedAges.has(ageGroup) || !allowedLanguages.has(preferredLanguage) || !allowedCountries.has(country)) {
      return NextResponse.json({ error: "Invalid profile information" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { displayName: displayName || null, goal, ageGroup, preferredLanguage, country, city: city || null },
      select: { displayName: true, goal: true, ageGroup: true, preferredLanguage: true, country: true, city: true },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error("PATCH /api/profile failed", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
