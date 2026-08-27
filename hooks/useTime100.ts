"use client";

import { useEffect, useMemo, useState } from "react";
import { defaultPreferences, seedTasks } from "@/lib/seed";
import type {
  Priority,
  Project,
  Task,
  TaskStatus,
  UserPreferences,
} from "@/types";

const TASKS_KEY = "time100-tasks-v1";
const SETTINGS_KEY = "time100-settings-v1";

const priorityWeight: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function useTime100() {
  const [ready, setReady] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);

  const [tasks, setTasks] = useState<Task[]>(seedTasks);

  const [preferences, setPreferences] =
    useState<UserPreferences>(defaultPreferences);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();

        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects", error);
      }
    }

    loadProjects();

    const storedTasks = localStorage.getItem(TASKS_KEY);
    const storedSettings = localStorage.getItem(SETTINGS_KEY);

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }

    if (storedSettings) {
      setPreferences(JSON.parse(storedSettings));
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }
  }, [ready, tasks]);

  useEffect(() => {
    if (ready) {
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(preferences)
      );
    }
  }, [ready, preferences]);

  function addTask(
    input: Omit<
      Task,
      "id" | "createdAt" | "order" | "actualHours"
    >
  ) {
    const order = tasks.filter(
      (task) => task.status === input.status
    ).length;

    setTasks((current) => [
      ...current,
      {
        ...input,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        order,
        actualHours: 0,
      },
    ]);
  }

  function updateTask(
    id: string,
    changes: Partial<Task>
  ) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, ...changes }
          : task
      )
    );
  }

  function deleteTask(id: string) {
    setTasks((current) =>
      current.filter((task) => task.id !== id)
    );
  }

  function moveTask(
    id: string,
    status: TaskStatus
  ) {
    const nextOrder = tasks.filter(
      (task) => task.status === status
    ).length;

    updateTask(id, {
      status,
      order: nextOrder,
    });
  }

  function reorderTask(
    draggedId: string,
    targetId: string
  ) {
    if (draggedId === targetId) return;

    setTasks((current) => {
      const dragged = current.find(
        (task) => task.id === draggedId
      );

      const target = current.find(
        (task) => task.id === targetId
      );

      if (!dragged || !target) {
        return current;
      }

      const without = current.filter(
        (task) => task.id !== draggedId
      );

      const targetIndex = without.findIndex(
        (task) => task.id === targetId
      );

      const next = [...without];

      next.splice(targetIndex, 0, {
        ...dragged,
        status: target.status,
      });

      return next.map((task, index) => ({
        ...task,
        order: index,
      }));
    });
  }

  function sortedByStatus(status: TaskStatus) {
    return tasks
      .filter((task) => task.status === status)
      .sort(
        (a, b) =>
          priorityWeight[a.priority] -
            priorityWeight[b.priority] ||
          a.order - b.order
      );
  }

  const projectProgress = useMemo(() => {
    return projects.map((project) => {
      const projectTasks = tasks.filter(
        (task) => task.projectId === project.id
      );

      const totalHours = projectTasks.reduce(
        (sum, task) => sum + task.estimatedHours,
        0
      );

      const completedHours = projectTasks
        .filter((task) => task.status === "done")
        .reduce(
          (sum, task) =>
            sum + task.estimatedHours,
          0
        );

      const actualHours = projectTasks.reduce(
        (sum, task) => sum + task.actualHours,
        0
      );

      const progress = totalHours
        ? Math.round(
            (completedHours / totalHours) * 100
          )
        : 0;

      return {
        project,
        totalHours,
        completedHours,
        actualHours,
        progress,
        taskCount: projectTasks.length,
      };
    });
  }, [projects, tasks]);

  return {
    ready,
    projects,
    tasks,
    preferences,

    setPreferences,

    addTask,
    updateTask,
    deleteTask,
    moveTask,
    reorderTask,

    sortedByStatus,

    projectProgress,
  };
}