"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import CreateFormShell from "@/components/ui/CreateFormShell";
import {
  createInputClass,
  createLabelClass,
} from "@/components/ui/create-form-styles";

type Props = {
  language: "en" | "zh";
  onCancel: () => void;
  onCreated?: () => void;
};

export default function AddProjectForm({
  language,
  onCancel,
  onCreated,
}: Props) {
  const zh = language === "zh";
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
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(
          result?.error ||
            (zh ? "创建项目失败。" : "Failed to create project."),
        );
      }

      setTitle("");
      setDescription("");
      onCreated?.();
      window.location.reload();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : zh
            ? "创建项目失败。"
            : "Failed to create project.",
      );
      setSubmitting(false);
    }
  }

  return (
    <CreateFormShell
      icon="📁"
      title={zh ? "创建项目" : "Create project"}
      description={zh ? "建立一个新的目标或阶段" : "Create a new goal or phase"}
      onSubmit={handleSubmit}
      busy={submitting}
      maxWidth="4xl"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="new-project-title" className={createLabelClass}>
            {zh ? "项目名称" : "Project title"}
          </label>
          <input
            id="new-project-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={zh ? "例如：完成 Time100 MVP" : "For example: Complete Time100 MVP"}
            autoFocus
            required
            maxLength={200}
            className={createInputClass}
          />
        </div>

        <div>
          <label htmlFor="new-project-description" className={createLabelClass}>
            {zh ? "项目说明（可选）" : "Project description (optional)"}
          </label>
          <input
            id="new-project-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder={zh ? "项目目标或完成标准" : "Goal or completion criteria"}
            maxLength={500}
            className={createInputClass}
          />
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-2xl border border-red-900 bg-red-950/50 p-3 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          disabled={submitting}
          onClick={onCancel}
        >
          {zh ? "取消" : "Cancel"}
        </Button>
        <Button
          type="submit"
          loading={submitting}
          loadingText={zh ? "正在保存..." : "Saving..."}
          disabled={!title.trim()}
        >
          {zh ? "保存项目" : "Save project"}
        </Button>
      </div>
    </CreateFormShell>
  );
}
