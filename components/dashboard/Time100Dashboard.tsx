"use client";

import { useState } from "react";
import AddTaskForm from "@/components/tasks/AddTaskForm";
import TaskColumn from "@/components/tasks/TaskColumn";
import ProjectProgress from "@/components/projects/ProjectProgress";
import { useTime100 } from "@/hooks/useTime100";
import { getMessages } from "@/lib/translations";
import type { TaskStatus } from "@/types";

export default function Time100Dashboard() {
  const app = useTime100();
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const t = getMessages(app.preferences.language);

  const statuses: TaskStatus[] = ["TODO", "DOING", "DONE"];

  const openTasks = app.tasks.filter(
    (task) => task.status !== "DONE"
  ).length;

  const completed = app.tasks.filter(
    (task) => task.status === "DONE"
  ).length;

  const totalEstimated = app.tasks.reduce(
    (sum, task) => sum + task.estimated,
    0
  );

  const totalActual = app.tasks.reduce(
    (sum, task) => sum + task.actual,
    0
  );

  if (!app.ready) {
    return (
      <main className="min-h-screen bg-slate-50 p-10">
        Loading Time100...
      </main>
    );
  }

  return (
    <main className={app.preferences.theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 text-slate-900 transition dark:bg-slate-950 dark:text-white">
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
            <div>
              <h1 className="text-3xl font-black tracking-tight">Time100</h1>
              <p className="text-sm text-slate-500">{t.slogan}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => void app.undo()}
                disabled={!app.canUndo}
                className="rounded-xl border px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              >
                {app.preferences.language === "zh" ? "撤销" : "Undo"}
              </button>

              <button
                type="button"
                onClick={() => void app.redo()}
                disabled={!app.canRedo}
                className="rounded-xl border px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              >
                {app.preferences.language === "zh" ? "重做" : "Redo"}
              </button>

              <button
                type="button"
                onClick={() =>
                  app.setPreferences({
                    ...app.preferences,
                    language:
                      app.preferences.language === "zh" ? "en" : "zh",
                  })
                }
                className="rounded-xl border px-3 py-2 text-sm font-semibold"
              >
                {app.preferences.language === "zh" ? "English" : "中文"}
              </button>

              <button
                type="button"
                onClick={() =>
                  app.setPreferences({
                    ...app.preferences,
                    theme:
                      app.preferences.theme === "light" ? "dark" : "light",
                  })
                }
                className="rounded-xl border px-3 py-2 text-sm font-semibold"
                aria-label={
                  app.preferences.theme === "light"
                    ? "Enable dark theme"
                    : "Enable light theme"
                }
              >
                {app.preferences.theme === "light" ? "◐" : "☀"}
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6 py-8">
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [t.projects, app.projects.length],
              [t.openTasks, openTasks],
              [t.completed, completed],
              [
                t.remaining,
                `${Math.max(totalEstimated - totalActual, 0)}h`,
              ],
            ].map(([label, value]) => (
              <div
                key={String(label)}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-black">{value}</p>
              </div>
            ))}
          </section>

          <div className="mt-7">
            <AddTaskForm
              projects={app.projects}
              language={app.preferences.language}
              defaultProjectId={app.preferences.defaultProjectId}
              onAdd={app.addTask}
            />
          </div>

          <section className="mt-7 grid gap-5 lg:grid-cols-3">
            {statuses.map((status) => (
              <TaskColumn
                key={status}
                status={status}
                tasks={app.sortedByStatus(status)}
                projects={app.projects}
                language={app.preferences.language}
                draggedId={draggedId}
                setDraggedId={setDraggedId}
                onMove={app.moveTask}
                onUpdate={app.updateTask}
                onDelete={app.deleteTask}
                onReorder={(draggedTaskId, targetTaskId) => {
                  app.reorderTask(draggedTaskId, targetTaskId);
                  setDraggedId(null);
                }}
              />
            ))}
          </section>

          <div className="mt-7">
            <ProjectProgress
              items={app.projectProgress}
              language={app.preferences.language}
            />
          </div>
        </div>
      </div>
    </main>
  );
}