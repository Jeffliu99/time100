import type {
  Language,
  Project,
  Task,
  TaskStatus,
  TaskUpdateInput,
} from "@/types";

export interface TaskCardProps {
  task: Task;
  projects: Project[];
  language: Language;
  onMove: (status: TaskStatus) => Promise<void> | void;
  onUpdate: (changes: TaskUpdateInput) => Promise<void> | void;
  onDelete: () => Promise<void> | void;
  onDragStart: () => void;
  onDrop: () => void;
}

export interface TaskCardViewProps {
  task: Task;
  project?: Project;
  language: Language;
  busy: boolean;
  onMove: TaskCardProps["onMove"];
  onDelete: TaskCardProps["onDelete"];
  onEdit: () => void;
}
