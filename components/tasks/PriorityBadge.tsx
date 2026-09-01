type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

const config = {
  LOW: { label: "Low", icon: "🌱", classes: "bg-emerald-500/15 text-emerald-300" },
  MEDIUM: { label: "Medium", icon: "✨", classes: "bg-amber-500/15 text-amber-300" },
  HIGH: { label: "High", icon: "🔥", classes: "bg-red-500/15 text-red-300" },
} as const;

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const item = config[priority];
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${item.classes}`}>{item.icon} {item.label}</span>;
}
