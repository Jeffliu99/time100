import type { Language, Priority } from "@/types";
import { priorityLabels } from "@/lib/translations";
import { priorityConfig } from "./config";

export function TaskPriorityBadge({
  priority,
  language,
}: {
  priority: Priority;
  language: Language;
}) {
  const config = priorityConfig[priority];
  const colors = {
    LOW: "bg-emerald-500/15 text-emerald-300",
    MEDIUM: "bg-amber-500/15 text-amber-300",
    HIGH: "bg-red-500/15 text-red-300",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${colors[priority]}`}
    >
      <span aria-hidden="true">{config.icon}</span>
      {priorityLabels[language][priority]}
    </span>
  );
}
