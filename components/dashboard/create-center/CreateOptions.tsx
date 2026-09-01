"use client";

import type { Language } from "@/types";
import type { CreateType } from "./types";

type Props = {
  language: Language;
  canCreateTask: boolean;
  onSelect: (type: CreateType) => void;
};

export default function CreateOptions({ language, canCreateTask, onSelect }: Props) {
  const zh = language === "zh";

  return (
    <div role="menu" aria-label={zh ? "创建选项" : "Create options"} className="space-y-2">
      <button
        type="button"
        role="menuitem"
        onClick={() => onSelect("project")}
        className="flex min-h-16 w-full items-center gap-3 rounded-2xl border border-slate-700 px-4 py-3 text-left transition hover:border-blue-500/50 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
      >
        <span aria-hidden="true" className="text-2xl">📁</span>
        <span>
          <span className="block font-semibold text-white">{zh ? "新建项目" : "New project"}</span>
          <span className="block text-sm text-slate-400">{zh ? "创建一个目标或阶段" : "Create a goal or phase"}</span>
        </span>
      </button>

      <button
        type="button"
        role="menuitem"
        disabled={!canCreateTask}
        onClick={() => onSelect("task")}
        className="flex min-h-16 w-full items-center gap-3 rounded-2xl border border-slate-700 px-4 py-3 text-left transition hover:border-violet-500/50 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span aria-hidden="true" className="text-2xl">✅</span>
        <span>
          <span className="block font-semibold text-white">{zh ? "新建任务" : "New task"}</span>
          <span className="block text-sm text-slate-400">
            {canCreateTask
              ? zh ? "添加一个行动步骤" : "Add an action step"
              : zh ? "请先创建项目" : "Create a project first"}
          </span>
        </span>
      </button>
    </div>
  );
}
