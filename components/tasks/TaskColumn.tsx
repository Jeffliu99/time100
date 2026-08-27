"use client";

import TaskCard from "./TaskCard";
import type { Language, Project, Task, TaskStatus } from "@/types";
import { statusLabels } from "@/lib/translations";

interface Props {
  status: TaskStatus;
  tasks: Task[];
  projects: Project[];
  language: Language;
  draggedId: string | null;
  setDraggedId: (id: string | null) => void;
  onMove: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  onHoursChange: (id: string, hours: number) => void;
  onReorder: (draggedId: string, targetId: string) => void;
}

export default function TaskColumn(props: Props) {
  return (
    <section className="min-h-72 rounded-3xl bg-slate-100 p-4 dark:bg-slate-900/70">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">{statusLabels[props.language][props.status]}</h2>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold dark:bg-slate-800">{props.tasks.length}</span>
      </div>
      <div className="space-y-3">
        {props.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            projects={props.projects}
            language={props.language}
            onMove={(status) => props.onMove(task.id, status)}
            onDelete={() => props.onDelete(task.id)}
            onHoursChange={(hours) => props.onHoursChange(task.id, hours)}
            onDragStart={() => props.setDraggedId(task.id)}
            onDrop={() => props.draggedId && props.onReorder(props.draggedId, task.id)}
          />
        ))}
      </div>
    </section>
  );
}
