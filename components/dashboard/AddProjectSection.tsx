"use client";

import { useState } from "react";
import AddProjectForm from "@/components/projects/AddProjectForm";
import type { Language } from "@/types";

export default function AddProjectSection({ language }: { language: Language }) {
  const [open, setOpen] = useState(false);
  const zh = language === "zh";

  return (
    <section className="mt-7">
      {!open ? (
        <button type="button" onClick={() => setOpen(true)} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-[transform,opacity] duration-200 hover:scale-[1.02] hover:opacity-95 motion-reduce:transform-none motion-reduce:transition-none">
          {zh ? "+ 添加项目" : "+ Add Project"}
        </button>
      ) : (
        <AddProjectForm language={language} onCancel={() => setOpen(false)} />
      )}
    </section>
  );
}
