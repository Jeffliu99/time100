"use client";

import CreateFlow from "@/components/dashboard/create-center/CreateFlow";
import { useCreate } from "@/components/create/CreateContext";

import type { Language } from "@/types";
import {
  useTime100Context,
} from "@/components/providers/Time100Provider";


interface CreatePanelProps {
  language: Language;
}

export default function CreatePanel({ language }: CreatePanelProps) {
  const app = useTime100Context();
  const { closeCreate } = useCreate();

  if (!app.ready) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-40 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/50 px-5 text-center text-sm text-slate-300"
      >
        {language === "zh" ? "正在加载创建工具..." : "Loading create tools..."}
      </div>
    );
  }

  return (
    <CreateFlow
      mode="embedded"
      language={language}
      projects={app.projects}
      defaultProjectId={app.projects[0]?.id ?? ""}
      onAddTask={app.addTask}
      onFinished={closeCreate}
    />
  );
}
