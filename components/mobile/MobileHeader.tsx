"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Language } from "@/types";

interface MobileHeaderProps {
  language: Language;
  companionName?: string | null;
}

export default function MobileHeader({
  language,
  companionName,
}: MobileHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const zh = language === "zh";

  const houseName = zh
    ? `${companionName?.trim() || "伙伴"}的小屋`
    : `${companionName?.trim() || "Companion"}'s House`;

  useEffect(() => {
    if (!menuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-700 bg-slate-900/95 px-4 text-white shadow-lg shadow-black/30 backdrop-blur-md md:hidden">
      <Link href="/" className="flex min-w-0 flex-col leading-none">
        <span className="text-xl font-extrabold tracking-wide text-white">
          TIME100
        </span>
        <span className="mt-1 truncate text-xs font-medium text-slate-300">
          Turn Ideas Into Reality
        </span>
      </Link>

      <div ref={menuRef} className="relative">
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-label={zh ? "打开个人菜单" : "Open profile menu"}
          onClick={() => setMenuOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-xl shadow-md transition active:scale-95"
        >
          <span aria-hidden="true">👤</span>
        </button>

        {menuOpen && (
          <div
            role="menu"
            className="absolute right-0 top-14 w-64 overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 p-2 shadow-2xl shadow-black/50"
          >
            <MenuLink
              href="/settings/profile"
              icon="👤"
              label={zh ? "我的资料" : "My Profile"}
              onClick={closeMenu}
            />

            <MenuLink
              href="/settings"
              icon="⚙️"
              label={zh ? "设置" : "Settings"}
              onClick={closeMenu}
            />

            <div className="my-2 border-t border-slate-700" />

            <MenuLink
              href="/companion"
              icon="🏡"
              label={houseName}
              onClick={closeMenu}
            />

            <div className="my-2 border-t border-slate-700" />

            <MenuLink
              href="/guide"
              icon="📖"
              label={zh ? "使用指南" : "Guide"}
              onClick={closeMenu}
            />

            <MenuLink
              href="/about"
              icon="ℹ️"
              label={zh ? "关于 Time100" : "About Time100"}
              onClick={closeMenu}
            />

            <MenuLink
              href="/contact"
              icon="✉️"
              label={zh ? "联系我们" : "Contact Us"}
              onClick={closeMenu}
            />
          </div>
        )}
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
      role="menuitem"
      onClick={onClick}
      className="flex min-h-12 items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold text-slate-100 transition hover:bg-slate-800 focus-visible:bg-slate-800 focus-visible:outline-none"
    >
      <span aria-hidden="true">{icon}</span>
      <span className="min-w-0 truncate">{label}</span>
    </Link>
  );
}
