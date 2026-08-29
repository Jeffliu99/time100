import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createRecallMessage } from "@/lib/companion/memory-message";
import type { CompanionMemoryDto } from "@/lib/companion/memory-types";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const memory = await prisma.companionMemory.findFirst({
    where: {
      user: { email: session.user.email },
      importance: { gte: 3 },
    },
    orderBy: [{ importance: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      content: true,
      type: true,
      importance: true,
      createdAt: true,
    },
  });

  if (!memory) {
    return NextResponse.json({ memory: null, message: null });
  }

  const dto: CompanionMemoryDto = {
    ...memory,
    createdAt: memory.createdAt.toISOString(),
  };

  return NextResponse.json({
    memory: dto,
    message: createRecallMessage(dto),
  });
}
