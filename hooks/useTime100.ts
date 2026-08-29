"use client";

import { useEffect, useMemo, useState } from "react";
import { usePreferences } from "@/hooks/usePreferences";
import { useTaskManager } from "@/hooks/useTaskManager";
import { fetchProjects } from "@/lib/api/projects";
import { fetchTasks } from "@/lib/api/tasks";
import { buildProjectProgress } from "@/lib/time100/project-progress";
import type { Project } from "@/types";

export function useTime100() {
  const [ready, setReady] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const taskManager = useTaskManager();
  const { preferences, setPreferences } = usePreferences(ready);

  useEffect(() => {
    async function load() {
      try {
        const [projectData, taskData] = await Promise.all([
          fetchProjects(),
          fetchTasks(),
        ]);
        setProjects(projectData);
        taskManager.setTasks(taskData);
      } catch (error) {
        console.error(error);
      } finally {
        setReady(true);
      }
    }

    void load();
    // setTasks is stable; load must run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectProgress = useMemo(
    () => buildProjectProgress(projects, taskManager.tasks),
    [projects, taskManager.tasks]
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
