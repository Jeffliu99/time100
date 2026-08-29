// app/api/growth/seed/route.ts

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const event = await prisma.growthEvent.create({
    data: {
      userId: session.user.id,
      type: "MILESTONE",
      title: "Time100 用户系统上线",
      description: "Google OAuth 登录成功",
      importance: 10,
    },
  });

  return NextResponse.json(event);
}