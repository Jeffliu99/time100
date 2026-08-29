import { MemoryCard } from "./MemoryCard";
import type { CompanionMemoryDto } from "@/lib/companion/memory-types";

export function MemoryTimeline({ memories }: { memories: CompanionMemoryDto[] }) {
  if (memories.length === 0) return null;

  return (
    <section aria-labelledby="companion-memory-heading" className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">Nova remembers</p>
        <h2 id="companion-memory-heading" className="mt-1 text-xl font-semibold">
          Growth Memories
        </h2>
      </div>
      <div className="space-y-3">
        {memories.map((memory) => (
          <MemoryCard key={memory.id} memory={memory} />
        ))}
      </div>
    </section>
  );
}
