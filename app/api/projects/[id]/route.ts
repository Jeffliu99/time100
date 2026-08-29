import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

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

    const oldProject =
      await prisma.project.findUnique({
        where: { id },
      });

    if (!oldProject) {
      return NextResponse.json(
        { error: "Project not found" },
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

    const project =
      await prisma.project.update({
        where: { id },
        data,
      });

    const justCompleted =
      oldProject.status !== "DONE" &&
      project.status === "DONE";

      console.log(
        "PROJECT EVENT CHECK",
        oldProject.status,
        "->",
        project.status,
        "justCompleted:",
        justCompleted
      );

    if (justCompleted) {

      console.log(
        "CREATING PROJECT_COMPLETED",
        project.title
      );
      const existing =
        await prisma.growthEvent.findFirst({
          where: {
            projectId: project.id,
            type: "PROJECT_COMPLETED",
          },
        });

      if (!existing) {
        await prisma.growthEvent.create({
          data: {
            userId: session.user.id,
            projectId: project.id,

            type: "PROJECT_COMPLETED",

            title: project.title,

            description: `项目完成：${project.title}`,

            importance: 10,
          },
        });

        await prisma.companionMemory.create({
            data: {
              userId: session.user.id,
              title: project.title,
              content: `Completed project: ${project.title}`,
              type: "PROJECT_COMPLETED",
              importance: 5,
            },
          });
      }
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error(
      "PATCH /api/projects/[id] failed",
      error
    );

    return NextResponse.json(
      { error: "Failed to update project" },
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

    const project =
      await prisma.project.delete({
        where: { id },
      });

    return NextResponse.json(project);
  } catch (error) {
    console.error(
      "DELETE /api/projects/[id] failed",
      error
    );

    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}