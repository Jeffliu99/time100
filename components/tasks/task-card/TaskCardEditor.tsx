"use client";

import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/Button";
import type { Language, Priority, Task, TaskUpdateInput } from "@/types";
import { getMessages, priorityLabels } from "@/lib/translations";

type Props = {
  task: Task;
  language: Language;
  onSave: (changes: TaskUpdateInput) => Promise<void> | void;
  onCancel: () => void;
};

export function TaskCardEditor({ task, language, onSave, onCancel }: Props) {
  const t = getMessages(language);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [priority, setPriority] = useState<Priority>(task.priority);
  const [estimated, setEstimated] = useState(task.estimated);
  const [dueDate, setDueDate] = useState<Date | null>(
    task.dueDate ? new Date(task.dueDate) : null,
  );
  const [saving, setSaving] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
    titleRef.current?.select();
  }, []);

  async function save() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || saving) return;

    setSaving(true);
    try {
      await onSave({
        title: trimmedTitle,
        description: description.trim() || null,
        priority,
        estimated,
        dueDate: dueDate?.toISOString() ?? null,
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-3">
      <input
        ref={titleRef}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        aria-label={language === "en" ? "Task title" : "任务名称"}
        className="rounded-2xl border px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
      />

      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        aria-label={language === "en" ? "Task details" : "任务详情"}
        rows={3}
        className="rounded-2xl border px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
      />

      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value as Priority)}
        aria-label={language === "en" ? "Priority" : "优先级"}
        className="rounded-2xl border px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
      >
        {(["HIGH", "MEDIUM", "LOW"] as Priority[]).map((value) => (
          <option key={value} value={value}>
            {priorityLabels[language][value]}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="0"
        step="0.5"
        value={estimated}
        onChange={(event) => setEstimated(Number(event.target.value))}
        aria-label={language === "en" ? "Estimated hours" : "预计小时"}
        className="rounded-2xl border px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
      />

      <DatePicker
        selected={dueDate}
        onChange={setDueDate}
        dateFormat={language === "en" ? "yyyy-MM-dd" : "yyyy年MM月dd日"}
        placeholderText={language === "en" ? "Select date" : "选择日期"}
        className="w-full rounded-2xl border px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
      />

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          loading={saving}
          loadingText={language === "en" ? "Saving..." : "正在保存..."}
          disabled={!title.trim()}
          onClick={() => void save()}
        >
          {t.save}
        </Button>
        <Button variant="secondary" size="sm" disabled={saving} onClick={onCancel}>
          {t.cancel}
        </Button>
      </div>
    </div>
  );
}
