import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const NOVA = {
  type: "NOVA",
  name: "Nova",
  avatar: "/companions/nova.png",
} as const;

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const companionType =
    typeof body === "object" && body !== null && "companionType" in body
      ? (body as { companionType?: unknown }).companionType
      : undefined;

  if (companionType !== NOVA.type) {
    return NextResponse.json(
      { error: "Invalid companion type" },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      companionSetupCompleted: true,
      companionType: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.companionSetupCompleted) {
    return NextResponse.json({
      success: true,
      companionType: user.companionType ?? NOVA.type,
    });
  }

  const companion = await prisma.user.update({
    where: { id: user.id },
    data: {
      companionSetupCompleted: true,
      companionType: NOVA.type,
      companionName: NOVA.name,
      companionAvatar: NOVA.avatar,
      companionCreatedAt: new Date(),
    },
    select: { companionType: true },
  });

  return NextResponse.json({
    success: true,
    companionType: companion.companionType,
  });
}
