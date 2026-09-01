"use client";

import { Button } from "@/components/ui/Button";
import CreateFormShell from "@/components/ui/CreateFormShell";
import FormField from "./FormField";
import TaskFields from "./TaskFields";
import PrioritySelector from "./PrioritySelector";
import DueDateSelector from "./DueDateSelector";
import FormActions from "./FormActions";
import { inputClass } from "./styles";
import type { AddTaskFormProps } from "./types";
import { useAddTaskForm } from "./useAddTaskForm";

export default function AddTaskForm(props: AddTaskFormProps) {
  const form = useAddTaskForm(props);
  const zh = props.language === "zh";

  if (!form.open) {
    if (props.showTrigger === false) return null;

    return (
      <Button
        type="button"
        disabled={props.disabled || props.projects.length === 0}
        onClick={() => form.setOpen(true)}
      >
        {zh ? "+ 添加任务" : "+ Add Task"}
      </Button>
    );
  }

  return (
    <CreateFormShell
      icon="✅"
      title={zh ? "创建任务" : "Create task"}
      description={zh ? "为项目添加一个清晰的行动步骤" : "Add a clear action step to a project"}
      onSubmit={form.submit}
      busy={Boolean(props.disabled || form.submitting)}
      maxWidth="5xl"
    >
      <TaskFields
        language={props.language}
        projects={props.projects}
        title={form.title}
        description={form.description}
        projectId={form.projectId}
        onTitleChange={form.setTitle}
        onDescriptionChange={form.setDescription}
        onProjectChange={form.setProjectId}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <PrioritySelector
          value={form.priority}
          language={props.language}
          onChange={form.setPriority}
        />

        <FormField
          label={zh ? "预计时间（小时）" : "Estimated time (hours)"}
          htmlFor="new-task-estimated"
        >
          <input
            id="new-task-estimated"
            type="number"
            min={0.5}
            step={0.5}
            value={form.estimated}
            onChange={(event) => form.setEstimated(Number(event.target.value))}
            required
            className={inputClass}
          />
        </FormField>
      </div>

      <DueDateSelector
        value={form.dueDate}
        preset={form.datePreset}
        language={props.language}
        onChange={form.setDate}
      />

      {form.error && (
        <p
          role="alert"
          className="rounded-2xl border border-red-900 bg-red-950/50 p-3 text-sm text-red-300"
        >
          {form.error}
        </p>
      )}

      <FormActions
        language={props.language}
        submitting={form.submitting}
        canSubmit={Boolean(
          form.title.trim() && form.projectId && form.estimated >= 0.5,
        )}
        onCancel={form.close}
      />
    </CreateFormShell>
  );
}
