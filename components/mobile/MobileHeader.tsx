"use client";

import Link from "next/link";
import type { Language } from "@/types";

export default function MobileHeader({ language }: { language: Language }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 text-white backdrop-blur md:hidden">
      <Link href="/" className="text-lg font-black tracking-wide">
        TIME100
      </Link>
      <Link
        href="/profile"
        aria-label={language === "zh" ? "个人资料" : "Profile"}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-lg"
      >
        👤
      </Link>
    </header>
  );
}
