"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { DueDatePicker } from "./DueDatePicker";

type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
type DatePreset = "today" | "tomorrow" | "custom" | null;

type Task = {
  id: string;
  title: string;
  description: string | null;
  priority: TaskPriority;
  dueDate: string | null;
};

type Props = {
  projectId: string;
  onCreated?: (task: Task) => void;
};

const priorityOptions = [
  { value: "LOW", label: "🌱 Low", variant: "priorityLow" },
  { value: "MEDIUM", label: "✨ Medium", variant: "priorityMedium" },
  { value: "HIGH", label: "🔥 High", variant: "priorityHigh" },
] as const;

export function TaskForm({ projectId, onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [datePreset, setDatePreset] = useState<DatePreset>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || saving) return;

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          title: title.trim(),
          description: description.trim() || null,
          priority,
          dueDate: dueDate ? `${dueDate}T12:00:00` : null,
        }),
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Failed to create task");

      onCreated?.(payload);
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setDueDate("");
      setDatePreset(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Failed to create task");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 text-white">
      <div>
        <label htmlFor="task-title" className="mb-2 block text-sm font-semibold text-slate-300">Task title</label>
        <input id="task-title" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={200} required className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30" />
      </div>

      <div>
        <label htmlFor="task-description" className="mb-2 block text-sm font-semibold text-slate-300">Details</label>
        <textarea id="task-description" value={description} onChange={(event) => setDescription(event.target.value)} rows={4} className="w-full resize-y rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30" />
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-slate-300">Priority</legend>
        <div className="flex flex-wrap gap-2">
          {priorityOptions.map((option) => (
            <Button key={option.value} variant={option.variant} pressed={priority === option.value} onClick={() => setPriority(option.value)}>{option.label}</Button>
          ))}
        </div>
      </fieldset>

      <DueDatePicker value={dueDate} onChange={setDueDate} preset={datePreset} onPresetChange={setDatePreset} />

      {error && <p role="alert" className="rounded-xl border border-red-900 bg-red-950/50 p-3 text-sm text-red-300">{error}</p>}

      <Button type="submit" size="lg" fullWidth loading={saving} loadingText="Saving..." disabled={!title.trim()}>Save Task</Button>
    </form>
  );
}
