import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const allowedFields = [
  "title",
  "description",
  "status",
  "progress",
  "priority",
  "estimated",
  "actual",
] as const;

const projectStatuses = new Set(["TODO", "IN_PROGRESS", "DONE"]);

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

    const oldProject = await prisma.project.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!oldProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const data: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        data[field] = body[field];
      }
    }

    if (typeof data.title === "string") {
      data.title = data.title.trim();

      if (!data.title) {
        return NextResponse.json(
          { error: "Project title is required" },
          { status: 400 },
        );
      }
    }

    if (data.status !== undefined) {
      if (typeof data.status !== "string" || !projectStatuses.has(data.status)) {
        return NextResponse.json(
          { error: "Invalid project status" },
          { status: 400 },
        );
      }
    }

    if (data.progress !== undefined) {
      const progress = Number(data.progress);

      if (!Number.isFinite(progress) || progress < 0 || progress > 100) {
        return NextResponse.json(
          { error: "Progress must be between 0 and 100" },
          { status: 400 },
        );
      }

      data.progress = progress;
    }

    if (data.priority !== undefined) {
      const priority = Number(data.priority);

      if (!Number.isFinite(priority)) {
        return NextResponse.json(
          { error: "Invalid project priority" },
          { status: 400 },
        );
      }

      data.priority = priority;
    }

    for (const field of ["estimated", "actual"] as const) {
      if (data[field] !== undefined) {
        const value = Number(data[field]);

        if (!Number.isFinite(value) || value < 0) {
          return NextResponse.json(
            { error: `${field} must be zero or greater` },
            { status: 400 },
          );
        }

        data[field] = value;
      }
    }

    const wantsToComplete =
      oldProject.status !== "DONE" && data.status === "DONE";

    if (wantsToComplete) {
      const [totalTasks, incompleteTasks] = await prisma.$transaction([
        prisma.task.count({
          where: {
            projectId: oldProject.id,
            userId: session.user.id,
          },
        }),
        prisma.task.count({
          where: {
            projectId: oldProject.id,
            userId: session.user.id,
            status: { not: "DONE" },
          },
        }),
      ]);

      if (totalTasks === 0) {
        return NextResponse.json(
          { error: "A project must contain at least one task before completion" },
          { status: 409 },
        );
      }

      if (incompleteTasks > 0) {
        return NextResponse.json(
          {
            error: "All tasks must be completed before completing the project",
            incompleteTasks,
          },
          { status: 409 },
        );
      }

      data.progress = 100;
    }

    const project = await prisma.project.update({
      where: { id: oldProject.id },
      data,
    });

    if (wantsToComplete) {
      const existingEvent = await prisma.growthEvent.findFirst({
        where: {
          userId: session.user.id,
          projectId: project.id,
          type: "PROJECT_COMPLETED",
        },
      });

      if (!existingEvent) {
        await prisma.$transaction([
          prisma.growthEvent.create({
            data: {
              userId: session.user.id,
              projectId: project.id,
              type: "PROJECT_COMPLETED",
              title: project.title,
              description: `项目完成：${project.title}`,
              importance: 10,
            },
          }),
          prisma.companionMemory.create({
            data: {
              userId: session.user.id,
              title: project.title,
              content: `Completed project: ${project.title}`,
              type: "PROJECT_COMPLETED",
              importance: 5,
            },
          }),
        ]);
      }
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("PATCH /api/projects/[id] failed", error);

    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
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

    const project = await prisma.project.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        tasks: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const protectedTasks = project.tasks.filter(
      (task) => task.status === "DOING" || task.status === "DONE",
    );

    if (protectedTasks.length > 0) {
      return NextResponse.json(
        {
          error: "Projects containing active or completed tasks cannot be deleted",
          protectedTasks: protectedTasks.length,
        },
        { status: 409 },
      );
    }

    const deletedProject = await prisma.$transaction(async (transaction) => {
      if (project.tasks.length > 0) {
        await transaction.task.deleteMany({
          where: {
            projectId: project.id,
            userId: session.user.id,
            status: "TODO",
          },
        });
      }

      return transaction.project.delete({
        where: { id: project.id },
      });
    });

    return NextResponse.json({
      ...deletedProject,
      deletedTodoTasks: project.tasks.length,
    });
  } catch (error) {
    console.error("DELETE /api/projects/[id] failed", error);

    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}
