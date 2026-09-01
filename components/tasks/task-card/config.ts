import type { Priority } from "@/types";
import type { ButtonVariant } from "@/components/ui/button-styles";

export const priorityConfig: Record<
  Priority,
  { icon: string; variant: ButtonVariant }
> = {
  LOW: { icon: "🌱", variant: "priorityLow" },
  MEDIUM: { icon: "✨", variant: "priorityMedium" },
  HIGH: { icon: "🔥", variant: "priorityHigh" },
};
