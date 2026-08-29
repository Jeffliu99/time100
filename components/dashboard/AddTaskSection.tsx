import AddTaskForm from "@/components/tasks/AddTaskForm";
import type { Language, Project, TaskCreateInput } from "@/types";

interface Props {
  projects: Project[];
  language: Language;
  defaultProjectId: string;
  onAdd: (input: TaskCreateInput) => Promise<unknown> | unknown;
}

export default function AddTaskSection({
  projects,
  language,
  defaultProjectId,
  onAdd,
}: Props) {
  return (
    <section className="mt-7">
      <AddTaskForm
        projects={projects}
        language={language}
        defaultProjectId={defaultProjectId}
        onAdd={onAdd}
      />
    </section>
  );
}
