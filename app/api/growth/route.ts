import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const data = await req.json();

  const event = await prisma.growthEvent.create({
    data: {
      userId: session.user.id,

      type: data.type,

      title: data.title,

      description: data.description,

      importance: data.importance ?? 1,
    },
  });

  return NextResponse.json(event);
}