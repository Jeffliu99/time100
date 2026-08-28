export type Language = "zh" | "en";
export type Theme = "light" | "dark";
export type TaskStatus = "TODO" | "DOING" | "DONE";
export type Priority = "HIGH" | "MEDIUM" | "LOW";

export interface Project {
  id: string;
  title: string;
  description: string | null;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  progress: number;
  priority: number;
  estimated: number | null;
  actual: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: Priority;
  order: number;
  estimated: number;
  actual: number;
  dueDate: string | null;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskCreateInput = Pick<
  Task,
  "title" | "projectId" | "status" | "priority" | "estimated"
> & {
  description?: string | null;
  dueDate?: string | null;
};

export type TaskUpdateInput = Partial<
  Pick<
    Task,
    | "title"
    | "description"
    | "status"
    | "priority"
    | "order"
    | "estimated"
    | "actual"
    | "dueDate"
    | "projectId"
  >
>;

export interface UserPreferences {
  language: Language;
  theme: Theme;
  defaultProjectId: string;
}
