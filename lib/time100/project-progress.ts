import type { Project, Task } from "@/types";

export interface ProjectProgressItem {
  project: Project;
  totalHours: number;
  completedHours: number;
  actualHours: number;
  progress: number;
  taskCount: number;
  completedTaskCount: number;
  remainingTaskCount: number;
  canComplete: boolean;
  canDelete: boolean;
}

export function buildProjectProgress(
  projects: Project[],
  tasks: Task[],
): ProjectProgressItem[] {
  return projects.map((project) => {
    const projectTasks = tasks.filter(
      (task) => task.projectId === project.id,
    );

    const completedTasks = projectTasks.filter(
      (task) => task.status === "DONE",
    );

    const totalHours = projectTasks.reduce(
      (sum, task) => sum + task.estimated,
      0,
    );

    const completedHours = completedTasks.reduce(
      (sum, task) => sum + task.estimated,
      0,
    );

    const actualHours = projectTasks.reduce(
      (sum, task) => sum + task.actual,
      0,
    );

    const taskCount = projectTasks.length;
    const completedTaskCount = completedTasks.length;
    const remainingTaskCount = taskCount - completedTaskCount;

    const progress = totalHours > 0
      ? Math.round((completedHours / totalHours) * 100)
      : 0;

    return {
      project,
      totalHours,
      completedHours,
      actualHours,
      progress,
      taskCount,
      completedTaskCount,
      remainingTaskCount,
      canComplete:
        project.status !== "DONE" &&
        taskCount > 0 &&
        remainingTaskCount === 0,
      canDelete: projectTasks.every((task) => task.status === "TODO"),
    };
  });
}
