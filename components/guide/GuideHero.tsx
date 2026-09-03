import Link from "next/link";
import type { GuideCopy } from "./guide-copy";

export default function GuideHero({ copy }: { copy: GuideCopy["hero"] }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-blue-500/25 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/70 p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10">
      <div className="max-w-4xl">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">
          {copy.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
          {copy.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
          {copy.description}
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-500">
            {copy.dashboard} →
          </Link>
          <Link href="/companion" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-600 bg-slate-900/70 px-5 text-sm font-bold text-slate-100 transition hover:bg-slate-800">
            {copy.companion} →
          </Link>
        </div>
      </div>
    </section>
  );
}
