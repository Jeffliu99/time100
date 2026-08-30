import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET /api/projects failed", error);

    return NextResponse.json(
      { error: "Failed to load projects" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";

    if (!title) {
      return NextResponse.json(
        { error: "Project title is required" },
        { status: 400 },
      );
    }

    const project = await prisma.project.create({
      data: {
        userId: session.user.id,
        title,
        description:
          typeof body.description === "string"
            ? body.description.trim() || null
            : null,
        status: body.status ?? "TODO",
        progress: Number(body.progress ?? 0),
        priority: Number(body.priority ?? 1),
        estimated: Number(body.estimated ?? 0),
        actual: Number(body.actual ?? 0),
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects failed", error);

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
