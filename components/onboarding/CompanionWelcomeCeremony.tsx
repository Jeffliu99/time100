"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  useCeremonyAudio,
  type CeremonyPhase,
} from "@/hooks/useCeremonyAudio";

type Language = "en" | "zh";

type Companion = {
  id: string;
  name: string;
  avatar: string;
};

type CompanionWelcomeCeremonyProps = {
  companion: Companion;
  language: Language;
  onComplete: () => void;
};

const PHASE_DELAYS: Record<Exclude<CeremonyPhase, "APPEAR">, number> = {
  GREETING: 1500,
  MOVE_IN: 4000,
  WELCOME: 6500,
  COMPLETE: 9500,
};

export default function CompanionWelcomeCeremony({
  companion,
  language,
  onComplete,
}: CompanionWelcomeCeremonyProps) {
  const [phase, setPhase] = useState<CeremonyPhase>("APPEAR");
  const completedRef = useRef(false);

  useCeremonyAudio(phase);

  useEffect(() => {
    const timers = (Object.entries(PHASE_DELAYS) as Array<
      [Exclude<CeremonyPhase, "APPEAR">, number]
    >).map(([nextPhase, delay]) =>
      window.setTimeout(() => setPhase(nextPhase), delay),
    );

    return () => timers.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== "COMPLETE" || completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [phase, onComplete]);

  const copy = useMemo(
    () =>
      language === "zh"
        ? {
            APPEAR: `${companion.name} 来了`,
            GREETING: "让我们一起成长吧",
            MOVE_IN: "正在入住成长小屋...",
            WELCOME: "欢迎来到 Time100",
          }
        : {
            APPEAR: `${companion.name} is here`,
            GREETING: "Let's grow together",
            MOVE_IN: "Moving into your growth house...",
            WELCOME: "Welcome to Time100",
          },
    [companion.name, language],
  );

  const visiblePhase = phase === "COMPLETE" ? "WELCOME" : phase;
  const showHalo = phase === "GREETING" || phase === "MOVE_IN" || phase === "WELCOME";
  const movingIn = phase === "MOVE_IN";
  const welcomed = phase === "WELCOME" || phase === "COMPLETE";

  return (
    <main
      className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-slate-950 px-6 py-10 text-white"
      aria-live="polite"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-3xl" />
        <div
          className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.18),transparent_60%)] transition-opacity duration-1000 ${
            welcomed ? "opacity-100" : "opacity-40"
          }`}
        />
      </div>

      <section className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <div className="relative flex h-80 w-full items-center justify-center">
          <div
            className={`absolute h-56 w-56 rounded-full border border-blue-300/50 bg-blue-400/10 shadow-[0_0_80px_rgba(96,165,250,0.35)] transition-all duration-1000 ${
              showHalo ? "scale-125 opacity-100" : "scale-75 opacity-0"
            }`}
          />
          <div
            className={`absolute h-44 w-44 rounded-full border border-violet-300/40 transition-all delay-150 duration-1000 ${
              showHalo ? "scale-150 opacity-70" : "scale-75 opacity-0"
            }`}
          />

          <div
            className={`relative z-10 transition-all duration-1000 ease-out ${
              phase === "APPEAR"
                ? "translate-y-0 scale-100 opacity-100"
                : movingIn
                  ? "translate-y-24 scale-75 opacity-80"
                  : welcomed
                    ? "translate-y-16 scale-75 opacity-100"
                    : "translate-y-0 scale-100 opacity-100"
            }`}
          >
            <Image
              src={companion.avatar}
              alt={companion.name}
              width={208}
              height={208}
              priority
              className="h-44 w-44 object-contain drop-shadow-[0_20px_35px_rgba(59,130,246,0.35)] sm:h-52 sm:w-52"
            />
          </div>

          <div
            className={`absolute bottom-0 text-7xl transition-all duration-1000 ${
              movingIn || welcomed
                ? "translate-y-0 scale-110 opacity-100 drop-shadow-[0_0_25px_rgba(251,191,36,0.45)]"
                : "translate-y-8 scale-75 opacity-0"
            }`}
            aria-hidden="true"
          >
            🏠
          </div>

          {welcomed &&
            Array.from({ length: 12 }).map((_, index) => (
              <span
                key={index}
                className="absolute animate-pulse text-amber-300"
                style={{
                  left: `${10 + ((index * 31) % 80)}%`,
                  top: `${8 + ((index * 23) % 68)}%`,
                  animationDelay: `${index * 90}ms`,
                }}
                aria-hidden="true"
              >
                ✦
              </span>
            ))}
        </div>

        <div className="mt-10 min-h-28">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-blue-300">
            {companion.name}
          </p>
          <h1
            key={visiblePhase}
            className="mt-3 animate-[fadeIn_500ms_ease-out] text-3xl font-black tracking-tight sm:text-4xl"
          >
            {copy[visiblePhase]}
          </h1>
          <p className="mt-4 text-sm text-slate-400">
            {language === "zh" ? "你的成长伙伴已经准备好了" : "Your growth companion is ready"}
          </p>
        </div>

        <button
          type="button"
          onClick={onComplete}
          className="mt-8 rounded-full border border-slate-700 bg-slate-900/70 px-5 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
        >
          {language === "zh" ? "跳过动画" : "Skip animation"}
        </button>
      </section>
    </main>
  );
}
