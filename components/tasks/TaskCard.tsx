"use client";

import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type {
  Language,
  Priority,
  Project,
  Task,
  TaskStatus,
  TaskUpdateInput,
} from "@/types";
import { getMessages, priorityLabels } from "@/lib/translations";

interface Props {
  task: Task;
  projects: Project[];
  language: Language;
  onMove: (status: TaskStatus) => Promise<void> | void;
  onUpdate: (changes: TaskUpdateInput) => Promise<void> | void;
  onDelete: () => Promise<void> | void;
  onDragStart: () => void;
  onDrop: () => void;
}

const priorityStyle: Record<Priority, string> = {
  HIGH: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  MEDIUM: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  LOW: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
};

export default function TaskCard({
  task,
  projects,
  language,
  onMove,
  onUpdate,
  onDelete,
  onDragStart,
  onDrop,
}: Props) {
  const t = getMessages(language);
  const project = projects.find((item) => item.id === task.projectId);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState<Priority>(task.priority);
  const [editEstimated, setEditEstimated] = useState(task.estimated);
  const [editDueDate, setEditDueDate] = useState<Date | null>(
    task.dueDate ? new Date(task.dueDate) : null
  );
  const titleRef = useRef<HTMLInputElement>(null);
  const estimatedRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editing) return;
    const timer = window.setTimeout(() => {
      titleRef.current?.focus();
      titleRef.current?.select();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [editing]);

  function resetDraft() {
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setEditEstimated(task.estimated);
    setEditDueDate(task.dueDate ? new Date(task.dueDate) : null);
  }

  function startEditing() {
    resetDraft();
    setEditing(true);
  }

  function handleCancel() {
    resetDraft();
    setEditing(false);
  }

  async function handleSave() {
    const title = editTitle.trim();
    if (!title || saving) return;

    setSaving(true);
    try {
      await onUpdate({
        title,
        priority: editPriority,
        estimated: editEstimated,
        dueDate: editDueDate ? editDueDate.toISOString() : null,
      });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    function handleEditingShortcuts(event: KeyboardEvent) {
      if (!editing) return;

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "s"
      ) {
        event.preventDefault();
        void handleSave();
      }

      if (event.key === "Escape") {
        event.preventDefault();
        handleCancel();
      }
    }

    window.addEventListener("keydown", handleEditingShortcuts);
    return () => window.removeEventListener("keydown", handleEditingShortcuts);
  });

  if (editing) {
    return (
      <article className="rounded-2xl border border-blue-300 bg-white p-4 shadow-sm dark:border-blue-700 dark:bg-slate-800">
        <div className="grid gap-3">
          <input
            ref={titleRef}
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                estimatedRef.current?.focus();
                estimatedRef.current?.select();
              }
            }}
            className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
          />

          <select
            value={editPriority}
            onChange={(event) =>
              setEditPriority(event.target.value as Priority)
            }
            className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
          >
            {(["HIGH", "MEDIUM", "LOW"] as Priority[]).map((priority) => (
              <option key={priority} value={priority}>
                {priorityLabels[language][priority]}
              </option>
            ))}
          </select>

          <input
            ref={estimatedRef}
            type="number"
            min="0"
            step="0.5"
            value={editEstimated}
            onChange={(event) => setEditEstimated(Number(event.target.value))}
            onKeyDown={(event) => {
              if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault();
                titleRef.current?.focus();
                titleRef.current?.select();
              }
            }}
            className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
          />

          <DatePicker
            selected={editDueDate}
            onChange={(date: Date | null) => setEditDueDate(date)}
            dateFormat={language === "en" ? "yyyy-MM-dd" : "yyyy年MM月dd日"}
            placeholderText={language === "en" ? "Select date" : "选择日期"}
            className="w-full rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={saving || !editTitle.trim()}
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
            >
              {saving ? "Saving..." : t.save}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border px-3 py-1.5 text-xs font-semibold"
            >
              {t.cancel}
            </button>
          </div>
        </div>
      </article>
    );
  }

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
        <span className="rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-700">
          {project?.title}
        </span>
        <span>{t.estimated}: {task.estimated}h</span>
        {task.dueDate && (
          <span>
            {new Intl.DateTimeFormat(language === "en" ? "en-CA" : "zh-CN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(new Date(task.dueDate))}
          </span>
        )}
      </div>

      <label className="mt-4 block text-xs text-slate-500 dark:text-slate-400">
        {t.actual}
        <input
          type="number"
          min="0"
          step="0.5"
          value={task.actual}
          onChange={(event) =>
            void onUpdate({ actual: Number(event.target.value) })
          }
          className="mt-1 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 dark:border-slate-600"
        />
      </label>

      <div className="mt-4 flex flex-wrap gap-2">
        {task.status !== "TODO" && (
          <button
            type="button"
            onClick={() => void onMove(task.status === "DONE" ? "DOING" : "TODO")}
            className="rounded-lg border px-3 py-1.5 text-xs font-semibold"
          >
            {t.moveBack}
          </button>
        )}
        {task.status === "TODO" && (
          <button
            type="button"
            onClick={() => void onMove("DOING")}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white"
          >
            {t.start}
          </button>
        )}
        {task.status === "DOING" && (
          <button
            type="button"
            onClick={() => void onMove("DONE")}
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white"
          >
            {t.finish}
          </button>
        )}
        <button
          type="button"
          onClick={startEditing}
          className="rounded-lg border px-3 py-1.5 text-xs font-semibold"
        >
          {language === "en" ? "Edit" : "编辑"}
        </button>
        <button
          type="button"
          onClick={() => void onDelete()}
          className="ml-auto rounded-lg px-2 py-1.5 text-xs font-semibold text-red-600"
        >
          {t.delete}
        </button>
      </div>
    </article>
  );
}
