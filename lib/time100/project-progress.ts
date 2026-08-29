import type { Project, Task } from "@/types";

export function buildProjectProgress(projects: Project[], tasks: Task[]) {
  return projects.map((project) => {
    const projectTasks = tasks.filter((task) => task.projectId === project.id);
    const totalHours = projectTasks.reduce((sum, task) => sum + task.estimated, 0);
    const completedHours = projectTasks
      .filter((task) => task.status === "DONE")
      .reduce((sum, task) => sum + task.estimated, 0);
    const actualHours = projectTasks.reduce((sum, task) => sum + task.actual, 0);
    const progress = totalHours ? Math.round((completedHours / totalHours) * 100) : 0;

    return {
      project,
      totalHours,
      completedHours,
      actualHours,
      progress,
      taskCount: projectTasks.length,
    };
  });
}
