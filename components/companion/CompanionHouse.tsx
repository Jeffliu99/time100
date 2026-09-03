import type { ReactNode } from "react";
import Link from "next/link";
import CompanionAvatar from "./CompanionAvatar";
import { companionCopy, type CompanionLanguage } from "./companion-copy";

interface Props {
  language: CompanionLanguage;
  companionName: string | null;
  companionType: string | null;
  companionAvatar: string | null;
  companionLevel: number | null;
  companionXp: number | null;
}

export default function CompanionHouse({
  language,
  companionName,
  companionType,
  companionAvatar,
  companionLevel,
  companionXp,
}: Props) {
  const copy = companionCopy[language];
  const name = companionName?.trim() || copy.fallbackName;
  const hasCompanion = Boolean(companionName?.trim());

  return (
    <div className="bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        <section className="overflow-hidden rounded-3xl border border-violet-500/25 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950/40 p-5 shadow-2xl shadow-black/20 sm:p-8">
          <div className="grid items-center gap-7 lg:grid-cols-[256px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[288px_minmax(0,1fr)]">
            <CompanionAvatar name={name} avatar={companionAvatar} />

            <div className="min-w-0 text-center lg:text-left">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">
                {hasCompanion ? `${name} ${copy.house}` : copy.house}
              </p>

              <h1 className="mt-3 break-words text-3xl font-black text-white sm:text-5xl xl:text-6xl">
                🏡 {name}
                {language === "zh" ? copy.house : ` ${copy.house}`}
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 lg:mx-0 lg:text-lg">
                {copy.subtitle}
              </p>

              {!hasCompanion && (
                <div className="mx-auto mt-5 max-w-2xl rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-left text-amber-100 lg:mx-0">
                  <p className="font-semibold">{copy.notSelected}</p>
                  <Link
                    href="/settings/profile"
                    className="mt-3 inline-flex min-h-11 items-center rounded-full bg-amber-400 px-4 text-sm font-bold text-slate-950"
                  >
                    {copy.choose}
                  </Link>
                </div>
              )}

              {hasCompanion && (
                <dl className="mx-auto mt-7 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 lg:mx-0">
                  <Stat label={copy.level} value={companionLevel ?? 1} />
                  <Stat label={copy.xp} value={companionXp ?? 0} />
                  <Stat label={copy.type} value={companionType || "-"} />
                </dl>
              )}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <HouseCard icon="☀️" title={copy.today} text={copy.todayText}>
            <Link
              href="/"
              className="text-sm font-bold text-blue-300 transition hover:text-blue-200"
            >
              {copy.viewTasks} →
            </Link>
          </HouseCard>

          <HouseCard icon="🌱" title={copy.journey} text={copy.journeyText}>
            <Link
              href="/timeline"
              className="text-sm font-bold text-blue-300 transition hover:text-blue-200"
            >
              {copy.viewTimeline} →
            </Link>
          </HouseCard>

          <HouseCard icon="📖" title={copy.memories} text={copy.memoriesText} />
          <HouseCard icon="💬" title={copy.talk} text={copy.talkText} />
        </section>

        <div className="mt-6 flex justify-center sm:justify-end">
          <Link
            href="/settings/profile"
            className="inline-flex min-h-12 items-center rounded-full border border-slate-600 bg-slate-900 px-5 text-sm font-bold text-slate-100 transition hover:bg-slate-800"
          >
            ⚙️ {copy.customize}
          </Link>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-700 bg-slate-950/50 p-4 text-center">
      <dt className="truncate text-xs font-semibold text-slate-400 sm:text-sm">
        {label}
      </dt>
      <dd className="mt-2 truncate text-xl font-black text-white">
        {value}
      </dd>
    </div>
  );
}

function HouseCard({
  icon,
  title,
  text,
  children,
}: {
  icon: string;
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <article className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-lg shadow-black/10 sm:p-6">
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="text-2xl">
          {icon}
        </span>
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-white sm:text-xl">{title}</h2>
          <p className="mt-2 leading-6 text-slate-300">{text}</p>
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </article>
  );
}
