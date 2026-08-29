import type { Task, TaskCreateInput, TaskUpdateInput } from "@/types";

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch("/api/tasks", { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to load tasks");
  const payload = await response.json();
  return payload.data;
}

export async function createTaskRequest(input: TaskCreateInput): Promise<Task> {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error("Failed to create task");
  return response.json();
}

export async function updateTaskRequest(
  id: string,
  changes: TaskUpdateInput
): Promise<Task> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });
  if (!response.ok) throw new Error("Failed to update task");
  return response.json();
}

export async function deleteTaskRequest(id: string): Promise<Task> {
  const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete task");
  return response.json();
}
