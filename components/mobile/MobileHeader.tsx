"use client";

import Link from "next/link";
import type { Language } from "@/types";

export default function MobileHeader({ language }: { language: Language }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-700 bg-slate-900/95 px-4 text-white shadow-lg shadow-black/30 backdrop-blur-md md:hidden">
      <Link href="/" className="flex min-w-0 flex-col leading-none">
        <span className="text-xl font-extrabold tracking-wide text-white">
          TIME100
        </span>
        <span className="mt-1 truncate text-xs font-medium text-slate-300">
          Turn Ideas Into Reality
        </span>
      </Link>

      <Link
        href="/settings/profile"
        aria-label={language === "zh" ? "个人资料与设置" : "Profile and settings"}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-xl shadow-md transition active:scale-95"
      >
        <span aria-hidden="true">👤</span>
      </Link>
    </header>
  );
}
