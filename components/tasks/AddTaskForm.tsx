"use client";

import { type FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Language, Priority, Project, TaskCreateInput } from "@/types";

interface Props {
  projects: Project[];
  language: Language;
  defaultProjectId: string;
  disabled?: boolean;
  onAdd: (input: TaskCreateInput) => Promise<unknown> | unknown;
}

type DatePreset = "today" | "tomorrow" | "custom" | null;

const priorities = [
  { value: "LOW", icon: "🌱", en: "Low", zh: "低", variant: "priorityLow" },
  { value: "MEDIUM", icon: "✨", en: "Medium", zh: "中", variant: "priorityMedium" },
  { value: "HIGH", icon: "🔥", en: "High", zh: "高", variant: "priorityHigh" },
] as const;

function localDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function AddTaskForm({
  projects,
  language,
  defaultProjectId,
  disabled = false,
  onAdd,
}: Props) {
  const zh = language === "zh";
  const getDefaultProjectId = () =>
    projects.some((project) => project.id === defaultProjectId)
      ? defaultProjectId
      : projects[0]?.id || "";

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState(getDefaultProjectId);
  const [priority, setPriority] = useState<Priority>("MEDIUM");
  const [estimated, setEstimated] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [datePreset, setDatePreset] = useState<DatePreset>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!projects.some((project) => project.id === projectId)) {
      setProjectId(getDefaultProjectId());
    }
    if (disabled) setOpen(false);
  }, [projects, projectId, defaultProjectId, disabled]);

  function reset() {
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setEstimated(1);
    setDueDate("");
    setDatePreset(null);
    setError("");
  }

  function chooseToday() {
    setDueDate(localDateValue(new Date()));
    setDatePreset("today");
  }

  function chooseTomorrow() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    setDueDate(localDateValue(date));
    setDatePreset("tomorrow");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEstimated = Number(estimated);

    if (disabled || submitting || !title.trim() || !projectId) return;
    if (!Number.isFinite(normalizedEstimated) || normalizedEstimated < 0.5) {
      setError(zh ? "预计时间至少为 0.5 小时。" : "Estimated time must be at least 0.5 hours.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await onAdd({
        title: title.trim(),
        description: description.trim() || null,
        projectId,
        status: "TODO",
        priority,
        estimated: normalizedEstimated,
        dueDate: dueDate ? `${dueDate}T12:00:00` : null,
      });
      reset();
      setOpen(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : zh ? "添加任务失败。" : "Failed to add task.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button disabled={disabled || projects.length === 0} onClick={() => setOpen(true)}>
        {zh ? "+ 添加任务" : "+ Add Task"}
      </Button>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-700 bg-slate-800/90 p-4 shadow-lg">
      <fieldset disabled={disabled || submitting} aria-busy={submitting} className="space-y-5">
        <div className="grid gap-4 lg:grid-cols-2">
          <Field label={zh ? "任务名称" : "Task title"} htmlFor="new-task-title">
            <input id="new-task-title" value={title} onChange={(event) => setTitle(event.target.value)} required autoFocus maxLength={200} placeholder={zh ? "要完成什么？" : "What needs to be done?"} className={inputClass} />
          </Field>
          <Field label={zh ? "项目" : "Project"} htmlFor="new-task-project">
            <select id="new-task-project" value={projectId} onChange={(event) => setProjectId(event.target.value)} required className={inputClass}>
              {projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}
            </select>
          </Field>
        </div>

        <Field label={zh ? "任务详情" : "Task details"} htmlFor="new-task-description">
          <textarea id="new-task-description" value={description} onChange={(event) => setDescription(event.target.value)} rows={3} placeholder={zh ? "补充步骤、说明或完成标准" : "Add steps, notes, or completion criteria"} className={inputClass} />
        </Field>

        <fieldset>
          <legend className={legendClass}>{zh ? "优先级" : "Priority"}</legend>
          <div className="flex flex-wrap gap-2">
            {priorities.map((item) => (
              <Button key={item.value} variant={item.variant} pressed={priority === item.value} onClick={() => setPriority(item.value)}>
                {item.icon} {zh ? item.zh : item.en}
              </Button>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 lg:grid-cols-2">
          <fieldset>
            <legend className={legendClass}>{zh ? "截止日期" : "Due date"}</legend>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" pressed={datePreset === "today"} onClick={chooseToday}>📅 {zh ? "今天" : "Today"}</Button>
              <Button variant="secondary" pressed={datePreset === "tomorrow"} onClick={chooseTomorrow}>🌅 {zh ? "明天" : "Tomorrow"}</Button>
              <label className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-slate-600 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-300 focus-within:ring-2 focus-within:ring-blue-400/70">
                📆 {zh ? "其他日期" : "Other date"}
                <input type="date" value={dueDate} onChange={(event) => { setDueDate(event.target.value); setDatePreset("custom"); }} className="sr-only" />
              </label>
              {dueDate && <Button variant="ghost" size="sm" onClick={() => { setDueDate(""); setDatePreset(null); }}>{zh ? "清除" : "Clear"}</Button>}
            </div>
            {dueDate && <p className="mt-2 text-xs text-slate-400">{zh ? "已选择：" : "Selected: "}{dueDate}</p>}
          </fieldset>

          <Field label={zh ? "预计时间（小时）" : "Estimated time (hours)"} htmlFor="new-task-estimated">
            <input id="new-task-estimated" type="number" min={0.5} step={0.5} value={estimated} onChange={(event) => setEstimated(Number(event.target.value))} required className={inputClass} />
          </Field>
        </div>

        {error && <p role="alert" className="rounded-2xl border border-red-900 bg-red-950/50 p-3 text-sm text-red-300">{error}</p>}

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" disabled={submitting} onClick={() => { reset(); setOpen(false); }}>{zh ? "取消" : "Cancel"}</Button>
          <Button type="submit" loading={submitting} loadingText={zh ? "正在保存..." : "Saving..."} disabled={!title.trim() || !projectId || estimated < 0.5}>
            {zh ? "保存任务" : "Save Task"}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}

const inputClass = "min-h-11 w-full rounded-2xl border border-slate-600 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30";
const legendClass = "mb-2 text-sm font-semibold text-slate-200";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return <div><label htmlFor={htmlFor} className={legendClass}>{label}</label>{children}</div>;
}
