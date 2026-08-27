"use client";

import { useEffect, useState } from "react";
import type {
  Language,
  Priority,
  Project,
  TaskStatus,
} from "@/types";
import {
  getMessages,
  priorityLabels,
} from "@/lib/translations";

interface Props {
  projects: Project[];
  language: Language;
  defaultProjectId: string;
  onAdd: (task: {
    title: string;
    projectId: string;
    phaseId: string;
    status: TaskStatus;
    priority: Priority;
    estimated: number;
    dueDate?: string;
  }) => void;
}

export default function AddTaskForm({
  projects,
  language,
  defaultProjectId,
  onAdd,
}: Props) {
  const t = getMessages(language);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState(
    defaultProjectId || ""
  );
  const [priority, setPriority] =
    useState<Priority>("medium");
  const [estimated, setestimated] =
    useState(1);
  const [dueDate, setDueDate] = useState("");

  // 数据库项目异步加载完成后，自动选择第一个项目
  useEffect(() => {
    if (
      projects.length > 0 &&
      !projects.some((project) => project.id === projectId)
    ) {
      setProjectId(defaultProjectId || projects[0].id);
    }
  }, [projects, projectId, defaultProjectId]);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanTitle = title.trim();

    if (!cleanTitle || !projectId) {
      return;
    }

    onAdd({
      title: cleanTitle,
      projectId,
      phaseId: "",
      status: "TODO",
      priority,
      estimated,
      dueDate: dueDate || undefined,
    });

    setTitle("");
    setPriority("medium");
    setestimated(1);
    setDueDate("");
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm"
      >
        + {t.addTask}
      </button>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-3 rounded-2xl border bg-white p-4 shadow-sm md:grid-cols-6 dark:border-slate-700 dark:bg-slate-800"
    >
      <input
        autoFocus
        required
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder={t.taskTitle}
        className="rounded-lg border px-3 py-2 md:col-span-2 dark:border-slate-600 dark:bg-slate-900"
      />

      <select
        required
        value={projectId}
        onChange={(event) => setProjectId(event.target.value)}
        className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
      >
        <option value="" disabled>
          Select project
        </option>

        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.title}
          </option>
        ))}
      </select>

      <select
        value={priority}
        onChange={(event) =>
          setPriority(event.target.value as Priority)
        }
        className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
      >
        {(
          ["high", "medium", "low"] as Priority[]
        ).map((item) => (
          <option key={item} value={item}>
            {priorityLabels[language][item]}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="0.5"
        step="0.5"
        value={estimated}
        onChange={(event) =>
          setestimated(Number(event.target.value))
        }
        className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
      />

      <input
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
        className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
      />

      <div className="flex gap-2 md:col-span-6 md:justify-end">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg border px-4 py-2"
        >
          {t.cancel}
        </button>

        <button
          type="submit"
          disabled={!projectId}
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t.save}
        </button>
      </div>
    </form>
  );
}