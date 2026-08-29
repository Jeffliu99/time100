"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import AddTaskSection from "@/components/dashboard/AddTaskSection";
import TaskBoard from "@/components/dashboard/TaskBoard";
import ProjectProgressSection from "@/components/dashboard/ProjectProgressSection";
import { useTime100 } from "@/hooks/useTime100";
import { getMessages } from "@/lib/translations";

export default function Time100Dashboard() {
  const app = useTime100();
  const t = getMessages(app.preferences.language);

  const openTasks = app.tasks.filter((task) => task.status !== "DONE").length;
  const completed = app.tasks.filter((task) => task.status === "DONE").length;
  const totalEstimated = app.tasks.reduce(
    (sum, task) => sum + task.estimated,
    0
  );
  const totalActual = app.tasks.reduce((sum, task) => sum + task.actual, 0);

  if (!app.ready) {
    return (
      <main className="min-h-screen bg-slate-50 p-10 dark:bg-slate-950 dark:text-white">
        Loading Time100...
      </main>
    );
  }

  return (
    <main className={app.preferences.theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 text-slate-900 transition dark:bg-slate-950 dark:text-white">
        <DashboardHeader
          preferences={app.preferences}
          slogan={t.slogan}
          canUndo={app.canUndo}
          canRedo={app.canRedo}
          onUndo={app.undo}
          onRedo={app.redo}
          onLanguageChange={(language) =>
            app.setPreferences({ ...app.preferences, language })
          }
          onThemeChange={(theme) =>
            app.setPreferences({ ...app.preferences, theme })
          }
        />

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <DashboardStats
            items={[
              { label: t.projects, value: app.projects.length },
              { label: t.openTasks, value: openTasks },
              { label: t.completed, value: completed },
              {
                label: t.remaining,
                value: `${Math.max(totalEstimated - totalActual, 0)}h`,
              },
            ]}
          />

          <AddTaskSection
            projects={app.projects}
            language={app.preferences.language}
            defaultProjectId={app.preferences.defaultProjectId}
            onAdd={app.addTask}
          />

          <TaskBoard
            projects={app.projects}
            language={app.preferences.language}
            sortedByStatus={app.sortedByStatus}
            onMove={app.moveTask}
            onUpdate={app.updateTask}
            onDelete={app.deleteTask}
            onReorder={app.reorderTask}
          />

          <ProjectProgressSection
            items={app.projectProgress}
            language={app.preferences.language}
          />
        </div>
      </div>
    </main>
  );
}
