"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Language } from "@/types";
import { mobileRoutes } from "./mobile-nav";

export default function MobileBottomNav({ language }: { language: Language }) {
  const pathname = usePathname();
  const zh = language === "zh";

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid h-[calc(4.25rem+env(safe-area-inset-bottom))] grid-cols-2 border-t border-slate-800 bg-slate-950/95 px-6 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      {mobileRoutes.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex flex-col items-center justify-center gap-1 text-xs font-semibold ${
              active ? "text-blue-300" : "text-slate-500"
            }`}
          >
            <span aria-hidden="true" className="text-xl">{item.icon}</span>
            <span>{zh ? item.zh : item.en}</span>
          </Link>
        );
      })}
    </nav>
  );
}
