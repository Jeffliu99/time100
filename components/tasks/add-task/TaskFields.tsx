"use client";

import type { Language, Project } from "@/types";
import FormField from "./FormField";
import { inputClass } from "./styles";

interface Props {
  language: Language;
  projects: Project[];
  title: string;
  description: string;
  projectId: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onProjectChange: (value: string) => void;
}

export default function TaskFields(props: Props) {
  const zh = props.language === "zh";

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        <FormField label={zh ? "任务名称" : "Task title"} htmlFor="new-task-title">
          <input
            id="new-task-title"
            value={props.title}
            onChange={(event) => props.onTitleChange(event.target.value)}
            required
            autoFocus
            maxLength={200}
            placeholder={zh ? "要完成什么？" : "What needs to be done?"}
            className={inputClass}
          />
        </FormField>

        <FormField label={zh ? "项目" : "Project"} htmlFor="new-task-project">
          <select
            id="new-task-project"
            value={props.projectId}
            onChange={(event) => props.onProjectChange(event.target.value)}
            required
            className={inputClass}
          >
            {props.projects.map((project) => (
              <option key={project.id} value={project.id}>{project.title}</option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label={zh ? "任务详情" : "Task details"} htmlFor="new-task-description">
        <textarea
          id="new-task-description"
          value={props.description}
          onChange={(event) => props.onDescriptionChange(event.target.value)}
          rows={3}
          placeholder={zh ? "补充步骤、说明或完成标准" : "Add steps, notes, or completion criteria"}
          className={inputClass}
        />
      </FormField>
    </>
  );
}
