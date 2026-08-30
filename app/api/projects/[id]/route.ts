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

    if (data.progress !== undefined) {
      data.progress = Number(data.progress);
    }

    if (data.priority !== undefined) {
      data.priority = Number(data.priority);
    }

    if (data.estimated !== undefined) {
      data.estimated = Number(data.estimated);
    }

    if (data.actual !== undefined) {
      data.actual = Number(data.actual);
    }

    const project = await prisma.project.update({
      where: { id: oldProject.id },
      data,
    });

    const justCompleted =
      oldProject.status !== "DONE" && project.status === "DONE";

    if (justCompleted) {
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
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const deletedProject = await prisma.project.delete({
      where: { id: project.id },
    });

    return NextResponse.json(deletedProject);
  } catch (error) {
    console.error("DELETE /api/projects/[id] failed", error);

    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}
