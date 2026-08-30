"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Language, Project, TaskCreateInput } from "@/types";

interface Props {
  projects: Project[];
  language: Language;
  defaultProjectId: string;
  disabled?: boolean;
  onAdd: (input: TaskCreateInput) => Promise<unknown> | unknown;
}

export default function AddTaskForm({ projects, language, defaultProjectId, disabled = false, onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const validDefaultProjectId = projects.some(
  (project) => project.id === defaultProjectId
)
  ? defaultProjectId
  : projects[0]?.id || "";

const [projectId, setProjectId] = useState(validDefaultProjectId);

  const [priority, setPriority] = useState("MEDIUM");
  const [estimated, setEstimated] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

useEffect(() => {
  const validDefaultId = projects.some(
    (project) => project.id === defaultProjectId
  )
    ? defaultProjectId
    : projects[0]?.id || "";

  if (!projects.some((project) => project.id === projectId)) {
    setProjectId(validDefaultId);
  }

  if (disabled) {
    setOpen(false);
  }
}, [projects, projectId, defaultProjectId, disabled]);


  const zh = language === "zh";

  function handleOpen() {
    if (disabled) return;
    setOpen(true);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled || submitting || !title.trim() || !projectId) return;

    setSubmitting(true);
    try {
      await onAdd({
        title: title.trim(),
        projectId,
        priority,
        estimated,
        dueDate: dueDate || undefined,
      } as TaskCreateInput);
      setTitle("");
      setDueDate("");
      setOpen(false);
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={handleOpen}
        disabled={disabled}
        aria-disabled={disabled}
        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-[transform,opacity] duration-200 hover:scale-[1.02] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transform-none motion-reduce:transition-none"
      >
        {zh ? "+ 添加任务" : "+ Add Task"}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800">
      <fieldset disabled={disabled || submitting} className="grid gap-3 md:grid-cols-[1.5fr_1fr_0.8fr_0.7fr_1fr_auto]">
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder={zh ? "任务名称" : "Task title"} required className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600" />
        <select value={projectId} onChange={(event) => setProjectId(event.target.value)} required className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600">
          {projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}
        </select>
        <select value={priority} onChange={(event) => setPriority(event.target.value)} className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600">
          <option value="LOW">{zh ? "低" : "Low"}</option>
          <option value="MEDIUM">{zh ? "中" : "Medium"}</option>
          <option value="HIGH">{zh ? "高" : "High"}</option>
        </select>
        <input type="number" min={0} value={estimated} onChange={(event) => setEstimated(Number(event.target.value))} className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600" />
        <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600" />
        <div className="flex gap-2">
          <button type="button" onClick={() => setOpen(false)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold dark:border-slate-600">{zh ? "取消" : "Cancel"}</button>
          <button type="submit" disabled={!title.trim() || !projectId || submitting} className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{zh ? "保存" : "Save"}</button>
        </div>
      </fieldset>
    </form>
  );
}
