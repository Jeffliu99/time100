"use client";

import { useState } from "react";
import PublicFooter from "@/components/home/PublicFooter";
import PublicHeader from "@/components/home/PublicHeader";
import type { HomeLanguage } from "@/components/home/home-copy";
import { getContactCopy } from "./contact-copy";

const EMAIL = "hello@time100.ca";

function mailto(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${EMAIL}?${params.toString()}`;
}

export default function ContactLanding() {
  const [language, setLanguage] = useState<HomeLanguage>("en");
  const copy = getContactCopy(language);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <PublicHeader language={language} onLanguageChange={setLanguage} />

      <main className="overflow-hidden">
        <section className="relative border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.12),transparent_38%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">
              {copy.hero.eyebrow}
            </p>
            <h1 className="mt-5 max-w-5xl text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              {copy.hero.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              {copy.hero.description}
            </p>

            <div className="mt-8 max-w-xl">
              <a
                href={mailto(language === "zh" ? "联系 Time100" : "Contact Time100")}
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 font-black text-white shadow-lg shadow-blue-950/40 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.98] sm:w-auto"
              >
                <span aria-hidden="true">📧</span>
                {copy.hero.action} →
              </a>
              <p className="mt-3 text-sm text-slate-500">{copy.hero.response}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="rounded-[2rem] border border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-slate-900 to-violet-500/10 p-6 shadow-2xl shadow-black/20 sm:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-300">
                  {copy.email.eyebrow}
                </p>
                <h2 className="mt-4 break-all text-3xl font-black sm:text-5xl">
                  {copy.email.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  {copy.email.description}
                </p>
              </div>

              <a
                href={mailto(language === "zh" ? "联系 Time100" : "Contact Time100")}
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border border-blue-400/50 bg-blue-600 px-6 font-black transition hover:bg-blue-500 active:scale-[0.98] lg:w-auto"
              >
                <span aria-hidden="true">✉️</span>
                {copy.email.action}
              </a>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-800 bg-slate-900/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
            <SectionHeading
              eyebrow={copy.feedback.eyebrow}
              title={copy.feedback.title}
              description={copy.feedback.description}
            />

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {copy.feedback.items.map((item) => (
                <article
                  key={item.title}
                  className="flex h-full flex-col rounded-3xl border border-slate-700 bg-slate-950/70 p-6 shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:border-blue-500/50"
                >
                  <span className="text-4xl" aria-hidden="true">{item.icon}</span>
                  <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
                  <p className="mt-3 flex-1 leading-7 text-slate-300">{item.text}</p>
                  <a
                    href={mailto(item.subject, item.body)}
                    className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-600 bg-slate-900 px-4 font-bold text-slate-100 transition hover:border-blue-500/50 hover:bg-slate-800 active:scale-[0.98]"
                  >
                    {item.action} →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow={copy.listen.eyebrow}
            title={copy.listen.title}
            description={copy.listen.description}
          />

          <ol className="relative space-y-4 before:absolute before:bottom-8 before:left-6 before:top-8 before:w-px before:bg-slate-700">
            {copy.listen.flow.map((item, index) => (
              <li
                key={item.title}
                className="relative flex items-center gap-5 rounded-2xl border border-slate-700 bg-slate-900/70 p-5"
              >
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-500/30 bg-slate-950 text-2xl">
                  {item.icon}
                </span>
                <div>
                  <p className="text-xs font-black tracking-widest text-slate-500">0{index + 1}</p>
                  <h3 className="mt-1 text-lg font-black">{item.title}</h3>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-y border-slate-800 bg-slate-900/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
            <SectionHeading eyebrow={copy.promise.eyebrow} title={copy.promise.title} />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {copy.promise.items.map((item) => (
                <article key={item.title} className="rounded-3xl border border-slate-700 bg-slate-950/70 p-6 text-center">
                  <span className="text-4xl" aria-hidden="true">{item.icon}</span>
                  <h3 className="mt-5 text-lg font-black">{item.title}</h3>
                  <p className="mt-2 font-bold text-blue-300">{item.value}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="rounded-[2rem] border border-blue-500/30 bg-gradient-to-br from-blue-600/20 via-slate-900 to-violet-600/20 p-7 text-center shadow-2xl shadow-blue-950/30 sm:p-12 lg:p-16">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">
              {copy.cta.eyebrow}
            </p>
            <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              {copy.cta.title}
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {copy.cta.description}
            </p>

            <div className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
              <a
                href={mailto(
                  language === "zh" ? "Time100 使用反馈" : "Time100 feedback",
                  language === "zh"
                    ? "你好 Time100 团队，\n\n我想分享以下反馈："
                    : "Hello Time100 team,\n\nI'd like to share the following feedback:",
                )}
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 font-black text-white shadow-lg shadow-blue-950/40 transition hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                <span aria-hidden="true">💡</span>
                {copy.cta.primary} →
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-950/60 px-6 font-bold text-slate-100 transition hover:bg-slate-800 active:scale-[0.98] sm:w-auto"
              >
                <span aria-hidden="true">📧</span>
                {copy.cta.secondary}
              </a>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter language={language} />
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="max-w-4xl">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-300">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          {description}
        </p>
      )}
    </header>
  );
}
