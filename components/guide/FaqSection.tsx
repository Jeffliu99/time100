import type { GuideCopy } from "./guide-copy";
import SectionHeader from "./SectionHeader";

export default function FaqSection({ copy }: { copy: GuideCopy["faq"] }) {
  return (
     <div className="mt-7">
    <section className="mt-14">
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title} />
      <div className="mt-7 space-y-3">
        {copy.items.map((item) => (
          <details key={item.question} className="group rounded-2xl border border-slate-700 bg-slate-900/70 p-5 open:border-blue-500/40">
            <summary className="cursor-pointer list-none pr-8 text-base font-bold text-white marker:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span aria-hidden="true" className="text-blue-300 transition-transform group-open:rotate-45">＋</span>
              </span>
            </summary>
            <p className="mt-4 max-w-4xl leading-7 text-slate-300">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
    </div>
  );
}
