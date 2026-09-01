"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Language } from "@/types";
import { mobileRoutes } from "./mobile-nav";

interface Props {
  language: Language;
  createOpen: boolean;
  onCreate: () => void;
}

export default function MobileBottomNav({ language, createOpen, onCreate }: Props) {
  const pathname = usePathname();
  const zh = language === "zh";

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 h-[calc(5rem+env(safe-area-inset-bottom))] border-t border-slate-600 bg-slate-900/98 px-4 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl md:hidden">
      <div className="grid h-20 grid-cols-3 items-center">
        <NavItem item={mobileRoutes[0]} language={language} active={pathname === "/"} />

        <button
          type="button"
          onClick={onCreate}
          aria-label={zh ? "创建" : "Create"}
          aria-expanded={createOpen}
          className="mx-auto -mt-7 flex h-16 w-16 items-center justify-center rounded-full border-4 border-slate-900 bg-gradient-to-br from-blue-500 via-blue-600 to-violet-600 text-3xl font-bold text-white shadow-[0_8px_28px_rgba(59,130,246,0.5)] transition-all duration-200 ease-out hover:scale-105 active:scale-90"
        >
          <span className={`transition-transform duration-300 ease-out ${createOpen ? "rotate-45" : "rotate-0"}`}>
            ＋
          </span>
        </button>

        <NavItem
          item={mobileRoutes[1]}
          language={language}
          active={pathname.startsWith("/timeline")}
        />
      </div>
    </nav>
  );
}

function NavItem({
  item,
  language,
  active,
}: {
  item: (typeof mobileRoutes)[number];
  language: Language;
  active: boolean;
}) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`mx-auto flex min-w-24 flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-sm font-bold transition-colors ${
        active
          ? "bg-blue-500/15 text-blue-200"
          : "text-slate-300"
      }`}
    >
      <span aria-hidden="true" className="text-2xl">{item.icon}</span>
      <span>{language === "zh" ? item.zh : item.en}</span>
    </Link>
  );
}
