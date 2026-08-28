"use client";

import TaskCard from "./TaskCard";
import type {
  Language,
  Project,
  Task,
  TaskStatus,
  TaskUpdateInput,
} from "@/types";
import { statusLabels } from "@/lib/translations";

interface Props {
  status: TaskStatus;
  tasks: Task[];
  projects: Project[];
  language: Language;

  draggedId: string | null;
  setDraggedId: (id: string | null) => void;

  onMove: (
    id: string,
    status: TaskStatus
  ) => Promise<void> | void;

  onUpdate: (
    id: string,
    changes: TaskUpdateInput
  ) => Promise<void> | void;

  onDelete: (
    id: string
  ) => Promise<void> | void;

  onReorder: (
    draggedId: string,
    targetId: string
  ) => void;
}

export default function TaskColumn({
  status,
  tasks,
  projects,
  language,
  draggedId,
  setDraggedId,
  onMove,
  onUpdate,
  onDelete,
  onReorder,
}: Props) {
  return (
    <section className="min-h-72 rounded-3xl bg-slate-100 p-4 dark:bg-slate-900/70">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">
          {statusLabels[language][status]}
        </h2>

        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold dark:bg-slate-800">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            projects={projects}
            language={language}
            onMove={(newStatus) =>
              onMove(task.id, newStatus)
            }
            onUpdate={(changes) =>
              onUpdate(task.id, changes)
            }
            onDelete={() =>
              onDelete(task.id)
            }
            onDragStart={() =>
              setDraggedId(task.id)
            }
            onDrop={() => {
              if (!draggedId) return;

              onReorder(
                draggedId,
                task.id
              );

              setDraggedId(null);
            }}
          />
        ))}
      </div>
    </section>
  );
}