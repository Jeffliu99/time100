"use client";

import { useState } from "react";
import type { Language } from "@/types";
import { getMessages } from "@/lib/translations";

interface ProgressItem {
  project: {
    id: string;
    title: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
  };
  progress: number;
  totalHours: number;
  completedHours: number;
  actualHours: number;
  taskCount: number;
}

export default function ProjectProgress({
  items,
  language,
}: {
  items: ProgressItem[];
  language: Language;
}) {
  const t = getMessages(language);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function completeProject(projectId: string) {
    try {
      setLoadingId(projectId);
      setError(null);

      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "DONE",
          progress: 100,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Failed to complete project");
      }

      window.location.reload();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Failed to complete project"
      );
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h2 className="text-xl font-bold">{t.progress}</h2>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {items.map((item) => {
          const completed = item.project.status === "DONE";
          const displayedProgress = completed ? 100 : item.progress;

          return (
            <article
              key={item.project.id}
              className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"
            >
              <div className="mb-2 flex items-start justify-between gap-3 text-sm font-semibold">
                <span className="min-w-0 truncate">{item.project.title}</span>
                <span className="shrink-0">{displayedProgress}%</span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className={`h-full rounded-full transition-all ${
                    completed ? "bg-emerald-600" : "bg-blue-600"
                  }`}
                  style={{ width: `${Math.min(Math.max(displayedProgress, 0), 100)}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-xs text-slate-500">
                  {item.actualHours}h / {item.totalHours}h · {item.taskCount} tasks
                </p>

                {completed ? (
                  <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                    {language === "zh" ? "✅ 已完成" : "✅ Completed"}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => void completeProject(item.project.id)}
                    disabled={loadingId === item.project.id}
                    className="shrink-0 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loadingId === item.project.id
                      ? language === "zh"
                        ? "处理中..."
                        : "Working..."
                      : language === "zh"
                        ? "🚀 完成项目"
                        : "🚀 Complete"}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
