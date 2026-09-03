"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import UserMenu from "@/components/layout/UserMenu";
import type { HomeLanguage } from "./home-copy";
import { getHomeCopy } from "./home-copy";

export default function PublicHeader({
  language,
  onLanguageChange,
}: {
  language: HomeLanguage;
  onLanguageChange: (language: HomeLanguage) => void;
}) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const copy = getHomeCopy(language).nav;

  const links = [
    ["#workflow", copy.workflow],
    ["#features", copy.features],
    ["#compare", copy.compare],
    ["#pricing", copy.pricing],
    ["#faq", copy.faq],
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Time100 home">
          <Image
            src="/logo/time100-logo-dark.svg"
            alt="Time100"
            width={360}
            height={110}
            priority
            className="h-auto w-40 sm:w-48"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Public navigation">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-xl px-3 py-2 text-sm font-bold text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onLanguageChange(language === "zh" ? "en" : "zh")}
            className="hidden min-h-10 rounded-xl border border-slate-700 px-3 text-sm font-bold text-slate-200 transition hover:bg-slate-800 sm:block"
          >
            {language === "zh" ? "English" : "中文"}
          </button>

          {status === "authenticated" && session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="hidden min-h-10 items-center rounded-xl px-3 text-sm font-bold text-slate-200 transition hover:bg-slate-800 sm:inline-flex"
              >
                Dashboard
              </Link>
              <UserMenu language={language} compact />
            </>
          ) : status === "unauthenticated" ? (
            <>
              <Link
                href="/login"
                className="hidden min-h-10 items-center rounded-xl px-3 text-sm font-bold text-slate-200 transition hover:bg-slate-800 sm:inline-flex"
              >
                {copy.login}
              </Link>
              <Link
                href="/login?mode=signup"
                className="inline-flex min-h-10 items-center rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                {copy.start}
              </Link>
            </>
          ) : (
            <div className="h-10 w-24 animate-pulse rounded-xl bg-slate-800" />
          )}

          <button
            type="button"
            aria-expanded={open}
            aria-label={language === "zh" ? "打开菜单" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-xl lg:hidden"
          >
            ☰
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-slate-800 bg-slate-950 transition-all duration-200 lg:hidden ${
          open ? "max-h-[32rem] border-t opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:px-6">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 font-bold text-slate-200 hover:bg-slate-800"
            >
              {label}
            </a>
          ))}

          <button
            type="button"
            onClick={() => onLanguageChange(language === "zh" ? "en" : "zh")}
            className="rounded-xl px-4 py-3 text-left font-bold text-slate-200 hover:bg-slate-800"
          >
            {language === "zh" ? "English" : "中文"}
          </button>

          {status === "authenticated" ? (
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 font-bold text-blue-200 hover:bg-slate-800"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 font-bold text-slate-200 hover:bg-slate-800"
            >
              {copy.login}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
