"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PublicFooter from "@/components/home/PublicFooter";
import PublicHeader from "@/components/home/PublicHeader";
import type { HomeLanguage } from "@/components/home/home-copy";
import { getAboutCopy } from "./about-copy";

export default function AboutLanding() {
  const { status } = useSession();
  const [language, setLanguage] = useState<HomeLanguage>("en");
  const copy = getAboutCopy(language);
  const primaryHref = status === "authenticated" ? "/dashboard" : "/login?mode=signup";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <PublicHeader language={language} onLanguageChange={setLanguage} />

      <main className="overflow-hidden">
        <section className="relative border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_25%_75%,rgba(139,92,246,0.12),transparent_36%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-300">
              {copy.hero.eyebrow}
            </p>
            <h1 className="mt-7 max-w-6xl text-5xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
              <span className="block text-slate-400">{copy.hero.titleLine1}</span>
              <span className="mt-3 block text-white">{copy.hero.titleLine2}</span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              {copy.hero.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={primaryHref} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 font-bold transition hover:bg-blue-500">
                {status === "authenticated" ? (language === "zh" ? "进入控制台" : "Go to Dashboard") : copy.hero.start} →
              </Link>
              <Link href="/guide" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-600 bg-slate-900/70 px-6 font-bold text-slate-100 transition hover:bg-slate-800">
                {copy.hero.guide}
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <SectionEyebrow>{copy.story.eyebrow}</SectionEyebrow>
          <div>
            <h2 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
              {copy.story.title}
            </h2>
            <div className="mt-8 max-w-3xl space-y-6 text-lg leading-8 text-slate-300">
              {copy.story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <blockquote className="mt-10 border-l-4 border-blue-500 pl-6 text-3xl font-black text-blue-200 sm:text-4xl">
              {copy.story.quote}
            </blockquote>
          </div>
        </section>

        <section className="border-y border-slate-800 bg-slate-900/30">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
            <SectionHeading eyebrow={copy.method.eyebrow} title={copy.method.title} description={copy.method.description} />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {copy.method.steps.map((step, index) => (
                <article key={step.title} className="relative rounded-3xl border border-slate-700 bg-slate-950/70 p-6 shadow-lg shadow-black/10">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl" aria-hidden="true">{step.icon}</span>
                    <span className="text-xs font-black tracking-widest text-slate-500">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-black">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{step.text}</p>
                  {index < copy.method.steps.length - 1 && <span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden text-xl text-blue-400 lg:block">→</span>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <SectionHeading eyebrow={copy.comparison.eyebrow} title={copy.comparison.title} />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <ComparisonPanel title={copy.comparison.traditionalTitle} items={copy.comparison.traditional} tone="muted" />
            <ComparisonPanel title={copy.comparison.time100Title} items={copy.comparison.time100} tone="time100" />
          </div>
          <p className="mx-auto mt-12 max-w-4xl text-center text-2xl font-black leading-relaxed text-slate-200 sm:text-3xl">
            {copy.comparison.closing}
          </p>
        </section>

        <section className="border-y border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-violet-950/50">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="mx-auto w-full max-w-lg overflow-hidden rounded-[2rem] border border-violet-500/30 bg-slate-950/60 p-4 shadow-2xl shadow-violet-950/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/companions/luna/avatar.png" alt="Luna companion house" className="aspect-square h-auto w-full rounded-3xl object-contain" />
            </div>
            <div>
              <SectionEyebrow>{copy.companion.eyebrow}</SectionEyebrow>
              <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">{copy.companion.title}</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{copy.companion.description}</p>
              <ul className="mt-8 space-y-4">
                {copy.companion.points.map((point) => <li key={point} className="flex items-center gap-3 text-slate-200"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/20 text-violet-200">✓</span>{point}</li>)}
              </ul>
              <Link href={status === "authenticated" ? "/companion" : "/login?mode=signup"} className="mt-9 inline-flex min-h-12 items-center rounded-xl bg-violet-600 px-6 font-bold transition hover:bg-violet-500">
                {copy.companion.action} →
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <SectionHeading eyebrow={copy.roadmap.eyebrow} title={copy.roadmap.title} />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <RoadmapCard data={copy.roadmap.available} tone="available" />
            <RoadmapCard data={copy.roadmap.next} tone="next" />
            <RoadmapCard data={copy.roadmap.future} tone="future" />
          </div>
        </section>

        <section className="relative border-y border-slate-800 bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.13),transparent_45%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-28 text-center sm:px-6 sm:py-40">
            <SectionEyebrow>{copy.vision.eyebrow}</SectionEyebrow>
            <h2 className="mt-7 text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl">{copy.vision.title}</h2>
            <div className="mt-10 space-y-3 text-xl font-bold text-slate-300 sm:text-3xl">
              {copy.vision.lines.map((line) => <p key={line}>{line}</p>)}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <h2 className="text-4xl font-black sm:text-5xl">{copy.cta.title}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">{copy.cta.description}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={primaryHref} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 font-bold transition hover:bg-blue-500">
              {status === "authenticated" ? (language === "zh" ? "进入控制台" : "Go to Dashboard") : copy.cta.start} →
            </Link>
            <Link href="/guide" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-600 px-6 font-bold text-slate-200 transition hover:bg-slate-800">
              {copy.cta.guide}
            </Link>
          </div>
        </section>
      </main>

      <PublicFooter language={language} />
    </div>
  );
}

function SectionEyebrow({ children }: { children: string }) {
  return <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">{children}</p>;
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <header className="max-w-4xl">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">{title}</h2>
      {description && <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{description}</p>}
    </header>
  );
}

function ComparisonPanel({ title, items, tone }: { title: string; items: string[]; tone: "muted" | "time100" }) {
  const active = tone === "time100";
  return (
    <article className={`rounded-3xl border p-7 sm:p-9 ${active ? "border-blue-500/50 bg-blue-500/10 shadow-2xl shadow-blue-950/20" : "border-slate-700 bg-slate-900/60"}`}>
      <h3 className={`text-2xl font-black ${active ? "text-blue-200" : "text-slate-300"}`}>{title}</h3>
      <ol className="mt-7 space-y-4">
        {items.map((item, index) => <li key={item} className="flex items-center gap-4"><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${active ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-500"}`}>{index + 1}</span><span className={active ? "font-bold text-white" : "text-slate-400"}>{item}</span></li>)}
      </ol>
    </article>
  );
}

type RoadmapData = { title: string; icon: string; items: string[] };

function RoadmapCard({ data, tone }: { data: RoadmapData; tone: "available" | "next" | "future" }) {
  const tones = {
    available: "border-emerald-500/35 bg-emerald-500/5 text-emerald-300",
    next: "border-blue-500/35 bg-blue-500/5 text-blue-300",
    future: "border-violet-500/35 bg-violet-500/5 text-violet-300",
  };
  return (
    <article className={`rounded-3xl border p-7 ${tones[tone]}`}>
      <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/60 font-black">{data.icon}</span><h3 className="text-xl font-black">{data.title}</h3></div>
      <ul className="mt-6 space-y-3 text-sm text-slate-300">{data.items.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true">•</span><span>{item}</span></li>)}</ul>
    </article>
  );
}
