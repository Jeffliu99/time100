import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { findCompanion } from "@/lib/companions";
import { prisma } from "@/lib/prisma";

const allowedGoals = new Set(["business", "career", "study", "health", "family", "other"]);
const allowedAges = new Set(["under-18", "18-24", "25-34", "35-44", "45-54", "55+"]);
const allowedLanguages = new Set(["en", "zh"]);
const allowedCountries = new Set(["Canada", "United States", "China", "Other"]);

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const goal = String(body.goal || "");
    const ageGroup = String(body.ageGroup || "");
    const preferredLanguage = String(body.preferredLanguage || "");
    const country = String(body.country || "");
    const city = typeof body.city === "string" ? body.city.trim().slice(0, 80) : "";
    const companion = findCompanion(body.companionId);

    if (!allowedGoals.has(goal) || !allowedAges.has(ageGroup) || !allowedLanguages.has(preferredLanguage) || !allowedCountries.has(country) || !companion) {
      return NextResponse.json({ error: "Invalid onboarding information" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        goal,
        ageGroup,
        preferredLanguage,
        country,
        city: city || null,
        profileCompleted: true,
        companionName: companion.name,
        companionType: companion.type,
        companionAvatar: companion.avatar,
        companionSetupCompleted: true,
        companionCreatedAt: new Date(),
      },
      select: {
        id: true,
        profileCompleted: true,
        companionName: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("POST /api/profile/onboarding failed", error);
    return NextResponse.json({ error: "Failed to save onboarding" }, { status: 500 });
  }
}
