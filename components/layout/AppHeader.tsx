"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import type { Language } from "@/types";
import AnimatedDropdown from "./AnimatedDropdown";
import { NAV_ITEMS, getNavLabel } from "./nav.config";

interface Props {
  language: Language;
  companionName?: string | null;
}

export default function AppHeader({ language, companionName }: Props) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const zh = language === "zh";

  const nickname =
    session?.user?.displayName?.trim() ||
    session?.user?.name?.trim() ||
    (zh ? "用户" : "User");

  const houseName = zh
    ? `${companionName?.trim() || "伙伴"}的小屋`
    : `${companionName?.trim() || "Companion"}'s House`;

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setNavOpen(false);
        setProfileOpen(false);
      }
    }

    function closeEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setNavOpen(false);
        setProfileOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOutside);
    window.addEventListener("keydown", closeEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("keydown", closeEscape);
    };
  }, []);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  function closeMenus() {
    setNavOpen(false);
    setProfileOpen(false);
  }

  return (
    <header
      ref={rootRef}
      className="sticky top-0 z-50 hidden border-b border-slate-800 bg-slate-950/95 text-white shadow-lg shadow-black/20 backdrop-blur-xl md:block"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-6">
        <Link href="/" className="shrink-0" aria-label="Time100 dashboard">
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
          <div className="relative lg:hidden">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={navOpen}
              aria-label={zh ? "打开导航菜单" : "Open navigation menu"}
              onClick={() => {
                setNavOpen((value) => !value);
                setProfileOpen(false);
              }}
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
                  onClick={closeMenus}
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

          <div className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              aria-label={zh ? "打开用户菜单" : "Open user menu"}
              onClick={() => {
                setProfileOpen((value) => !value);
                setNavOpen(false);
              }}
              className="flex h-11 items-center gap-2 rounded-xl border border-slate-700 px-2.5 transition hover:bg-slate-800 active:scale-95"
            >
              {session?.user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={session.user.image}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold">
                  {nickname.slice(0, 1).toUpperCase()}
                </span>
              )}
              <span className="hidden max-w-28 truncate text-sm font-bold xl:block">
                {nickname}
              </span>
              <span
                aria-hidden="true"
                className={`text-xs transition-transform duration-200 ${
                  profileOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            <AnimatedDropdown
              open={profileOpen}
              className="absolute right-0 top-[calc(100%+0.75rem)] w-72 rounded-3xl border border-slate-700 bg-slate-900 p-2 shadow-2xl shadow-black/50"
            >
              <MenuLink href="/settings/profile" label={zh ? "我的资料" : "My Profile"} icon="👤" onClick={closeMenus} />
              <MenuLink href="/settings" label={zh ? "设置" : "Settings"} icon="⚙️" onClick={closeMenus} />
              <div className="my-2 border-t border-slate-700" />
              <MenuLink href="/companion" label={houseName} icon="🏡" onClick={closeMenus} />
              <MenuLink href="/guide" label={zh ? "使用指南" : "Guide"} icon="📖" onClick={closeMenus} />
              <MenuLink href="/contact" label={zh ? "联系我们" : "Contact Us"} icon="✉️" onClick={closeMenus} />
              <div className="my-2 border-t border-slate-700" />
              <button
                type="button"
                onClick={() => void signOut({ callbackUrl: "/login" })}
                className="flex min-h-12 w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-base font-semibold text-red-400 transition hover:bg-red-950/30"
              >
                <span aria-hidden="true">🚪</span>
                {zh ? "退出登录" : "Log out"}
              </button>
            </AnimatedDropdown>
          </div>
        </div>
      </div>
    </header>
  );
}

function MenuLink({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex min-h-12 items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold text-slate-100 transition hover:bg-slate-800"
    >
      <span aria-hidden="true">{icon}</span>
      <span className="min-w-0 truncate">{label}</span>
    </Link>
  );
}
