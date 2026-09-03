import type { GuideCopy } from "./guide-copy";
import SectionHeader from "./SectionHeader";

export default function DailyRoutine({ copy }: { copy: GuideCopy["routine"] }) {
  return (
    <section className="mt-14 rounded-3xl border border-slate-700 bg-slate-900/50 p-5 sm:p-8">
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <ol className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {copy.items.map((item, index) => (
          <li key={item.title} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
            <div className="flex items-center justify-between">
              <span className="text-3xl" aria-hidden="true">{item.icon}</span>
              <span className="text-xs font-black text-slate-500">{index + 1}</span>
            </div>
            <h3 className="mt-4 text-lg font-black text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
