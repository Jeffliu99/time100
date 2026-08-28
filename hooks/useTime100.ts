"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { defaultPreferences } from "@/lib/seed";
import type {
  Priority,
  Project,
  Task,
  TaskCreateInput,
  TaskStatus,
  TaskUpdateInput,
  UserPreferences,
} from "@/types";

const SETTINGS_KEY = "time100-settings-v1";
const MAX_HISTORY = 20;

const priorityWeight: Record<Priority, number> = {
  HIGH: 0,
  MEDIUM: 1,
  LOW: 2,
};

type HistoryAction =
  | { type: "CREATE_TASK"; task: Task }
  | { type: "DELETE_TASK"; task: Task }
  | {
      type: "UPDATE_TASK";
      taskId: string;
      before: TaskUpdateInput;
      after: TaskUpdateInput;
    };

function pickBefore(task: Task, changes: TaskUpdateInput): TaskUpdateInput {
  const before: TaskUpdateInput = {};
  for (const key of Object.keys(changes) as (keyof TaskUpdateInput)[]) {
    (before as Record<string, unknown>)[key] = task[key as keyof Task];
  }
  return before;
}

export function useTime100() {
  const [ready, setReady] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [preferences, setPreferences] =
    useState<UserPreferences>(defaultPreferences);
  const [undoStack, setUndoStack] = useState<HistoryAction[]>([]);
  const [redoStack, setRedoStack] = useState<HistoryAction[]>([]);

  const pushHistory = useCallback((action: HistoryAction) => {
    setUndoStack((current) => [...current, action].slice(-MAX_HISTORY));
    setRedoStack([]);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const [projectsResponse, tasksResponse] = await Promise.all([
          fetch("/api/projects", { cache: "no-store" }),
          fetch("/api/tasks", { cache: "no-store" }),
        ]);

        if (!projectsResponse.ok || !tasksResponse.ok) {
          throw new Error("Failed to load Time100 data");
        }

        const [projectData, taskData] = await Promise.all([
          projectsResponse.json(),
          tasksResponse.json(),
        ]);

        setProjects(projectData);
        setTasks(taskData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setReady(true);
      }
    }

    const storedSettings = localStorage.getItem(SETTINGS_KEY);
    if (storedSettings) setPreferences(JSON.parse(storedSettings));
    load();
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(preferences));
    }
  }, [ready, preferences]);

  const createTaskDirect = useCallback(async (input: TaskCreateInput) => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error("Failed to create task");
    return (await response.json()) as Task;
  }, []);

  const updateTaskDirect = useCallback(
    async (id: string, changes: TaskUpdateInput) => {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });
      if (!response.ok) throw new Error("Failed to update task");
      return (await response.json()) as Task;
    },
    []
  );

  const deleteTaskDirect = useCallback(async (id: string) => {
    const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete task");
    return (await response.json()) as Task;
  }, []);

  const addTask = useCallback(
    async (input: TaskCreateInput) => {
      const created = await createTaskDirect(input);
      setTasks((current) => [...current, created]);
      pushHistory({ type: "CREATE_TASK", task: created });
      return created;
    },
    [createTaskDirect, pushHistory]
  );

  const updateTask = useCallback(
    async (id: string, changes: TaskUpdateInput) => {
      const currentTask = tasks.find((task) => task.id === id);
      if (!currentTask) return;

      const before = pickBefore(currentTask, changes);

      // 乐观更新，界面立即响应
      setTasks((current) =>
        current.map((task) =>
          task.id === id ? { ...task, ...changes } : task
        )
      );

      try {
        const updated = await updateTaskDirect(id, changes);
        setTasks((current) =>
          current.map((task) => (task.id === id ? updated : task))
        );
        pushHistory({ type: "UPDATE_TASK", taskId: id, before, after: changes });
      } catch (error) {
        // 请求失败则回滚
        setTasks((current) =>
          current.map((task) =>
            task.id === id ? { ...task, ...before } : task
          )
        );
        throw error;
      }
    },
    [tasks, updateTaskDirect, pushHistory]
  );

  const deleteTask = useCallback(
    async (id: string) => {
      const task = tasks.find((item) => item.id === id);
      if (!task) return;
      await deleteTaskDirect(id);
      setTasks((current) => current.filter((item) => item.id !== id));
      pushHistory({ type: "DELETE_TASK", task });
    },
    [tasks, deleteTaskDirect, pushHistory]
  );

  const moveTask = useCallback(
    async (id: string, status: TaskStatus) => {
      const order = tasks.filter((task) => task.status === status).length;
      await updateTask(id, { status, order });
    },
    [tasks, updateTask]
  );

  const undo = useCallback(async () => {
    const action = undoStack.at(-1);
    if (!action) return;

    if (action.type === "UPDATE_TASK") {
      const updated = await updateTaskDirect(action.taskId, action.before);
      setTasks((current) =>
        current.map((task) => (task.id === action.taskId ? updated : task))
      );
    }

    if (action.type === "CREATE_TASK") {
      await deleteTaskDirect(action.task.id);
      setTasks((current) =>
        current.filter((task) => task.id !== action.task.id)
      );
    }

    if (action.type === "DELETE_TASK") {
      const restored = await createTaskDirect({
        title: action.task.title,
        description: action.task.description,
        projectId: action.task.projectId,
        status: action.task.status,
        priority: action.task.priority,
        estimated: action.task.estimated,
        dueDate: action.task.dueDate,
      });
      setTasks((current) => [...current, restored]);
    }

    setUndoStack((current) => current.slice(0, -1));
    setRedoStack((current) => [...current, action].slice(-MAX_HISTORY));
  }, [undoStack, updateTaskDirect, deleteTaskDirect, createTaskDirect]);

  const redo = useCallback(async () => {
    const action = redoStack.at(-1);
    if (!action) return;

    if (action.type === "UPDATE_TASK") {
      const updated = await updateTaskDirect(action.taskId, action.after);
      setTasks((current) =>
        current.map((task) => (task.id === action.taskId ? updated : task))
      );
    }

    if (action.type === "CREATE_TASK") {
      const recreated = await createTaskDirect({
        title: action.task.title,
        description: action.task.description,
        projectId: action.task.projectId,
        status: action.task.status,
        priority: action.task.priority,
        estimated: action.task.estimated,
        dueDate: action.task.dueDate,
      });
      setTasks((current) => [...current, recreated]);
    }

    if (action.type === "DELETE_TASK") {
      const existing = tasks.find((task) => task.title === action.task.title);
      if (existing) {
        await deleteTaskDirect(existing.id);
        setTasks((current) =>
          current.filter((task) => task.id !== existing.id)
        );
      }
    }

    setRedoStack((current) => current.slice(0, -1));
    setUndoStack((current) => [...current, action].slice(-MAX_HISTORY));
  }, [redoStack, tasks, updateTaskDirect, createTaskDirect, deleteTaskDirect]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      // 输入框中保留浏览器原生字符级 Undo/Redo
      if (typing) return;

      const modifier = event.ctrlKey || event.metaKey;
      if (!modifier || event.key.toLowerCase() !== "z") return;

      event.preventDefault();
      if (event.shiftKey) void redo();
      else void undo();
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [undo, redo]);

  function reorderTask(draggedId: string, targetId: string) {
    if (draggedId === targetId) return;
    const dragged = tasks.find((task) => task.id === draggedId);
    const target = tasks.find((task) => task.id === targetId);
    if (!dragged || !target) return;
    void updateTask(draggedId, { status: target.status, order: target.order });
  }

  function sortedByStatus(status: TaskStatus) {
    return tasks
      .filter((task) => task.status === status)
      .sort(
        (a, b) =>
          priorityWeight[a.priority] - priorityWeight[b.priority] ||
          a.order - b.order
      );
  }

  const projectProgress = useMemo(() => {
    return projects.map((project) => {
      const projectTasks = tasks.filter((task) => task.projectId === project.id);
      const totalHours = projectTasks.reduce((sum, task) => sum + task.estimated, 0);
      const completedHours = projectTasks
        .filter((task) => task.status === "DONE")
        .reduce((sum, task) => sum + task.estimated, 0);
      const actualHours = projectTasks.reduce((sum, task) => sum + task.actual, 0);
      const progress = totalHours
        ? Math.round((completedHours / totalHours) * 100)
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
    undo,
    redo,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
  };
}
