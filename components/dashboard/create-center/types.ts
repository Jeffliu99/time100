import type { ReactNode } from "react";
import type { Language } from "@/types";

export type CreateType = "project" | "task";

export type CreateCenterProps = {
  language: Language;
  canCreateTask: boolean;
  renderProjectForm: (close: () => void) => ReactNode;
  renderTaskForm: (close: () => void) => ReactNode;
};
