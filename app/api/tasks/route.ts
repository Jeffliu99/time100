import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const validPriorities = new Set(["LOW", "MEDIUM", "HIGH"]);

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const rawPage = Number(searchParams.get("page") ?? 1);
    const rawLimit = Number(searchParams.get("limit") ?? 50);
    const page = Number.isFinite(rawPage) ? Math.max(rawPage, 1) : 1;
    const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 100) : 50;
    const where = { userId: session.user.id };

    const [tasks, total] = await prisma.$transaction([
      prisma.task.findMany({ where, orderBy: [{ status: "asc" }, { order: "asc" }, { createdAt: "asc" }], skip: (page - 1) * limit, take: limit }),
      prisma.task.count({ where }),
    ]);

    return NextResponse.json({ data: tasks, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch (error) {
    console.error("GET /api/tasks failed", error);
    return NextResponse.json({ error: "Failed to load tasks" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const projectId = typeof body.projectId === "string" ? body.projectId.trim() : "";
    const estimated = Number(body.estimated ?? 1);
    const priority = validPriorities.has(body.priority) ? body.priority : "MEDIUM";

    if (!title || !projectId) return NextResponse.json({ error: "title and projectId are required" }, { status: 400 });
    if (!Number.isFinite(estimated) || estimated < 0.5) return NextResponse.json({ error: "estimated must be at least 0.5" }, { status: 400 });

    const project = await prisma.project.findFirst({ where: { id: projectId, userId: session.user.id }, select: { id: true } });
    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    const task = await prisma.task.create({
      data: {
        userId: session.user.id,
        title,
        description: typeof body.description === "string" ? body.description.trim() || null : null,
        projectId: project.id,
        status: "TODO",
        priority,
        order: Number(body.order ?? 0),
        estimated,
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
