"use client";

import { useCallback, useState } from "react";
import AddProjectForm from "@/components/projects/AddProjectForm";
import AddTaskForm from "@/components/tasks/AddTaskForm";
import type { Language, Project, TaskCreateInput } from "@/types";
import CreateOptions from "./CreateOptions";
import DesktopCreateMenu from "./DesktopCreateMenu";
import type { CreateType } from "./types";

interface Props {
  language: Language;
  projects: Project[];
  defaultProjectId: string;
  onAddTask: (input: TaskCreateInput) => Promise<unknown> | unknown;
  mode?: "desktop" | "embedded";
  onFinished?: () => void;
}

export default function CreateFlow({
  language,
  projects,
  defaultProjectId,
  onAddTask,
  mode = "desktop",
  onFinished,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<CreateType | null>(null);
  const canCreateTask = projects.length > 0;

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const finish = useCallback(() => {
    setMenuOpen(false);
    setActiveForm(null);
    onFinished?.();
  }, [onFinished]);

  function select(type: CreateType) {
    setMenuOpen(false);
    setActiveForm(type);
  }

  if (activeForm === "project") {
    return (
      <AddProjectForm
        language={language}
        onCancel={finish}
        onCreated={finish}
      />
    );
  }

  if (activeForm === "task") {
    return (
      <AddTaskForm
        projects={projects}
        language={language}
        defaultProjectId={defaultProjectId}
        disabled={!canCreateTask}
        onAdd={onAddTask}
        initiallyOpen
        showTrigger={false}
        onClose={finish}
      />
    );
  }

  if (mode === "embedded") {
    return (
      <section className="text-white">
        <div className="mb-4">
          <h2 className="text-xl font-extrabold">
            ✨ {language === "zh" ? "创建" : "Create"}
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            {language === "zh"
              ? "选择要创建的内容"
              : "Choose what you want to create"}
          </p>
        </div>

        <CreateOptions
          language={language}
          canCreateTask={canCreateTask}
          onSelect={select}
        />
      </section>
    );
  }

  return (
    <section className="mt-6">
      <DesktopCreateMenu
        open={menuOpen}
        language={language}
        canCreateTask={canCreateTask}
        onToggle={() => setMenuOpen((value) => !value)}
        onClose={closeMenu}
        onSelect={select}
      />
    </section>
  );
}
