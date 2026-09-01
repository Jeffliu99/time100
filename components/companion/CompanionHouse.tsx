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
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="text-lg font-black tracking-wide">TIME100</Link>
          <nav className="flex items-center gap-2 text-sm font-bold">
            <Link href="/" className="rounded-full px-3 py-2 text-slate-200 hover:bg-slate-800">{copy.dashboard}</Link>
            <Link href="/timeline" className="rounded-full px-3 py-2 text-slate-200 hover:bg-slate-800">{copy.timeline}</Link>
            <Link href="/settings/profile" className="rounded-full px-3 py-2 text-slate-200 hover:bg-slate-800">{copy.profile}</Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 pb-24 sm:px-6 sm:py-10">
        <section className="overflow-hidden rounded-3xl border border-violet-500/25 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950/40 p-5 shadow-2xl shadow-black/20 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <CompanionAvatar name={name} avatar={companionAvatar} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">
                {hasCompanion ? `${name} ${copy.house}` : copy.house}
              </p>
              <h1 className="mt-2 break-words text-3xl font-black sm:text-5xl">
                🏡 {name}{language === "zh" ? copy.house : ` ${copy.house}`}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">{copy.subtitle}</p>

              {!hasCompanion && (
                <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-100">
                  <p className="font-semibold">{copy.notSelected}</p>
                  <Link href="/settings/profile" className="mt-3 inline-flex rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950">
                    {copy.choose}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {hasCompanion && (
            <dl className="mt-6 grid grid-cols-3 gap-2 sm:max-w-xl sm:gap-3">
              <Stat label={copy.level} value={companionLevel ?? 1} />
              <Stat label={copy.xp} value={companionXp ?? 0} />
              <Stat label={copy.type} value={companionType || "-"} />
            </dl>
          )}
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <HouseCard icon="☀️" title={copy.today} text={copy.todayText}>
            <Link href="/" className="text-sm font-bold text-blue-300 hover:text-blue-200">{copy.viewTasks} →</Link>
          </HouseCard>
          <HouseCard icon="🌱" title={copy.journey} text={copy.journeyText}>
            <Link href="/timeline" className="text-sm font-bold text-blue-300 hover:text-blue-200">{copy.viewTimeline} →</Link>
          </HouseCard>
          <HouseCard icon="📖" title={copy.memories} text={copy.memoriesText} />
          <HouseCard icon="💬" title={copy.talk} text={copy.talkText} />
        </section>

        <div className="mt-6 flex justify-end">
          <Link href="/settings/profile" className="rounded-full border border-slate-600 bg-slate-900 px-5 py-3 text-sm font-bold text-slate-100 hover:bg-slate-800">
            ⚙️ {copy.customize}
          </Link>
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-700 bg-slate-950/50 p-3 text-center">
      <dt className="truncate text-xs font-semibold text-slate-400">{label}</dt>
      <dd className="mt-1 truncate text-lg font-black text-white">{value}</dd>
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
  children?: React.ReactNode;
}) {
  return (
    <article className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="text-2xl">{icon}</span>
        <div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <p className="mt-2 leading-6 text-slate-300">{text}</p>
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </article>
  );
}
