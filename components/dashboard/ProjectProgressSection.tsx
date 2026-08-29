import ProjectProgress from "@/components/projects/ProjectProgress";
import type { Language, Project } from "@/types";

interface ProgressItem {
  project: Project;
  totalHours: number;
  completedHours: number;
  actualHours: number;
  progress: number;
  taskCount: number;
}

interface Props {
  items: ProgressItem[];
  language: Language;
}

export default function ProjectProgressSection({ items, language }: Props) {
  return (
    <section className="mt-7">
      <ProjectProgress items={items} language={language} />
    </section>
  );
}
