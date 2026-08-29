import type { Priority, Task, TaskStatus, TaskUpdateInput } from "@/types";

const priorityWeight: Record<Priority, number> = {
  HIGH: 0,
  MEDIUM: 1,
  LOW: 2,
};

export function pickBefore(task: Task, changes: TaskUpdateInput): TaskUpdateInput {
  const before: TaskUpdateInput = {};
  for (const key of Object.keys(changes) as (keyof TaskUpdateInput)[]) {
    (before as Record<string, unknown>)[key] = task[key as keyof Task];
  }
  return before;
}

export function sortTasksByStatus(tasks: Task[], status: TaskStatus) {
  return tasks
    .filter((task) => task.status === status)
    .sort(
      (a, b) =>
        priorityWeight[a.priority] - priorityWeight[b.priority] ||
        a.order - b.order
    );
}
