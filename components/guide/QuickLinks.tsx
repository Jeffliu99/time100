import Link from "next/link";
import type { GuideCopy } from "./guide-copy";
import SectionHeader from "./SectionHeader";

export default function QuickLinks({ copy }: { copy: GuideCopy["links"] }) {
  return (
     <div className="mt-7">
    <section className="mt-14">
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title} />
      <nav className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {copy.items.map((item) => (
          <Link key={item.href} href={item.href} className="flex min-h-16 items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/70 px-5 font-bold text-slate-100 transition hover:border-blue-500/50 hover:bg-slate-800">
            <span className="flex items-center gap-3"><span aria-hidden="true">{item.icon}</span>{item.label}</span>
            <span aria-hidden="true" className="text-blue-300">→</span>
          </Link>
        ))}
      </nav>
    </section>
    </div>
  );
}
