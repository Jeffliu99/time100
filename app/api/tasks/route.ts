import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: [{ status: "asc" }, { order: "asc" }, { createdAt: "asc" }],
  });

  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title?.trim() || !body.projectId) {
      return NextResponse.json(
        { error: "title and projectId are required" },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title: body.title.trim(),
        description: body.description ?? null,
        projectId: body.projectId,
        status: body.status ?? "TODO",
        priority: body.priority ?? "MEDIUM",
        order: body.order ?? 0,
        estimated: Number(body.estimated ?? 0),
        actual: Number(body.actual ?? 0),
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("POST /api/tasks failed", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
