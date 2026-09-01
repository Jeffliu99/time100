"use client";

import { useState } from "react";
import { CompanionBreathingAvatar } from "./CompanionBreathingAvatar";

export function CompanionBreathingDemo() {
  const [welcomeKey, setWelcomeKey] = useState(0);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white">
      <div className="flex justify-center">
        <CompanionBreathingAvatar
          key={welcomeKey}
          name="Luna"
          avatar="/companions/luna.svg"
          variant="welcome"
          size={180}
        />
      </div>

      <div className="mt-3 text-center">
        <h2 className="text-2xl font-black">Luna</h2>
        <p className="mt-1 text-sm text-slate-400">Let&apos;s grow together.</p>

        <button
          type="button"
          onClick={() => setWelcomeKey((value) => value + 1)}
          className="mt-5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 font-bold active:scale-[0.98]"
        >
          Replay welcome animation
        </button>
      </div>
    </section>
  );
}
