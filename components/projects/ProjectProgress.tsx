import type { Language } from "@/types";
import { getMessages } from "@/lib/translations";

interface ProgressItem {
  project: {
    id: string;
    title: string;
  };

  progress: number;
  totalHours: number;
  actual: number;
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

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h2 className="text-xl font-bold">
        {t.progress}
      </h2>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.project.id}>
            <div className="mb-2 flex justify-between text-sm font-semibold">
              <span>{item.project.title}</span>
              <span>{item.progress}%</span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{
                  width: `${item.progress}%`,
                }}
              />
            </div>

            <p className="mt-2 text-xs text-slate-500">
              {item.actual}h / {item.totalHours}h
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}