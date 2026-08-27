"use client";

import type { Language, Project, Task, TaskStatus } from "@/types";
import { getMessages, priorityLabels } from "@/lib/translations";

interface Props {
  task: Task;
  projects: Project[];
  language: Language;
  onMove: (status: TaskStatus) => void;
  onDelete: () => void;
  onHoursChange: (hours: number) => void;
  onDragStart: () => void;
  onDrop: () => void;
}

const priorityStyle = {
  high: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
};

export default function TaskCard({ task, projects, language, onMove, onDelete, onHoursChange, onDragStart, onDrop }: Props) {
  const t = getMessages(language);
  const project = projects.find((item) => item.id === task.projectId);

  return (
    <article
      draggable
      onDragStart={onDragStart}
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
      className="cursor-grab rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold leading-6">{task.title}</h3>
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${priorityStyle[task.priority]}`}>
          {priorityLabels[language][task.priority]}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span className="rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-700">{project?.name}</span>
        <span>{t.estimated}: {task.estimated}h</span>
        {task.dueDate && <span>{task.dueDate}</span>}
      </div>

      <label className="mt-4 block text-xs text-slate-500 dark:text-slate-400">
        {t.actual}
        <input
          type="number"
          min="0"
          step="0.5"
          value={task.actual}
          onChange={(event) => onHoursChange(Number(event.target.value))}
          className="mt-1 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 dark:border-slate-600"
        />
      </label>

      <div className="mt-4 flex flex-wrap gap-2">
        {task.status !== "TODO" && (
          <button onClick={() => onMove(task.status === "DONE" ? "DOING" : "TODO")} className="rounded-lg border px-3 py-1.5 text-xs font-semibold">
            {t.moveBack}
          </button>
        )}
        {task.status === "TODO" && (
          <button onClick={() => onMove("DOING")} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">{t.start}</button>
        )}
        {task.status === "DOING" && (
          <button onClick={() => onMove("DONE")} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white">{t.finish}</button>
        )}
        <button onClick={onDelete} className="ml-auto rounded-lg px-2 py-1.5 text-xs font-semibold text-red-600">{t.delete}</button>
      </div>
    </article>
  );
}
