"use client";

import { getMessages } from "@/lib/translations";
import { TaskCardActions } from "./TaskCardActions";
import { TaskPriorityBadge } from "./TaskPriorityBadge";
import type { TaskCardViewProps } from "./types";

export function TaskCardView({ task, project, language, busy, onMove, onDelete, onEdit }: TaskCardViewProps) {
  const t = getMessages(language);
  const done = task.status === "DONE";

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className={`font-semibold leading-6 ${done ? "text-slate-500 line-through" : ""}`}>{task.title}</h3>
          {done && <span className="mt-1 inline-flex rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-semibold text-emerald-300">✓ {language === "zh" ? "已完成" : "Completed"}</span>}
        </div>
        <TaskPriorityBadge priority={task.priority} language={language} />
      </div>

      {task.description && <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{task.description}</p>}

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        {project && <span className="rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-700">{project.title}</span>}
        <span>{t.estimated}: {task.estimated}h</span>
        {task.dueDate && <span>{new Intl.DateTimeFormat(language === "en" ? "en-CA" : "zh-CN", { year: "numeric", month: "short", day: "numeric" }).format(new Date(task.dueDate))}</span>}
      </div>

      <TaskCardActions status={task.status} language={language} busy={busy} taskTitle={task.title} onMove={onMove} onEdit={onEdit} onDelete={onDelete} />
    </>
  );
}
