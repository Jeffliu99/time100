"use client";

import { useState } from "react";
import TaskColumn from "@/components/tasks/TaskColumn";
import type {
  Language,
  Project,
  Task,
  TaskStatus,
  TaskUpdateInput,
} from "@/types";

interface Props {
  projects: Project[];
  language: Language;
  sortedByStatus: (status: TaskStatus) => Task[];
  onMove: (id: string, status: TaskStatus) => Promise<void> | void;
  onUpdate: (id: string, changes: TaskUpdateInput) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
  onReorder: (draggedId: string, targetId: string) => void;
}

const statuses: TaskStatus[] = ["TODO", "DOING", "DONE"];

export default function TaskBoard({
  projects,
  language,
  sortedByStatus,
  onMove,
  onUpdate,
  onDelete,
  onReorder,
}: Props) {
  const [draggedId, setDraggedId] = useState<string | null>(null);

  return (
    <section className="mt-7 grid gap-5 lg:grid-cols-3">
      {statuses.map((status) => (
        <TaskColumn
          key={status}
          status={status}
          tasks={sortedByStatus(status)}
          projects={projects}
          language={language}
          draggedId={draggedId}
          setDraggedId={setDraggedId}
          onMove={onMove}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onReorder={(draggedTaskId, targetTaskId) => {
            onReorder(draggedTaskId, targetTaskId);
            setDraggedId(null);
          }}
        />
      ))}
    </section>
  );
}
