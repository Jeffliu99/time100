import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

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
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const body = await request.json();

    // 先读取修改前的任务
    const oldTask = await prisma.task.findUnique({
      where: { id },
    });

    if (!oldTask) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    const data: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        data[field] = body[field];
      }
    }

    if (typeof data.title === "string") {
      data.title = data.title.trim();
    }

    if (data.estimated !== undefined) {
      data.estimated = Number(data.estimated);
    }

    if (data.actual !== undefined) {
      data.actual = Number(data.actual);
    }

    if (data.order !== undefined) {
      data.order = Number(data.order);
    }

    if (data.dueDate !== undefined) {
      data.dueDate = data.dueDate
        ? new Date(String(data.dueDate))
        : null;
    }

    // 更新任务
    const task = await prisma.task.update({
      where: { id },
      data,
    });

    // 判断任务是不是“刚刚完成”
    const justCompleted =
    oldTask.status !== "DONE" &&
    task.status === "DONE";
    
    if (justCompleted) {
      const existing =
        await prisma.growthEvent.findFirst({
          where: {
            taskId: task.id,
            type: "TASK_COMPLETED",
          },
        });

      if (!existing) {
        await prisma.growthEvent.create({
          data: {
            userId: session.user.id,
            taskId: task.id,
            type: "TASK_COMPLETED",
            title: task.title,
            description: `完成任务：${task.title}`,
            importance: 1,
          },
        });

        await prisma.companionMemory.create({
          data: {
            userId: session.user.id,
            title: task.title,
            content: `Completed task: ${task.title}`,
            type: "TASK_COMPLETED",
            importance: 1,
          },
        });
      }
    }


    return NextResponse.json(task);
  } catch (error) {
    console.error(
      "PATCH /api/tasks/[id] failed",
      error
    );

    return NextResponse.json(
  { error: "Failed to update task" },
  { status: 500 }
);
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const task = await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error(
      "DELETE /api/tasks/[id] failed",
      error
    );

    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}