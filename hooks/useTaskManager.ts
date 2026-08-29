"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  updateTaskRequest,
} from "@/lib/api/tasks";
import { pickBefore, sortTasksByStatus } from "@/lib/time100/task-utils";
import type { Task, TaskCreateInput, TaskStatus, TaskUpdateInput } from "@/types";

const MAX_HISTORY = 20;

type HistoryAction =
  | { type: "CREATE_TASK"; task: Task }
  | { type: "DELETE_TASK"; task: Task }
  | {
      type: "UPDATE_TASK";
      taskId: string;
      before: TaskUpdateInput;
      after: TaskUpdateInput;
    };

export function useTaskManager(initialTasks: Task[] = []) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [undoStack, setUndoStack] = useState<HistoryAction[]>([]);
  const [redoStack, setRedoStack] = useState<HistoryAction[]>([]);

  const pushHistory = useCallback((action: HistoryAction) => {
    setUndoStack((current) => [...current, action].slice(-MAX_HISTORY));
    setRedoStack([]);
  }, []);

  const addTask = useCallback(async (input: TaskCreateInput) => {
    const created = await createTaskRequest(input);
    setTasks((current) => [...current, created]);
    pushHistory({ type: "CREATE_TASK", task: created });
    return created;
  }, [pushHistory]);

  const updateTask = useCallback(async (id: string, changes: TaskUpdateInput) => {
    const currentTask = tasks.find((task) => task.id === id);
    if (!currentTask) return;

    const before = pickBefore(currentTask, changes);
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, ...changes } : task))
    );

    try {
      const updated = await updateTaskRequest(id, changes);
      setTasks((current) =>
        current.map((task) => (task.id === id ? updated : task))
      );
      pushHistory({ type: "UPDATE_TASK", taskId: id, before, after: changes });
    } catch (error) {
      setTasks((current) =>
        current.map((task) => (task.id === id ? { ...task, ...before } : task))
      );
      throw error;
    }
  }, [tasks, pushHistory]);

  const deleteTask = useCallback(async (id: string) => {
    const task = tasks.find((item) => item.id === id);
    if (!task) return;
    await deleteTaskRequest(id);
    setTasks((current) => current.filter((item) => item.id !== id));
    pushHistory({ type: "DELETE_TASK", task });
  }, [tasks, pushHistory]);

  const moveTask = useCallback(async (id: string, status: TaskStatus) => {
    const order = tasks.filter((task) => task.status === status).length;
    await updateTask(id, { status, order });
  }, [tasks, updateTask]);

  const reorderTask = useCallback((draggedId: string, targetId: string) => {
    if (draggedId === targetId) return;
    const dragged = tasks.find((task) => task.id === draggedId);
    const target = tasks.find((task) => task.id === targetId);
    if (!dragged || !target) return;
    void updateTask(draggedId, { status: target.status, order: target.order });
  }, [tasks, updateTask]);

  const sortedByStatus = useCallback(
    (status: TaskStatus) => sortTasksByStatus(tasks, status),
    [tasks]
  );

  const undo = useCallback(async () => {
    const action = undoStack.at(-1);
    if (!action) return;

    if (action.type === "UPDATE_TASK") {
      const updated = await updateTaskRequest(action.taskId, action.before);
      setTasks((current) =>
        current.map((task) => (task.id === action.taskId ? updated : task))
      );
    }

    if (action.type === "CREATE_TASK") {
      await deleteTaskRequest(action.task.id);
      setTasks((current) => current.filter((task) => task.id !== action.task.id));
    }

    if (action.type === "DELETE_TASK") {
      const restored = await createTaskRequest({
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
  }, [undoStack]);

  const redo = useCallback(async () => {
    const action = redoStack.at(-1);
    if (!action) return;

    if (action.type === "UPDATE_TASK") {
      const updated = await updateTaskRequest(action.taskId, action.after);
      setTasks((current) =>
        current.map((task) => (task.id === action.taskId ? updated : task))
      );
    }

    if (action.type === "CREATE_TASK") {
      const recreated = await createTaskRequest({
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
        await deleteTaskRequest(existing.id);
        setTasks((current) => current.filter((task) => task.id !== existing.id));
      }
    }

    setRedoStack((current) => current.slice(0, -1));
    setUndoStack((current) => [...current, action].slice(-MAX_HISTORY));
  }, [redoStack, tasks]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
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

  return {
    tasks,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    reorderTask,
    sortedByStatus,
    undo,
    redo,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
  };
}
