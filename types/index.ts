export type Language = "zh" | "en";

export type Theme = "light" | "dark";

export type TaskStatus = "todo" | "doing" | "done";

export type Priority = "high" | "medium" | "low";

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

  projectId: string;

  phaseId: string;

  status: TaskStatus;

  priority: Priority;

  order: number;

  estimatedHours: number;

  actualHours: number;

  dueDate?: string;

  createdAt: string;
}

export interface UserPreferences {
  language: Language;

  theme: Theme;

  defaultProjectId: string;
}