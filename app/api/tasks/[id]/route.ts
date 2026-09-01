import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
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
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();
    const oldTask = await prisma.task.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!oldTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const data: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) data[field] = body[field];
    }

    if (typeof data.title === "string") {
      data.title = data.title.trim();
      if (!data.title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
      }
    }

    if (data.estimated !== undefined) data.estimated = Number(data.estimated);
    if (data.actual !== undefined) data.actual = Number(data.actual);
    if (data.order !== undefined) data.order = Number(data.order);

    if (data.dueDate !== undefined) {
      data.dueDate = data.dueDate ? new Date(String(data.dueDate)) : null;
    }

    const isCompleting = oldTask.status !== "DONE" && data.status === "DONE";
    const isReopening =
      oldTask.status === "DONE" && data.status !== undefined && data.status !== "DONE";

    if (isCompleting) data.completedAt = new Date();
    if (isReopening) data.completedAt = null;

    const task = await prisma.task.update({
      where: { id: oldTask.id },
      data,
    });

    if (isCompleting) {
      const existing = await prisma.growthEvent.findFirst({
        where: {
          userId: session.user.id,
          taskId: task.id,
          type: "TASK_COMPLETED",
        },
      });

      if (!existing) {
        await prisma.$transaction([
          prisma.growthEvent.create({
            data: {
              userId: session.user.id,
              taskId: task.id,
              type: "TASK_COMPLETED",
              title: task.title,
              description: `完成任务：${task.title}`,
              importance: 1,
            },
          }),
          prisma.companionMemory.create({
            data: {
              userId: session.user.id,
              title: task.title,
              content: `Completed task: ${task.title}`,
              type: "TASK_COMPLETED",
              importance: 1,
            },
          }),
        ]);
      }
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("PATCH /api/tasks/[id] failed", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const task = await prisma.task.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const deletedTask = await prisma.task.delete({ where: { id: task.id } });
    return NextResponse.json(deletedTask);
  } catch (error) {
    console.error("DELETE /api/tasks/[id] failed", error);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
