import { prisma } from "@/lib/prisma";

/**
 * Single data source for the authenticated Time100 dashboard.
 * All queries are scoped to userId and run in parallel.
 */
export async function getDashboardData(userId: string) {
  const [
    user,
    projects,
    tasks,
    totalProjects,
    completedTasks,
    openTasks,
    estimatedTotals,
  ] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        displayName: true,
        email: true,
        image: true,
        goal: true,
        preferredLanguage: true,
        companionName: true,
        companionType: true,
        companionAvatar: true,
        companionLevel: true,
        companionXp: true,
        houseLevel: true,
        profileCompleted: true,
      },
    }),

    // Full records are returned for compatibility with the current dashboard.
    // Add select clauses later after confirming every UI field in use.
    prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),

    prisma.task.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    }),

    prisma.project.count({
      where: { userId },
    }),

    prisma.task.count({
      where: {
        userId,
        status: "DONE",
      },
    }),

    prisma.task.count({
      where: {
        userId,
        status: { not: "DONE" },
      },
    }),

    prisma.task.aggregate({
      where: { userId },
      _sum: {
        estimated: true,
        actual: true,
      },
    }),
  ]);

  if (!user) {
    return null;
  }

  const totalEstimated = estimatedTotals._sum.estimated ?? 0;
  const totalActual = estimatedTotals._sum.actual ?? 0;

  return {
    user,
    projects,
    tasks,
    stats: {
      totalProjects,
      openTasks,
      completedTasks,
      totalEstimated,
      totalActual,
      remainingHours: Math.max(totalEstimated - totalActual, 0),
    },
  };
}

export type DashboardData = NonNullable<
  Awaited<ReturnType<typeof getDashboardData>>
>;
