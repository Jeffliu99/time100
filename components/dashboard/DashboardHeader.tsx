"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import type { Language, UserPreferences,} from "@/types";

interface Props {
  preferences: UserPreferences;
  slogan: string;
}

const controlClass =
  "rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800";

export default function DashboardHeader({
  preferences,
  slogan,
}: Props)
 {
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isChinese = preferences.language === "zh";
 
  const nickname =
    session?.user?.displayName?.trim() ||
    session?.user?.name?.trim() ||
    (isChinese ? "用户" : "User");

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setShowMenu(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
        <Link href="/" aria-label="Time100 dashboard" className="block shrink-0">
          <Image
            src="/logo/time100-logo-dark.svg"
            alt="Time100, Turn Ideas Into Reality"
            width={360}
            height={110}
            priority
            className="h-auto w-52 sm:w-60"
          />
          <span className="sr-only">{slogan} · v1.0 RC1</span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <Link href="/timeline" className={controlClass}>
            {isChinese ? "时间轴" : "Timeline"}
          </Link>

          {status === "authenticated" && session?.user && (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setShowMenu((current) => !current)}
                className="flex items-center gap-2 rounded-xl border border-slate-300 px-2 py-1.5 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                aria-haspopup="menu"
                aria-expanded={showMenu}
                aria-label={isChinese ? "打开用户菜单" : "Open user menu"}
              >
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.user.image} alt={nickname} className="h-8 w-8 rounded-full bg-blue-600 object-cover" />
                ) : (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {nickname.slice(0, 1).toUpperCase()}
                  </span>
                )}
                <span className="hidden max-w-24 truncate text-sm font-semibold sm:inline">{nickname}</span>
                <span aria-hidden="true" className={`text-xs text-slate-500 transition-transform ${showMenu ? "rotate-180" : ""}`}>▼</span>
              </button>

              {showMenu && (
                <div role="menu" className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
                  <div className="border-b border-slate-200 px-3 py-3 dark:border-slate-700">
                    <p className="truncate font-semibold">{nickname}</p>
                    {session.user.email && <p className="mt-1 truncate text-xs text-slate-500">{session.user.email}</p>}
                  </div>

                  <nav className="py-2" aria-label="User menu">
                    <Link href="/settings/profile" role="menuitem" onClick={() => setShowMenu(false)} className="block rounded-lg px-3 py-2 text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800">
                      👤 {isChinese ? "我的档案" : "My profile"}
                    </Link>
                    <Link href="/companion" role="menuitem" onClick={() => setShowMenu(false)} className="block rounded-lg px-3 py-2 text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800">
                      🤖 {isChinese ? "成长伙伴" : "Growth companion"}
                    </Link>
                    <Link href="/timeline" role="menuitem" onClick={() => setShowMenu(false)} className="block rounded-lg px-3 py-2 text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800">
                      📈 {isChinese ? "成长时间轴" : "Growth timeline"}
                    </Link>
                    <Link href="/settings" role="menuitem" onClick={() => setShowMenu(false)} className="block rounded-lg px-3 py-2 text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800">
                      ⚙️ {isChinese ? "设置" : "Settings"}
                    </Link>
                  </nav>

                  <div className="border-t border-slate-200 pt-2 dark:border-slate-700">
                    <button type="button" role="menuitem" onClick={() => void signOut({ callbackUrl: "/login" })} className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30">
                      🚪 {isChinese ? "退出登录" : "Log out"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
