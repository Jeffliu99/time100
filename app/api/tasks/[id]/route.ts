import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const allowedFields = [
  "title",
  "description",
  "status",
  "priority",
  "order",
  "estimated",
  "actual",
  "dueDate",
  "projectId",
] as const;

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const data: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) data[field] = body[field];
    }

    if (typeof data.title === "string") data.title = data.title.trim();
    if (data.estimated !== undefined) data.estimated = Number(data.estimated);
    if (data.actual !== undefined) data.actual = Number(data.actual);
    if (data.order !== undefined) data.order = Number(data.order);
    if (data.dueDate !== undefined) {
      data.dueDate = data.dueDate ? new Date(String(data.dueDate)) : null;
    }

    const task = await prisma.task.update({ where: { id }, data });
    return NextResponse.json(task);
  } catch (error) {
    console.error("PATCH /api/tasks/[id] failed", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const task = await prisma.task.delete({ where: { id } });
    return NextResponse.json(task);
  } catch (error) {
    console.error("DELETE /api/tasks/[id] failed", error);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
