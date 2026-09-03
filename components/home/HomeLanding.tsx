"use client";

import Link from "next/link";
import { useState } from "react";
import PublicFooter from "./PublicFooter";
import PublicHeader from "./PublicHeader";
import { getHomeCopy, type HomeLanguage } from "./home-copy";

const comparison = [
  ["Core task lists", "✓", "✓", "✓", "✓"],
  ["Project-focused organization", "Basic", "Lists", "✓", "✓"],
  ["Growth Timeline", "—", "—", "Activity", "✓"],
  ["Growth records and milestones", "—", "—", "Basic", "✓"],
  ["Personal companion house", "—", "—", "—", "✓"],
  ["Companion XP and levels", "—", "—", "—", "✓"],
] as const;

export default function HomeLanding() {
  const [language, setLanguage] = useState<HomeLanguage>("en");
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const copy = getHomeCopy(language);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <PublicHeader language={language} onLanguageChange={setLanguage} />

      <main>
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">{copy.hero.eyebrow}</p>
              <h1 className="mt-5 text-5xl font-black leading-[1.03] sm:text-6xl xl:text-7xl">{copy.hero.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{copy.hero.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/login?mode=signup" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 font-bold transition hover:bg-blue-500">{copy.hero.primary} →</Link>
                <a href="#workflow" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-600 bg-slate-900 px-6 font-bold text-slate-100 transition hover:bg-slate-800">{copy.hero.secondary}</a>
              </div>
              <p className="mt-4 text-sm text-slate-500">{copy.hero.note}</p>
            </div>

            <div className="relative rounded-[2rem] border border-blue-500/25 bg-gradient-to-br from-blue-500/15 via-slate-900 to-violet-500/15 p-5 shadow-2xl shadow-black/30 sm:p-7">
              <div className="grid grid-cols-2 gap-3">
                <Metric label={language === "zh" ? "项目" : "Projects"} value="3" />
                <Metric label={language === "zh" ? "进行中" : "In progress"} value="8" />
              </div>
              <div className="mt-4 rounded-3xl border border-slate-700 bg-slate-950/70 p-5">
                <div className="flex items-center justify-between"><strong>{language === "zh" ? "成长旅程" : "Growth Journey"}</strong><span>🌱</span></div>
                <div className="mt-5 space-y-4">
                  {["Complete first project", "Build daily routine", "Visit Luna's House"].map((item, index) => <div key={item} className="flex items-center gap-3"><span className={`h-3 w-3 rounded-full ${index === 0 ? "bg-emerald-400" : index === 1 ? "bg-blue-400" : "bg-violet-400"}`} /><span className="text-sm text-slate-300">{item}</span></div>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="workflow" className="border-y border-slate-800 bg-slate-900/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
            <SectionTitle eyebrow={copy.workflow.eyebrow} title={copy.workflow.title} description={copy.workflow.description} />
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {copy.workflow.steps.map((step, index) => <article key={step.title} className="relative rounded-3xl border border-slate-700 bg-slate-900/80 p-5"><div className="flex justify-between"><span className="text-3xl">{step.icon}</span><span className="text-xs font-black text-slate-500">0{index + 1}</span></div><h3 className="mt-5 text-lg font-black">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{step.text}</p>{index < 4 && <span className="absolute -right-3 top-1/2 hidden text-xl text-blue-400 lg:block">→</span>}</article>)}
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionTitle eyebrow={copy.features.eyebrow} title={copy.features.title} description={copy.features.description} />
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {copy.features.cards.map((card) => <article key={card.title} className="rounded-3xl border border-slate-700 bg-slate-900/70 p-7"><span className="text-4xl">{card.icon}</span><h3 className="mt-5 text-2xl font-black">{card.title}</h3><p className="mt-3 leading-7 text-slate-300">{card.text}</p></article>)}
          </div>
        </section>

        <section id="compare" className="border-y border-slate-800 bg-slate-900/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
            <SectionTitle eyebrow={copy.difference.eyebrow} title={copy.difference.title} description={copy.difference.description} />
            <div className="mt-9 overflow-x-auto rounded-3xl border border-slate-700 bg-slate-950/70">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="border-b border-slate-700 bg-slate-900"><tr><th className="p-4">Feature</th><th className="p-4">Google Tasks</th><th className="p-4">Microsoft To Do</th><th className="p-4">Todoist</th><th className="bg-blue-500/10 p-4 text-blue-200">Time100</th></tr></thead>
                <tbody>{comparison.map((row) => <tr key={row[0]} className="border-b border-slate-800 last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={`p-4 ${index === 0 ? "font-bold text-white" : index === 4 ? "bg-blue-500/5 font-black text-blue-200" : "text-slate-400"}`}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <p className="mt-4 text-xs leading-6 text-slate-500">Positioning overview based on publicly described product focuses. Product capabilities can change. Google Tasks emphasizes task capture and Google Workspace integration; Microsoft To Do emphasizes My Day, sharing, reminders, and Outlook integration; Todoist emphasizes task and project organization.</p>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionTitle eyebrow={copy.pricing.eyebrow} title={copy.pricing.title} />
          <div className="mt-7 inline-flex rounded-xl border border-slate-700 bg-slate-900 p-1"><button onClick={() => setBilling("monthly")} className={`rounded-lg px-4 py-2 text-sm font-bold ${billing === "monthly" ? "bg-blue-600 text-white" : "text-slate-400"}`}>{copy.pricing.monthly}</button><button onClick={() => setBilling("yearly")} className={`rounded-lg px-4 py-2 text-sm font-bold ${billing === "yearly" ? "bg-blue-600 text-white" : "text-slate-400"}`}>{copy.pricing.yearly}</button></div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <PriceCard name={copy.pricing.free.name} description={copy.pricing.free.description} price={copy.pricing.free.price} period={copy.pricing.free.period} features={copy.pricing.free.features} action={copy.pricing.free.action} />
            <PriceCard featured name={copy.pricing.pro.name} description={copy.pricing.pro.description} price={billing === "monthly" ? copy.pricing.pro.monthlyPrice : copy.pricing.pro.yearlyPrice} period={billing === "monthly" ? copy.pricing.pro.monthlyPeriod : copy.pricing.pro.yearlyPeriod} features={copy.pricing.pro.features} action={copy.pricing.pro.action} badge={billing === "yearly" ? copy.pricing.save : undefined} />
          </div>
        </section>

        <section id="faq" className="border-y border-slate-800 bg-slate-900/30">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
            <SectionTitle eyebrow={copy.faq.eyebrow} title={copy.faq.title} />
            <div className="mt-8 space-y-3">{copy.faq.items.map((item) => <details key={item.q} className="group rounded-2xl border border-slate-700 bg-slate-950/70 p-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold"><span>{item.q}</span><span className="text-blue-300 transition group-open:rotate-45">＋</span></summary><p className="mt-4 leading-7 text-slate-300">{item.a}</p></details>)}</div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24"><h2 className="text-4xl font-black sm:text-5xl">{copy.cta.title}</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">{copy.cta.description}</p><div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><Link href="/login?mode=signup" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 font-bold hover:bg-blue-500">{copy.cta.action} →</Link><Link href="/login" className="inline-flex min-h-12 items-center justify-center rounded-xl px-6 font-bold text-slate-300 hover:bg-slate-800">{copy.cta.login}</Link></div></section>
      </main>

      <PublicFooter language={language} />
    </div>
  );
}

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) { return <header className="max-w-3xl"><p className="text-sm font-black uppercase tracking-[0.18em] text-blue-300">{eyebrow}</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">{title}</h2>{description && <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{description}</p>}</header>; }
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div>; }
function PriceCard({ name, description, price, period, features, action, featured = false, badge }: { name: string; description: string; price: string; period: string; features: readonly string[]; action: string; featured?: boolean; badge?: string }) { return <article className={`relative rounded-3xl border p-7 ${featured ? "border-blue-500 bg-blue-500/10 shadow-2xl shadow-blue-950/30" : "border-slate-700 bg-slate-900/70"}`}>{badge && <span className="absolute right-5 top-5 rounded-full bg-blue-500 px-3 py-1 text-xs font-black">{badge}</span>}<h3 className="text-2xl font-black">{name}</h3><p className="mt-3 max-w-lg text-slate-300">{description}</p><div className="mt-6 flex items-end gap-2"><strong className="text-5xl font-black">{price}</strong><span className="pb-1 text-slate-400">{period}</span></div><ul className="mt-7 space-y-3 text-sm text-slate-300">{features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul><Link href="/login?mode=signup" className={`mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-xl font-black ${featured ? "bg-blue-600 text-white hover:bg-blue-500" : "border border-slate-600 hover:bg-slate-800"}`}>{action}</Link></article>; }
