import type { GuideCopy } from "./guide-copy";
import SectionHeader from "./SectionHeader";

export default function WorkflowSteps({ copy }: { copy: GuideCopy["workflow"] }) {
  return (
    
    <div className="mt-7">
    <section className="mt-14 mb-12">
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {copy.steps.map((step, index) => (
          <article key={step.title} className="relative rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
            <div className="flex items-center justify-between">
              <span className="text-3xl" aria-hidden="true">{step.icon}</span>
              <span className="text-xs font-black tracking-widest text-slate-500">0{index + 1}</span>
            </div>
            <h3 className="mt-5 text-lg font-black text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{step.text}</p>
            {index < copy.steps.length - 1 && (
              <span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-xl text-blue-400 lg:block">→</span>
            )}
          </article>
        ))}
      </div>
    </section>
  </div>
  );
}
