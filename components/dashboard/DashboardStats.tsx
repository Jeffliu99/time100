interface StatItem {
  label: string;
  value: string | number;
}

interface Props {
  items: StatItem[];
}

export default function DashboardStats({ items }: Props) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.label}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-700 dark:bg-slate-800"
        >
          <p className="text-sm text-slate-500">{item.label}</p>
          <p className="mt-2 text-2xl font-black sm:text-3xl">{item.value}</p>
        </article>
      ))}
    </section>
  );
}
