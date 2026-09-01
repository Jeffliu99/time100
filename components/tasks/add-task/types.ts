import type { Language, Priority, Project, TaskCreateInput } from "@/types";

export type DatePreset = "today" | "tomorrow" | "custom" | null;

export interface AddTaskFormProps {
  projects: Project[];
  language: Language;
  defaultProjectId: string;
  disabled?: boolean;
  initiallyOpen?: boolean;
  showTrigger?: boolean;
  onClose?: () => void;
  onAdd: (input: TaskCreateInput) => Promise<unknown> | unknown;
}

export interface AddTaskFormState {
  title: string;
  description: string;
  projectId: string;
  priority: Priority;
  estimated: number;
  dueDate: string;
  datePreset: DatePreset;
  submitting: boolean;
  error: string;
}
