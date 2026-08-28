import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest
) {
  try {
    const { searchParams } = new URL(
      request.url
    );

    const page = Math.max(
      Number(searchParams.get("page") ?? 1),
      1
    );

    const limit = Math.min(
      Number(searchParams.get("limit") ?? 50),
      100
    );

    const tasks = await prisma.task.findMany({
      orderBy: [
        { status: "asc" },
        { order: "asc" },
        { createdAt: "asc" },
      ],
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.task.count();

    return NextResponse.json({
      data: tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(
          total / limit
        ),
      },
    });
  } catch (error) {
    console.error(
      "GET /api/tasks failed",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to load tasks",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

    if (
      !body.title?.trim() ||
      !body.projectId
    ) {
      return NextResponse.json(
        {
          error:
            "title and projectId are required",
        },
        {
          status: 400,
        }
      );
    }

    const task =
      await prisma.task.create({
        data: {
          title: body.title.trim(),
          description:
            body.description ?? null,
          projectId:
            body.projectId,

          status:
            body.status ?? "TODO",

          priority:
            body.priority ??
            "MEDIUM",

          order:
            Number(body.order ?? 0),

          estimated: Number(
            body.estimated ?? 0
          ),

          actual: Number(
            body.actual ?? 0
          ),

          dueDate: body.dueDate
            ? new Date(
                body.dueDate
              )
            : null,
        },
      });

    return NextResponse.json(
      task,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/tasks failed",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to create task",
      },
      {
        status: 500,
      }
    );
  }
}