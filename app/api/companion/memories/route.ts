import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const memories = await prisma.companionMemory.findMany({
    where: { user: { email: session.user.email } },
    orderBy: [{ importance: "desc" }, { createdAt: "desc" }],
    take: 20,
    select: {
      id: true,
      title: true,
      content: true,
      type: true,
      importance: true,
      createdAt: true,
    },
  });

  return NextResponse.json({
    memories: memories.map((memory) => ({
      ...memory,
      createdAt: memory.createdAt.toISOString(),
    })),
  });
}
