"use client";

import { useState } from "react";
import { MemoryDrawer } from "./MemoryDrawer";

export function CompanionMemoryControls() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white transition-[transform,opacity] duration-200 hover:scale-[1.02] hover:opacity-95 motion-reduce:transform-none motion-reduce:transition-none"
      >
        Nova's Memories
      </button>
      <MemoryDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
