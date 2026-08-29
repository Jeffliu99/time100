import type { CompanionMemoryDto } from "@/lib/companion/memory-types";

const ICONS: Record<string, string> = {
  PROJECT_COMPLETED: "🏆",
  TASK_COMPLETED: "✓",
  LEVEL_UP: "🌱",
  MILESTONE: "◆",
};

export function MemoryCard({ memory }: { memory: CompanionMemoryDto }) {
  const date = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(memory.createdAt));

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="mt-0.5 text-lg">
          {ICONS[memory.type] ?? "•"}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-white">{memory.title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            {memory.content}
          </p>
          <p className="mt-2 text-xs text-slate-500">{date}</p>
        </div>
      </div>
    </article>
  );
}
