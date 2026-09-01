"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import CreateCenter from "@/components/dashboard/CreateCenter";
import TaskBoard from "@/components/dashboard/TaskBoard";
import ProjectProgressSection from "@/components/dashboard/ProjectProgressSection";
import AddProjectForm from "@/components/projects/AddProjectForm";
import AddTaskForm from "@/components/tasks/AddTaskForm";
import MobileAppShell from "@/components/mobile/MobileAppShell";
import { useTime100 } from "@/hooks/useTime100";
import { getMessages } from "@/lib/translations";

export default function Time100Dashboard() {
  const app = useTime100();
  const t = getMessages(app.preferences.language);
  const openTasks = app.tasks.filter((task) => task.status !== "DONE").length;
  const completed = app.tasks.filter((task) => task.status === "DONE").length;
  const totalEstimated = app.tasks.reduce((sum, task) => sum + task.estimated, 0);
  const totalActual = app.tasks.reduce((sum, task) => sum + task.actual, 0);

  if (!app.ready) {
    return <main className="min-h-screen bg-slate-950 p-10 text-white">Loading Time100...</main>;
  }

  const desktopHeader = (
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
    />
  );

  return (
    <main className="dark">
      <MobileAppShell language={app.preferences.language} desktopHeader={desktopHeader}>
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8">
          <DashboardStats
            items={[
              { label: t.projects, value: app.projects.length },
              { label: t.openTasks, value: openTasks },
              { label: t.completed, value: completed },
              { label: t.remaining, value: `${Math.max(totalEstimated - totalActual, 0)}h` },
            ]}
          />

          <CreateCenter
            language={app.preferences.language}
            canCreateTask={app.projects.length > 0}
            renderProjectForm={(close: () => void) => (
              <AddProjectForm language={app.preferences.language} onCancel={close} />
            )}
            renderTaskForm={(close: () => void) => (
              <AddTaskForm
                projects={app.projects}
                language={app.preferences.language}
                defaultProjectId={app.projects[0]?.id ?? ""}
                disabled={app.projects.length === 0}
                onAdd={app.addTask}
                initiallyOpen
                showTrigger={false}
                onClose={close}
              />
            )}
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
      </MobileAppShell>
    </main>
  );
}
