import ProjectProgress from "@/components/projects/ProjectProgress";
import type { Language } from "@/types";
import type { ProjectProgressItem } from "@/lib/time100/project-progress";

interface Props {
  items: ProjectProgressItem[];
  language: Language;
}

export default function ProjectProgressSection({
  items,
  language,
}: Props) {
  return (
    <section className="mt-7">
      <ProjectProgress items={items} language={language} />
    </section>
  );
}
