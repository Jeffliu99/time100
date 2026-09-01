"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Language } from "@/types";
import { mobileRoutes } from "./mobile-nav";

export default function MobilePageTabs({ language }: { language: Language }) {
  const pathname = usePathname();
  const zh = language === "zh";

  return (
    <nav className="fixed inset-x-0 top-14 z-30 grid h-11 grid-cols-2 border-b border-slate-800 bg-slate-950/95 px-4 backdrop-blur md:hidden">
      {mobileRoutes.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center justify-center border-b-2 text-sm font-semibold ${
              active ? "border-blue-400 text-white" : "border-transparent text-slate-500"
            }`}
          >
            {zh ? item.zh : item.en}
          </Link>
        );
      })}
    </nav>
  );
}
