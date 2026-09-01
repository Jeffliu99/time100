"use client";

import { useState } from "react";
import { TaskCardEditor } from "./task-card/TaskCardEditor";
import { TaskCardView } from "./task-card/TaskCardView";
import type { TaskCardProps } from "./task-card/types";

export default function TaskCard({
  task,
  projects,
  language,
  onMove,
  onUpdate,
  onDelete,
  onDragStart,
  onDrop,
}: TaskCardProps) {
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const project = projects.find((item) => item.id === task.projectId);

  async function move(status: Parameters<typeof onMove>[0]) {
    if (busy) return;
    setBusy(true);
    try {
      await onMove(status);
    } finally {
      setBusy(false);
    }
  }

  async function update(changes: Parameters<typeof onUpdate>[0]) {
    if (busy) return;
    setBusy(true);
    try {
      await onUpdate(changes);
      setEditing(false);
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (busy) return;
    setBusy(true);
    try {
      await onDelete();
    } finally {
      setBusy(false);
    }
  }

  return (
    <article
      draggable={!editing && !busy}
      onDragStart={onDragStart}
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
      aria-busy={busy || undefined}
      className={`rounded-2xl border p-4 shadow-sm transition ${
        task.status === "DONE"
          ? "border-emerald-500/30 bg-emerald-500/5"
          : editing
            ? "border-blue-300 bg-white dark:border-blue-700 dark:bg-slate-800"
            : "cursor-grab border-slate-200 bg-white hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing dark:border-slate-700 dark:bg-slate-800"
      }`}
    >
      {editing ? (
        <TaskCardEditor
          task={task}
          language={language}
          onSave={update}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <TaskCardView
          task={task}
          project={project}
          language={language}
          busy={busy}
          onMove={move}
          onDelete={remove}
          onEdit={() => setEditing(true)}
        />
      )}
    </article>
  );
}
