import Link from "next/link";
import type { GuideCopy } from "./guide-copy";
import SectionHeader from "./SectionHeader";

export default function FeatureCards({ copy }: { copy: GuideCopy["features"] }) {
  return (
    <div className="mt-7">
    <section className="mt-14">
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <div className="mt-7 grid gap-5 lg:grid-cols-3">
        {copy.items.map((item) => (
          <article key={item.href} className="flex h-full flex-col rounded-3xl border border-slate-700 bg-slate-900/80 p-6 shadow-lg shadow-black/10">
            <span className="text-4xl" aria-hidden="true">{item.icon}</span>
            <h3 className="mt-5 text-2xl font-black text-white">{item.title}</h3>
            <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-400">
              {item.bullets.map((bullet) => <li key={bullet}>✓ {bullet}</li>)}
            </ul>
            <Link href={item.href} className="mt-7 inline-flex min-h-11 items-center font-bold text-blue-300 transition hover:text-blue-200">
              {item.action} →
            </Link>
          </article>
        ))}
      </div>
    </section>
    </div>
  );
}
