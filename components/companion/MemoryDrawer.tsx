"use client";

import { useEffect, useState } from "react";
import { MemoryCard } from "./MemoryCard";
import type { CompanionMemoryDto } from "@/lib/companion/memory-types";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MemoryDrawer({ open, onClose }: Props) {
  const [memories, setMemories] = useState<CompanionMemoryDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch("/api/companion/memories", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load memories");
        return response.json() as Promise<{ memories: CompanionMemoryDto[] }>;
      })
      .then((result) => setMemories(result.memories))
      .catch((cause) => {
        if (cause instanceof DOMException && cause.name === "AbortError") return;
        setError(cause instanceof Error ? cause.message : "Unable to load memories");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <section
      aria-label="Nova memories"
      aria-hidden={!open}
      className={`fixed inset-y-0 right-0 z-[60] w-full max-w-sm border-l border-white/10 bg-slate-950/95 p-5 shadow-2xl backdrop-blur transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${
        open ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Nova</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Growth Memories</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close memories"
          className="rounded-full border border-white/10 px-3 py-2 text-white"
        >
          ×
        </button>
      </div>

      <div className="mt-6 space-y-3 overflow-y-auto pb-8">
        {loading ? <p className="text-sm text-slate-400">Loading memories...</p> : null}
        {error ? <p role="alert" className="text-sm text-rose-300">{error}</p> : null}
        {!loading && !error && memories.length === 0 ? (
          <p className="text-sm leading-6 text-slate-400">
            Meaningful growth memories will appear here over time.
          </p>
        ) : null}
        {memories.map((memory) => (
          <MemoryCard key={memory.id} memory={memory} />
        ))}
      </div>
    </section>
  );
}
