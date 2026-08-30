"use client";

import { useEffect, useMemo, useState } from "react";
import { usePreferences } from "@/hooks/usePreferences";
import { useTaskManager } from "@/hooks/useTaskManager";
import { fetchDashboardData } from "@/lib/dashboard/dashboard-client";
import { buildProjectProgress } from "@/lib/time100/project-progress";
import type { Project, Task } from "@/types";

export function useTime100() {
  const [ready, setReady] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const taskManager = useTaskManager();
  const { preferences, setPreferences } = usePreferences(ready);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    async function load() {
      try {
        const dashboard = await fetchDashboardData(controller.signal);

        if (!mounted) return;

        setProjects(
            dashboard.projects.map((project) => ({
              ...project,
              createdAt: new Date(project.createdAt).toISOString(),
              updatedAt: new Date(project.updatedAt).toISOString(),
              estimated: project.estimated ?? 0,
              actual: project.actual ?? 0,
              description: project.description ?? "",
            }))
          );

          taskManager.setTasks(
            dashboard.tasks.map((task) => ({
              ...task,
              createdAt: new Date(task.createdAt).toISOString(),
              updatedAt: new Date(task.updatedAt).toISOString(),
              dueDate: task.dueDate
                ? new Date(task.dueDate).toISOString()
                : null,
              description: task.description ?? "",
            }))
          );

      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error("Failed to load Time100 dashboard", error);
      } finally {
        if (mounted) {
          setReady(true);
        }
      }
    }

    void load();

    return () => {
      mounted = false;
      controller.abort();
    };
    // setTasks is stable; load must run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectProgress = useMemo(
    () => buildProjectProgress(projects, taskManager.tasks),
    [projects, taskManager.tasks],
  );

  return {
    ready,
    projects,
    tasks: taskManager.tasks,
    preferences,
    setPreferences,
    addTask: taskManager.addTask,
    updateTask: taskManager.updateTask,
    deleteTask: taskManager.deleteTask,
    moveTask: taskManager.moveTask,
    reorderTask: taskManager.reorderTask,
    sortedByStatus: taskManager.sortedByStatus,
    projectProgress,
    undo: taskManager.undo,
    redo: taskManager.redo,
    canUndo: taskManager.canUndo,
    canRedo: taskManager.canRedo,
  };
}
