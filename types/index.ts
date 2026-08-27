export type Language = "zh" | "en";
export type Theme = "light" | "dark";
export type TaskStatus = "todo" | "doing" | "done";
export type Priority = "high" | "medium" | "low";

export interface ProjectPhase {
  id: string;
  title: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  phases: ProjectPhase[];
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
