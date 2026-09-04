"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PublicFooter from "@/components/home/PublicFooter";
import PublicHeader from "@/components/home/PublicHeader";
import type { HomeLanguage } from "@/components/home/home-copy";
import { getFeaturesCopy } from "./features-copy";

export default function FeaturesLanding() {
  const { status } = useSession();
  const [language, setLanguage] = useState<HomeLanguage>("en");
  const copy = getFeaturesCopy(language);
  const primaryHref = status === "authenticated" ? "/dashboard" : "/login?mode=signup";
  const primaryText = status === "authenticated"
    ? language === "zh" ? "进入控制台" : "Go to Dashboard"
    : copy.hero.primary;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <PublicHeader language={language} onLanguageChange={setLanguage} />

      <main className="overflow-hidden">
        <section className="relative border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_20%_75%,rgba(16,185,129,0.10),transparent_38%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.05fr_.95fr] lg:py-32">
            <div>
              <Eyebrow>{copy.hero.eyebrow}</Eyebrow>
              <h1 className="mt-5 max-w-5xl text-5xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
                {copy.hero.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                {copy.hero.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={primaryHref} className="inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 font-black shadow-lg shadow-blue-950/40 transition hover:scale-[1.02] active:scale-[0.98] sm:w-auto">
                  🚀 {primaryText} →
                </Link>
                <Link href="/pricing" className="inline-flex min-h-14 w-full items-center justify-center rounded-xl border border-slate-600 bg-slate-900/70 px-6 font-bold transition hover:bg-slate-800 sm:w-auto">
                  {copy.hero.secondary}
                </Link>
              </div>
            </div>

            <ProductSystemPreview language={language} />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="rounded-[2rem] border border-blue-500/25 bg-gradient-to-br from-blue-500/10 via-slate-900 to-emerald-500/5 p-7 sm:p-10 lg:p-14">
            <SectionHeading eyebrow={copy.value.eyebrow} title={copy.value.title} description={copy.value.description} />
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm font-black sm:text-base">
              {["Ideas", "Projects", "Tasks", "Timeline", "Companion"].map((item, index) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-slate-200">{item}</span>
                  {index < 4 && <span className="text-blue-400">→</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-800 bg-slate-900/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
            <SectionHeading eyebrow={copy.capabilities.eyebrow} title={copy.capabilities.title} description={copy.capabilities.description} />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {copy.capabilities.items.map((item) => (
                <article key={item.title} className="rounded-3xl border border-slate-700 bg-slate-950/70 p-6 shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:border-blue-500/50">
                  <span className="text-4xl" aria-hidden="true">{item.icon}</span>
                  <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading eyebrow={copy.flow.eyebrow} title={copy.flow.title} description={copy.flow.description} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {copy.flow.steps.map((step, index) => (
              <article key={step.title} className="relative rounded-3xl border border-slate-700 bg-slate-900/70 p-5 text-center">
                <span className="text-4xl" aria-hidden="true">{step.icon}</span>
                <h3 className="mt-4 font-black">{step.title}</h3>
                <span className="mt-2 block text-xs font-bold text-slate-500">0{index + 1}</span>
                {index < copy.flow.steps.length - 1 && <span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden text-xl text-blue-400 lg:block">→</span>}
              </article>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-4xl text-center text-xl font-black leading-8 text-blue-200 sm:text-2xl">{copy.flow.closing}</p>
        </section>

        <FeatureSection tone="dark" reverse={false} eyebrow={copy.dashboard.eyebrow} title={copy.dashboard.title} description={copy.dashboard.description} points={copy.dashboard.points} visual={<DashboardPreview language={language} />} />
        <FeatureSection tone="soft" reverse eyebrow={copy.timeline.eyebrow} title={copy.timeline.title} description={copy.timeline.description} points={copy.timeline.points} visual={<TimelinePreview language={language} />} />

        <section className="border-y border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-violet-950/50">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
            <div className="mx-auto w-full max-w-lg overflow-hidden rounded-[2rem] border border-violet-500/30 bg-slate-950/70 p-4 shadow-2xl shadow-violet-950/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/companions/luna/avatar.png" alt="Luna companion house" className="aspect-square h-auto w-full rounded-3xl object-contain" />
            </div>
            <div>
              <SectionHeading eyebrow={copy.companion.eyebrow} title={copy.companion.title} description={copy.companion.description} />
              <FeaturePoints items={copy.companion.points} accent="violet" />
              <Link href={status === "authenticated" ? "/companion" : "/login?mode=signup"} className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-violet-600 px-6 font-black transition hover:bg-violet-500 sm:w-auto">
                {copy.companion.action} →
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading eyebrow={copy.compare.eyebrow} title={copy.compare.title} />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <CompareCard title={copy.compare.traditional.title} items={copy.compare.traditional.items} active={false} />
            <CompareCard title={copy.compare.time100.title} items={copy.compare.time100.items} active />
          </div>
          <Link href="/compare" className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-blue-500/50 bg-blue-500/10 px-6 font-black text-blue-200 transition hover:bg-blue-500/20 sm:w-auto">
            {copy.compare.action} →
          </Link>
        </section>

        <section className="border-t border-slate-800">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="rounded-[2rem] border border-blue-500/30 bg-gradient-to-br from-blue-600/20 via-slate-900 to-violet-600/20 p-7 text-center shadow-2xl shadow-blue-950/30 sm:p-12 lg:p-16">
              <Eyebrow>{copy.cta.eyebrow}</Eyebrow>
              <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{copy.cta.title}</h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">{copy.cta.description}</p>
              <div className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
                <Link href={primaryHref} className="inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 font-black shadow-lg shadow-blue-950/40 transition hover:scale-[1.02] active:scale-[0.98] sm:w-auto">🚀 {status === "authenticated" ? primaryText : copy.cta.primary} →</Link>
                <Link href="/guide" className="inline-flex min-h-14 w-full items-center justify-center rounded-xl border border-slate-600 bg-slate-950/60 px-6 font-bold transition hover:bg-slate-800 sm:w-auto">📖 {copy.cta.secondary}</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter language={language} />
    </div>
  );
}

function Eyebrow({ children }: { children: string }) {
  return <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">{children}</p>;
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <header className="max-w-4xl"><Eyebrow>{eyebrow}</Eyebrow><h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">{title}</h2>{description && <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">{description}</p>}</header>;
}

function FeaturePoints({ items, accent = "blue" }: { items: string[]; accent?: "blue" | "violet" }) {
  return <ul className="mt-7 grid gap-3 sm:grid-cols-2">{items.map((item) => <li key={item} className="flex items-start gap-3 text-slate-200"><span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${accent === "violet" ? "bg-violet-500/20 text-violet-200" : "bg-blue-500/20 text-blue-200"}`}>✓</span><span>{item}</span></li>)}</ul>;
}

function FeatureSection({ tone, reverse, eyebrow, title, description, points, visual }: { tone: "dark" | "soft"; reverse?: boolean; eyebrow: string; title: string; description: string; points: string[]; visual: React.ReactNode }) {
  return <section className={`border-y border-slate-800 ${tone === "soft" ? "bg-slate-900/30" : "bg-slate-950"}`}><div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-20"><div className={reverse ? "lg:order-2" : ""}><SectionHeading eyebrow={eyebrow} title={title} description={description} /><FeaturePoints items={points} /></div><div className={reverse ? "lg:order-1" : ""}>{visual}</div></div></section>;
}

function ProductSystemPreview({ language }: { language: HomeLanguage }) {
  const labels = language === "zh" ? ["目标", "项目", "任务", "成长"] : ["Goal", "Project", "Task", "Growth"];
  return <div className="rounded-[2rem] border border-blue-500/25 bg-gradient-to-br from-blue-500/12 via-slate-900 to-violet-500/12 p-5 shadow-2xl shadow-black/30 sm:p-7"><div className="grid grid-cols-2 gap-3">{labels.map((label, index) => <div key={label} className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4"><span className="text-2xl">{["🎯", "📋", "✅", "🌱"][index]}</span><p className="mt-2 text-sm font-black">{label}</p></div>)}</div><div className="mt-4 rounded-3xl border border-violet-500/30 bg-violet-500/10 p-5"><div className="flex items-center gap-4"><span className="text-4xl">🏡</span><div><p className="font-black">Luna&apos;s House</p><p className="mt-1 text-sm text-slate-400">Level 1 · 0 XP</p></div></div></div></div>;
}

function DashboardPreview({ language }: { language: HomeLanguage }) {
  return <div className="rounded-[2rem] border border-slate-700 bg-slate-900 p-5 shadow-2xl shadow-black/30"><div className="grid grid-cols-2 gap-3"><Metric label={language === "zh" ? "项目" : "Projects"} value="3" /><Metric label={language === "zh" ? "未完成任务" : "Open tasks"} value="8" /><Metric label={language === "zh" ? "已完成" : "Completed"} value="12" /><Metric label={language === "zh" ? "剩余预计" : "Remaining"} value="16h" /></div><div className="mt-4 grid gap-3 sm:grid-cols-3">{["TO DO", "DOING", "DONE"].map((title, index) => <div key={title} className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4"><p className="text-xs font-black text-slate-500">{title}</p><div className={`mt-4 h-2 rounded-full ${index === 0 ? "bg-slate-600" : index === 1 ? "bg-blue-500" : "bg-emerald-500"}`} /></div>)}</div></div>;
}

function TimelinePreview({ language }: { language: HomeLanguage }) {
  const events = language === "zh" ? ["完成第一个项目", "建立每日行动节奏", "创建成长伙伴"] : ["Completed first project", "Built a daily action rhythm", "Created a growth companion"];
  return <div className="rounded-[2rem] border border-slate-700 bg-slate-950/70 p-6 shadow-2xl shadow-black/30"><div className="relative space-y-5 before:absolute before:bottom-4 before:left-5 before:top-4 before:w-px before:bg-slate-700">{events.map((event, index) => <div key={event} className="relative flex items-center gap-4"><span className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 bg-slate-900 ${index === 0 ? "text-emerald-300" : index === 1 ? "text-blue-300" : "text-violet-300"}`}>{["✓", "🌱", "🏡"][index]}</span><div className="flex-1 rounded-2xl border border-slate-700 bg-slate-900/70 p-4"><p className="font-bold">{event}</p><p className="mt-1 text-xs text-slate-500">Growth record</p></div></div>)}</div></div>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 text-2xl font-black">{value}</p></div>;
}

function CompareCard({ title, items, active }: { title: string; items: string[]; active: boolean }) {
  return <article className={`rounded-3xl border p-7 ${active ? "border-blue-500/50 bg-blue-500/10 shadow-2xl shadow-blue-950/20" : "border-slate-700 bg-slate-900/60"}`}><h3 className={`text-2xl font-black ${active ? "text-blue-200" : "text-slate-300"}`}>{title}</h3><ul className="mt-7 space-y-4">{items.map((item) => <li key={item} className="flex items-start gap-3"><span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${active ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-500"}`}>{active ? "✓" : "•"}</span><span className={active ? "font-bold text-white" : "text-slate-400"}>{item}</span></li>)}</ul></article>;
}
