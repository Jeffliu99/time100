"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function CreateCenter({
  language,
  canCreateTask,
  renderProjectForm,
  renderTaskForm,
}: any) {
  const zh = language === "zh";
  const isMobile = useIsMobile();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<"project" | "task" | null>(null);

  if (activeForm === "project") {
    return <section className="mt-6">{renderProjectForm(() => setActiveForm(null))}</section>;
  }

  if (activeForm === "task") {
    return <section className="mt-6">{renderTaskForm(() => setActiveForm(null))}</section>;
  }

  return (
    <section className="mt-6 mb-6">
      <div className="flex justify-start">
        <div className="relative">
          <Button
            type="button"
            className="w-auto px-5"
            onClick={() => setMenuOpen((v) => !v)}
          >
            ✨ {zh ? "创建" : "Create"}
          </Button>

          {menuOpen && !isMobile && (
            <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-slate-700 bg-slate-900 p-3 shadow-xl">
              <button
                className="mb-2 w-full rounded-xl p-3 text-left hover:bg-slate-800"
                onClick={() => {
                  setActiveForm("project");
                  setMenuOpen(false);
                }}
              >
                📁 {zh ? "新建项目" : "New Project"}
              </button>

              <button
                disabled={!canCreateTask}
                className="w-full rounded-xl p-3 text-left hover:bg-slate-800 disabled:opacity-40"
                onClick={() => {
                  setActiveForm("task");
                  setMenuOpen(false);
                }}
              >
                ✅ {zh ? "新建任务" : "New Task"}
              </button>
            </div>
          )}
        </div>
      </div>

      {menuOpen && isMobile && (
        <div className="fixed inset-0 z-[9999] bg-black/70">
          <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-slate-900 p-5">
            <button
              className="mb-3 block w-full rounded-xl p-4 text-left"
              onClick={() => {
                setActiveForm("project");
                setMenuOpen(false);
              }}
            >
              📁 {zh ? "新建项目" : "New Project"}
            </button>

            <button
              className="block w-full rounded-xl p-4 text-left"
              onClick={() => {
                setActiveForm("task");
                setMenuOpen(false);
              }}
            >
              ✅ {zh ? "新建任务" : "New Task"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
