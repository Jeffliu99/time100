interface DashboardStatItem {
  label: string;
  value: string | number;
}

interface DashboardStatsProps {
  items: DashboardStatItem[];
}

export default function DashboardStats({ items }: DashboardStatsProps) {
  return (
    <section
      aria-label="Dashboard statistics"
      className="grid grid-cols-4 gap-2 sm:gap-3"
    >
      {items.map((item) => (
        <article
          key={item.label}
          className="flex min-h-[88px] min-w-0 flex-col items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/85 px-1.5 py-3 text-center shadow-sm sm:min-h-[108px] sm:px-3 sm:py-4"
        >
          <p
            className="w-full break-words text-[12px] font-bold leading-[1.25] text-slate-200 sm:text-sm md:text-base"
            title={item.label}
          >
            {item.label}
          </p>

          <p className="mt-2 text-2xl font-extrabold leading-none tracking-tight text-white sm:text-3xl">
            {item.value}
          </p>
        </article>
      ))}
    </section>
  );
}
