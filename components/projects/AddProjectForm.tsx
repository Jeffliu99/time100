"use client";

import { FormEvent, useState } from "react";

type Props = {
  language: "en" | "zh";
  onCancel: () => void;
  onCreated?: () => void;
};

export default function AddProjectForm({ language, onCancel, onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), description: description.trim() || null }),
      });

      if (!response.ok) throw new Error("Failed to create project");

      setTitle("");
      setDescription("");
      onCreated?.();
      window.location.reload();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Failed to create project");
      setSubmitting(false);
    }
  }

  const zh = language === "zh";

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <div className="grid gap-3 sm:grid-cols-[1fr_1.4fr_auto]">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder={zh ? "项目名称" : "Project title"}
          autoFocus
          required
          className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm dark:border-slate-700"
        />
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder={zh ? "项目说明（可选）" : "Project description (optional)"}
          className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm dark:border-slate-700"
        />
        <div className="flex gap-2">
          <button type="button" onClick={onCancel} disabled={submitting} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold disabled:opacity-50 dark:border-slate-700">
            {zh ? "取消" : "Cancel"}
          </button>
          <button type="submit" disabled={!title.trim() || submitting} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
            {submitting ? (zh ? "保存中..." : "Saving...") : zh ? "保存" : "Save"}
          </button>
        </div>
      </div>
      {error ? <p role="alert" className="mt-2 text-sm text-red-500">{error}</p> : null}
    </form>
  );
}
