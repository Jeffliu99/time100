"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Language } from "@/types";
import { mobileRoutes } from "./mobile-nav";

export default function MobilePageTabs({ language }: { language: Language }) {
  const pathname = usePathname();
  const zh = language === "zh";

  return (
    <nav className="fixed inset-x-0 top-16 z-30 grid h-12 grid-cols-2 border-b border-slate-700 bg-slate-900/95 px-4 shadow-sm backdrop-blur-md md:hidden">
      {mobileRoutes.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center justify-center border-b-[3px] text-base font-bold transition-colors ${
              active
                ? "border-blue-400 text-white"
                : "border-transparent text-slate-300"
            }`}
          >
            {zh ? item.zh : item.en}
          </Link>
        );
      })}
    </nav>
  );
}
