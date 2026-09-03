"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Language } from "@/types";
import AnimatedDropdown from "./AnimatedDropdown";
import UserMenu from "./UserMenu";
import { NAV_ITEMS, getNavLabel } from "./nav.config";

interface Props {
  language: Language;
  companionName?: string | null;
}

export default function AppHeader({ language, companionName }: Props) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const zh = language === "zh";

  useEffect(() => {
    if (!navOpen) return;

    function closeOutside(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setNavOpen(false);
    }

    function closeEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setNavOpen(false);
    }

    document.addEventListener("pointerdown", closeOutside);
    window.addEventListener("keydown", closeEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("keydown", closeEscape);
    };
  }, [navOpen]);

  function isActive(href: string) {
    return href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 hidden border-b border-slate-800 bg-slate-950/95 text-white shadow-lg shadow-black/20 backdrop-blur-xl md:block">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-6">
        <Link href="/" className="shrink-0" aria-label="Time100 home">
          <Image
            src="/logo/time100-logo-dark.svg"
            alt="Time100, Turn Ideas Into Reality"
            width={360}
            height={110}
            priority
            className="h-auto w-48 xl:w-56"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-xl px-3 py-2 text-sm font-bold transition-colors ${
                isActive(item.href)
                  ? "bg-blue-500/15 text-blue-200"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {getNavLabel(item, language)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div ref={navRef} className="relative lg:hidden">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={navOpen}
              aria-label={zh ? "打开导航菜单" : "Open navigation menu"}
              onClick={() => setNavOpen((value) => !value)}
              className="flex h-11 items-center gap-2 rounded-xl border border-slate-700 px-4 text-sm font-bold text-slate-100 transition hover:bg-slate-800 active:scale-95"
            >
              <span aria-hidden="true" className="text-lg">☰</span>
              {zh ? "菜单" : "Menu"}
            </button>

            <AnimatedDropdown
              open={navOpen}
              className="absolute right-0 top-[calc(100%+0.75rem)] w-64 rounded-3xl border border-slate-700 bg-slate-900 p-2 shadow-2xl shadow-black/50"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setNavOpen(false)}
                  className={`block min-h-12 rounded-2xl px-4 py-3 text-base font-semibold transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-500/15 text-blue-200"
                      : "text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {getNavLabel(item, language)}
                </Link>
              ))}
            </AnimatedDropdown>
          </div>

          <UserMenu language={language} companionName={companionName} />
        </div>
      </div>
    </header>
  );
}
