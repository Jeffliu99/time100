"use client";

import { type FormEvent, useEffect, useState } from "react";
import type { Priority } from "@/types";
import type { AddTaskFormProps, DatePreset } from "./types";

export function useAddTaskForm(props: AddTaskFormProps) {
  const {
    projects,
    language,
    defaultProjectId,
    disabled = false,
    initiallyOpen = false,
    onClose,
    onAdd,
  } = props;

  const getDefaultProjectId = () =>
    projects.some((project) => project.id === defaultProjectId)
      ? defaultProjectId
      : projects[0]?.id || "";

  const [open, setOpen] = useState(initiallyOpen);
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

  function close() {
    reset();
    setOpen(false);
    onClose?.();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEstimated = Number(estimated);

    if (disabled || submitting || !title.trim() || !projectId) return;
    if (!Number.isFinite(normalizedEstimated) || normalizedEstimated < 0.5) {
      setError(
        language === "zh"
          ? "预计时间至少为 0.5 小时。"
          : "Estimated time must be at least 0.5 hours.",
      );
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
      close();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : language === "zh" ? "添加任务失败。" : "Failed to add task.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return {
    open,
    setOpen,
    title,
    setTitle,
    description,
    setDescription,
    projectId,
    setProjectId,
    priority,
    setPriority,
    estimated,
    setEstimated,
    dueDate,
    datePreset,
    setDate(value: string, preset: DatePreset) {
      setDueDate(value);
      setDatePreset(preset);
    },
    submitting,
    error,
    close,
    submit,
  };
}
