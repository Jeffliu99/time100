"use client";

import DashboardStats from "@/components/dashboard/DashboardStats";
import TaskBoard from "@/components/dashboard/TaskBoard";
import ProjectProgressSection from "@/components/dashboard/ProjectProgressSection";
import CreateFlow from "@/components/dashboard/create-center/CreateFlow";
import { useTime100 } from "@/hooks/useTime100";
import { getMessages } from "@/lib/translations";

/**
 * Dashboard content only.
 * Header, footer and mobile navigation are supplied once by:
 * app/(protected)/layout.tsx -> AppShell
 */
export default function Time100Dashboard() {
  const app = useTime100();
  const language = app.preferences.language;
  const t = getMessages(language);

  const openTasks = app.tasks.filter((task) => task.status !== "DONE").length;
  const completedTasks = app.tasks.filter((task) => task.status === "DONE").length;
  const totalEstimated = app.tasks.reduce(
    (sum, task) => sum + task.estimated,
    0,
  );
  const totalActual = app.tasks.reduce(
    (sum, task) => sum + task.actual,
    0,
  );

  if (!app.ready) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-10 text-white sm:px-6">
        {language === "zh" ? "正在加载 Time100..." : "Loading Time100..."}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-8">
      <DashboardStats
        items={[
          { label: t.projects, value: app.projects.length },
          { label: t.openTasks, value: openTasks },
          { label: t.completed, value: completedTasks },
          {
            label: t.remaining,
            value: `${Math.max(totalEstimated - totalActual, 0)}h`,
          },
        ]}
      />

      {/*
       * Temporary responsive Create entry inside Dashboard content.
       * This keeps creation usable after AppShell moves to the parent layout.
       * Desktop uses the dropdown; mobile uses the embedded options.
       */}
      
      <div className="hidden md:block">
        <CreateFlow
          mode="desktop"
          language={language}
          projects={app.projects}
          defaultProjectId={app.projects[0]?.id ?? ""}
          onAddTask={app.addTask}
        />
      </div>

      <TaskBoard
        projects={app.projects}
        language={language}
        sortedByStatus={app.sortedByStatus}
        onMove={app.moveTask}
        onUpdate={app.updateTask}
        onDelete={app.deleteTask}
        onReorder={app.reorderTask}
      />

      <ProjectProgressSection
        items={app.projectProgress}
        language={language}
      />
    </div>
  );
}
