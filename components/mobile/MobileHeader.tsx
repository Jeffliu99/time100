"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { Language } from "@/types";

interface MobileHeaderProps {
  language: Language;
  companionName?: string | null;
  userName?: string | null;
  userImage?: string | null;
}

function isValidImageSource(value?: string | null) {
  if (!value) return false;
  if (value.startsWith("/")) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function MobileHeader({
  language,
  companionName,
  userName,
  userImage,
}: MobileHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const zh = language === "zh";

  const houseName = zh
    ? `${companionName?.trim() || "伙伴"}的小屋`
    : `${companionName?.trim() || "Companion"}'s House`;

  const displayName = userName?.trim() || (zh ? "我的账户" : "My Account");
  const initial = displayName.slice(0, 1).toUpperCase();
  const hasUserImage = isValidImageSource(userImage);

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-slate-900/90 px-4 text-white shadow-lg shadow-black/20 backdrop-blur-xl md:hidden">
      <Link
        href="/"
        className="relative z-10 flex min-w-0 flex-col leading-none"
      >
        <span className="text-xl font-extrabold tracking-wide text-white">
          TIME100
        </span>
        <span className="mt-1 truncate text-xs font-medium text-slate-300">
          Turn Ideas Into Reality
        </span>
      </Link>

      <div className="relative z-20">
        <button
          ref={buttonRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-profile-menu"
          aria-label={zh ? `打开${displayName}的个人菜单` : `Open ${displayName}'s profile menu`}
          onClick={() => setMenuOpen((value) => !value)}
          className={`relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border bg-slate-800 font-bold text-white shadow-md transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:scale-95 ${
            menuOpen
              ? "scale-[1.04] border-blue-300/60 shadow-[0_0_0_4px_rgba(96,165,250,0.12)]"
              : "scale-100 border-white/15"
          }`}
          style={{ willChange: menuOpen ? "transform" : "auto" }}
        >
          {hasUserImage ? (
            <Image
              src={userImage!}
              alt={displayName}
              fill
              sizes="48px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <span aria-hidden="true" className="text-sm font-black">
              {initial || "U"}
            </span>
          )}
          <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-emerald-400" />
        </button>

        <button
          type="button"
          aria-label={zh ? "关闭个人菜单" : "Close profile menu"}
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
          className={`fixed inset-0 z-[-1] bg-black/20 backdrop-blur-[2px] transition-opacity duration-200 ease-out ${
            menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        <div
          id="mobile-profile-menu"
          role="menu"
          aria-hidden={!menuOpen}
          className={`absolute right-0 top-14 w-72 origin-top-right overflow-hidden rounded-[28px] border border-white/15 bg-slate-900/75 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            menuOpen
              ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
              : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
          }`}
          style={{ willChange: menuOpen ? "transform, opacity" : "auto" }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/15 via-white/5 to-transparent" />
          <div className="pointer-events-none absolute left-5 right-5 top-0 h-px bg-white/35" />
          <div className="pointer-events-none absolute -top-8 left-1/2 h-20 w-44 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

          <div className="relative px-3 pb-2 pt-3">
            <p className="truncate text-sm font-extrabold text-white">{displayName}</p>
            <p className="mt-0.5 text-xs text-emerald-300">
              {zh ? "已登录" : "Signed in"}
            </p>
          </div>

          <MenuLink href="/settings/profile" icon="👤" label={zh ? "我的资料" : "My Profile"} onClick={closeMenu} enabled={menuOpen} />
          <MenuLink href="/settings" icon="⚙️" label={zh ? "设置" : "Settings"} onClick={closeMenu} enabled={menuOpen} />

          <div className="relative my-2 border-t border-white/10" />

          <MenuLink href="/companion" icon="🏡" label={houseName} onClick={closeMenu} enabled={menuOpen} />

          <div className="relative my-2 border-t border-white/10" />

          <MenuLink href="/guide" icon="📖" label={zh ? "使用指南" : "Guide"} onClick={closeMenu} enabled={menuOpen} />
          <MenuLink href="/about" icon="ℹ️" label={zh ? "关于 Time100" : "About Time100"} onClick={closeMenu} enabled={menuOpen} />
          <MenuLink href="/contact" icon="✉️" label={zh ? "联系我们" : "Contact Us"} onClick={closeMenu} enabled={menuOpen} />
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
  enabled,
}: {
  href: string;
  icon: string;
  label: string;
  onClick: () => void;
  enabled: boolean;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      tabIndex={enabled ? 0 : -1}
      onClick={onClick}
      className="group relative flex min-h-12 items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold text-slate-100 transition-[transform,background-color] duration-150 hover:bg-white/5 focus-visible:bg-white/10 focus-visible:outline-none active:scale-[0.98] active:bg-white/10"
    >
      <span
        aria-hidden="true"
        className="text-lg transition-transform duration-150 group-active:-translate-y-px group-active:scale-110"
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <span
        aria-hidden="true"
        className="text-xl text-slate-500 transition-transform duration-150 group-active:translate-x-0.5"
      >
        ›
      </span>
    </Link>
  );
}
