"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useCreate } from "@/components/create/CreateContext";
import type { Language } from "@/types";
import { mobileRoutes } from "./mobile-nav";

interface Props {
  language: Language;
}

export default function MobileBottomNav({ language }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { open, toggleCreate, closeCreate } = useCreate();
  const zh = language === "zh";

  const dashboardActive =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const timelineActive =
    pathname === "/timeline" || pathname.startsWith("/timeline/");

  function handleCreate() {
    if (dashboardActive) {
      toggleCreate();
      return;
    }

    closeCreate();
    router.push("/dashboard?create=1");
  }

  return (
    <nav
      aria-label={zh ? "主要导航" : "Primary navigation"}
      className="fixed inset-x-0 bottom-0 z-50 h-[calc(5rem+env(safe-area-inset-bottom))] border-t border-slate-600 bg-slate-900/95 px-4 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl md:hidden"
    >
      <div className="grid h-20 grid-cols-3 items-center">
        <NavItem
          href={mobileRoutes[0].href}
          icon={mobileRoutes[0].icon}
          label={zh ? mobileRoutes[0].zh : mobileRoutes[0].en}
          active={dashboardActive}
        />

        <button
          type="button"
          onClick={handleCreate}
          aria-label={zh ? "创建" : "Create"}
          aria-expanded={dashboardActive ? open : false}
          className="mx-auto -mt-7 flex h-16 w-16 flex-col items-center justify-center rounded-full border-4 border-slate-900 bg-gradient-to-br from-blue-500 via-blue-600 to-violet-600 font-bold text-white shadow-[0_8px_28px_rgba(59,130,246,0.5)] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:scale-90"
        >
          <span
            aria-hidden="true"
            className={`text-2xl leading-none transition-transform duration-300 ${
              dashboardActive && open ? "rotate-45" : "rotate-0"
            }`}
          >
            ＋
          </span>
          <span className="mt-0.5 text-xs">{zh ? "创建" : "Create"}</span>
        </button>

        <NavItem
          href={mobileRoutes[1].href}
          icon={mobileRoutes[1].icon}
          label={zh ? mobileRoutes[1].zh : mobileRoutes[1].en}
          active={timelineActive}
        />
      </div>
    </nav>
  );
}

function NavItem({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: string;
  label: string;
  active: boolean;
}) {
  const className = `mx-auto flex min-w-24 flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-sm font-bold transition-colors ${
    active
      ? "cursor-default bg-slate-800 text-slate-500"
      : "text-slate-200 hover:bg-blue-500/10 hover:text-blue-200"
  }`;

  if (active) {
    return (
      <span aria-current="page" aria-disabled="true" className={className}>
        <span aria-hidden="true" className="text-2xl grayscale">
          {icon}
        </span>
        <span>{label}</span>
      </span>
    );
  }

  return (
    <Link href={href} className={className}>
      <span aria-hidden="true" className="text-2xl">
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}
