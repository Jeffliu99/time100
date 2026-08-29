"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import type { Language, Theme, UserPreferences } from "@/types";

interface Props {
  preferences: UserPreferences;
  onLanguageChange: (language: Language) => void;
  onThemeChange: (theme: Theme) => void;
  onUndo: () => Promise<void> | void;
  onRedo: () => Promise<void> | void;
  canUndo: boolean;
  canRedo: boolean;
  slogan: string;
}

export default function DashboardHeader({
  preferences,
  onLanguageChange,
  onThemeChange,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  slogan,
}: Props) {
  const { data: session, status } = useSession();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const nickname =
    session?.user?.displayName?.trim() ||
    session?.user?.name?.trim() ||
    (preferences.language === "zh" ? "用户" : "User");

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isChinese = preferences.language === "zh";

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
        <div>
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
            Time100
          </h1>
          <p className="text-sm text-slate-500">{slogan}</p>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => void onUndo()}
            disabled={!canUndo}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {isChinese ? "撤销" : "Undo"}
          </button>

          <button
            type="button"
            onClick={() => void onRedo()}
            disabled={!canRedo}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {isChinese ? "重做" : "Redo"}
          </button>

          <button
            type="button"
            onClick={() =>
              onLanguageChange(isChinese ? "en" : "zh")
            }
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {isChinese ? "English" : "中文"}
          </button>

          <button
            type="button"
            onClick={() =>
              onThemeChange(
                preferences.theme === "light" ? "dark" : "light"
              )
            }
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            aria-label={
              preferences.theme === "light"
                ? "Enable dark theme"
                : "Enable light theme"
            }
          >
            {preferences.theme === "light" ? "◐" : "☀"}
          </button>

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
                  <img
                    src={session.user.image}
                    alt={nickname}
                    className="h-8 w-8 rounded-full object-ull bg-blue-600 text-sm font-bold text-white"
                  />
                ) : (
                  <span
                      style={{
                        width: "32px",
                        height: "32px",
                        flexShrink: 0,
                      }}
                      className="flex items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white"
                    >
                      {nickname.slice(0, 1).toUpperCase()}
                    </span>
                )}

                <span className="hidden max-w-24 truncate text-sm font-semibold sm:inline">
                  {nickname}
                </span>

                <span
                  aria-hidden="true"
                  className={`text-xs text-slate-500 transition-transform ${
                    showMenu ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {showMenu && (
                <div
                  role="menu"
                  className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="border-b border-slate-200 px-3 py-3 dark:border-slate-700">
                    <p className="truncate font-semibold">{nickname}</p>
                    {session.user.email && (
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {session.user.email}
                      </p>
                    )}
                  </div>

                  <nav className="py-2" aria-label="User menu">
                    <Link
                      href="/settings/profile"
                      role="menuitem"
                      onClick={() => setShowMenu(false)}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      👤 {isChinese ? "我的档案" : "My profile"}
                    </Link>

                    <Link
                      href="/companion"
                      role="menuitem"
                      onClick={() => setShowMenu(false)}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      🤖 {isChinese ? "成长伙伴" : "Growth companion"}
                    </Link>

                    <Link
                      href="/timeline"
                      role="menuitem"
                      onClick={() => setShowMenu(false)}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      📈 {isChinese ? "成长时间轴" : "Growth timeline"}
                    </Link>

                    <Link
                      href="/settings"
                      role="menuitem"
                      onClick={() => setShowMenu(false)}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      ⚙️ {isChinese ? "设置" : "Settings"}
                    </Link>
                  </nav>

                  <div className="border-t border-slate-200 pt-2 dark:border-slate-700">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => void signOut({ callbackUrl: "/login" })}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
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
