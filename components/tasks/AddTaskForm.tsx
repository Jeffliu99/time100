"use client";

import { useMemo, useState } from "react";
import type { Language, Priority, Project, TaskStatus } from "@/types";
import { getMessages, priorityLabels } from "@/lib/translations";

interface Props {
  projects: Project[];
  language: Language;
  defaultProjectId: string;
  onAdd: (task: { title: string; projectId: string; phaseId: string; status: TaskStatus; priority: Priority; estimatedHours: number; dueDate?: string }) => void;
}

export default function AddTaskForm({ projects, language, defaultProjectId, onAdd }: Props) {
  const t = getMessages(language);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState(defaultProjectId || projects[0]?.id);
  const [priority, setPriority] = useState<Priority>("medium");
  const [estimatedHours, setEstimatedHours] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const project = useMemo(() => projects.find((item) => item.id === projectId), [projectId, projects]);
  const [phaseId, setPhaseId] = useState(projects[0]?.phases[0]?.id || "");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), projectId, phaseId: phaseId || project?.phases[0]?.id || "", status: "todo", priority, estimatedHours, dueDate });
    setTitle("");
    setOpen(false);
  }

  if (!open) return <button onClick={() => setOpen(true)} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm">+ {t.addTask}</button>;

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-2xl border bg-white p-4 shadow-sm md:grid-cols-6 dark:border-slate-700 dark:bg-slate-800">
      <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t.taskTitle} className="rounded-lg border px-3 py-2 md:col-span-2 dark:border-slate-600 dark:bg-slate-900" />
      <select value={projectId} onChange={(e) => { setProjectId(e.target.value); setPhaseId(projects.find((p) => p.id === e.target.value)?.phases[0]?.id || ""); }} className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-900">
        {projects.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-900">
        {(["high", "medium", "low"] as Priority[]).map((item) => <option key={item} value={item}>{priorityLabels[language][item]}</option>)}
      </select>
      <input type="number" min="0.5" step="0.5" value={estimatedHours} onChange={(e) => setEstimatedHours(Number(e.target.value))} className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-900" />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-900" />
      <div className="flex gap-2 md:col-span-6 md:justify-end">
        <button type="button" onClick={() => setOpen(false)} className="rounded-lg border px-4 py-2">{t.cancel}</button>
        <button className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white">{t.save}</button>
      </div>
    </form>
  );
}
