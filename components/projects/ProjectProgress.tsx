"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import DeleteProjectDialog from "@/components/projects/DeleteProjectDialog";
import type { Language } from "@/types";
import type { ProjectProgressItem } from "@/lib/time100/project-progress";

type DialogState = {
  projectId: string;
  projectTitle: string;
  todoTaskCount: number;
} | null;

export default function ProjectProgress({
  items,
  language,
}: {
  items: ProjectProgressItem[];
  language: Language;
}) {
  const zh = language === "zh";
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<DialogState>(null);
  const [error, setError] = useState<string | null>(null);

  async function request(
    projectId: string,
    options: RequestInit,
    fallbackMessage: string,
  ) {
    setLoadingId(projectId);
    setError(null);

    try {
      const response = await fetch(`/api/projects/${projectId}`, options);
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || fallbackMessage);
      }

      window.location.reload();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : fallbackMessage,
      );
    } finally {
      setLoadingId(null);
    }
  }

  function completeProject(projectId: string) {
    return request(
      projectId,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "DONE", progress: 100 }),
      },
      zh ? "完成项目失败" : "Failed to complete project",
    );
  }

  async function deleteProject() {
    if (!deleteDialog) return;

    const { projectId } = deleteDialog;
    await request(
      projectId,
      { method: "DELETE" },
      zh ? "删除项目失败" : "Failed to delete project",
    );
    setDeleteDialog(null);
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h2 className="text-xl font-bold">
        {zh ? "阶段进度" : "Phase progress"}
      </h2>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300"
        >
          {error}
        </p>
      )}

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {items.map((item) => {
          const completed = item.project.status === "DONE";
          const displayedProgress = completed ? 100 : item.progress;
          const loading = loadingId === item.project.id;

          return (
            <article
              key={item.project.id}
              className={`rounded-2xl border p-4 ${
                completed
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-slate-200 dark:border-slate-700"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="min-w-0 truncate font-semibold">
                  {item.project.title}
                </h3>
                <span className="shrink-0 text-sm font-bold">
                  {displayedProgress}%
                </span>
              </div>

              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className={`h-full rounded-full transition-all ${
                    completed ? "bg-emerald-600" : "bg-blue-600"
                  }`}
                  style={{
                    width: `${Math.min(Math.max(displayedProgress, 0), 100)}%`,
                  }}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-900/60">
                  <p className="text-xs text-slate-500">
                    {zh ? "已完成任务" : "Completed tasks"}
                  </p>
                  <p className="mt-1 font-bold">
                    {item.completedTaskCount} / {item.taskCount}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-900/60">
                  <p className="text-xs text-slate-500">
                    {zh ? "剩余任务" : "Remaining tasks"}
                  </p>
                  <p className="mt-1 font-bold">
                    {item.remainingTaskCount}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                {zh ? "实际 / 预计：" : "Actual / estimated: "}
                {item.actualHours}h / {item.totalHours}h
              </p>

              {!completed && !item.canComplete && (
                <p className="mt-3 text-xs text-amber-600 dark:text-amber-300">
                  {item.taskCount === 0
                    ? zh
                      ? "请先添加并完成至少一个任务。"
                      : "Add and complete at least one task first."
                    : zh
                      ? `还需完成 ${item.remainingTaskCount} 个任务。`
                      : `${item.remainingTaskCount} task${item.remainingTaskCount === 1 ? "" : "s"} remaining.`}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {completed ? (
                  <span className="inline-flex min-h-9 items-center rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    ✓ {zh ? "已完成" : "Completed"}
                  </span>
                ) : (
                  <Button
                    variant={item.canComplete ? "success" : "secondary"}
                    size="sm"
                    loading={loading && item.canComplete}
                    loadingText={zh ? "处理中..." : "Working..."}
                    disabled={!item.canComplete || loading}
                    title={
                      item.canComplete
                        ? undefined
                        : zh
                          ? "请先完成项目中的所有任务"
                          : "Complete all project tasks first"
                    }
                    onClick={() => void completeProject(item.project.id)}
                  >
                    {item.canComplete
                      ? `🚀 ${zh ? "完成项目" : "Complete project"}`
                      : `🔒 ${zh ? "完成项目" : "Complete project"}`}
                  </Button>
                )}

                {!completed && (
                  <Button
                    variant={item.canDelete ? "danger" : "secondary"}
                    size="sm"
                    disabled={!item.canDelete || loading}
                    title={
                      item.canDelete
                        ? undefined
                        : zh
                          ? "项目包含进行中或已完成任务，不能删除"
                          : "Projects with active or completed tasks cannot be deleted"
                    }
                    onClick={() =>
                      setDeleteDialog({
                        projectId: item.project.id,
                        projectTitle: item.project.title,
                        todoTaskCount: item.taskCount,
                      })
                    }
                  >
                    {item.canDelete ? "🗑️" : "🔒"} {zh ? "删除项目" : "Delete project"}
                  </Button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <DeleteProjectDialog
        open={deleteDialog !== null}
        projectTitle={deleteDialog?.projectTitle ?? ""}
        todoTaskCount={deleteDialog?.todoTaskCount ?? 0}
        language={language}
        loading={deleteDialog ? loadingId === deleteDialog.projectId : false}
        onConfirm={deleteProject}
        onCancel={() => {
          if (!loadingId) setDeleteDialog(null);
        }}
      />
    </section>
  );
}
