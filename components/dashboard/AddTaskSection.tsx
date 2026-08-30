import AddTaskForm from "@/components/tasks/AddTaskForm";
import type { Language, Project, TaskCreateInput } from "@/types";

interface Props {
  projects: Project[];
  language: Language;
  defaultProjectId: string;
  onAdd: (input: TaskCreateInput) => Promise<unknown> | unknown;
}

export default function AddTaskSection({ projects, language, defaultProjectId, onAdd }: Props) {
  const hasProjects = projects.length > 0;
    <AddTaskForm
      projects={projects}
      language={language}
      defaultProjectId={defaultProjectId}
      onAdd={onAdd}
      disabled={!hasProjects}
    />

  return (
    <section className="mt-4">
      <AddTaskForm
        projects={projects}
        language={language}
        defaultProjectId={defaultProjectId}
        onAdd={onAdd}
        disabled={!hasProjects}
      />
      {!hasProjects ? (
        <p className="mt-2 text-sm text-slate-500">
          {language === "zh" ? "请先创建第一个项目，再添加任务。" : "Create your first project before adding tasks."}
        </p>
      ) : null}
    </section>
  );
}
