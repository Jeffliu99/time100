"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import type { Language } from "@/types";
import AnimatedDropdown from "./AnimatedDropdown";

interface UserMenuProps {
  language: Language;
  companionName?: string | null;
  compact?: boolean;
}

export default function UserMenu({
  language,
  companionName,
  compact = false,
}: UserMenuProps) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [profileCompanionName, setProfileCompanionName] = useState<string | null>(
    companionName ?? null,
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const zh = language === "zh";

  useEffect(() => {
    setProfileCompanionName(companionName ?? null);
  }, [companionName]);

  useEffect(() => {
    if (
      status !== "authenticated" ||
      companionName !== undefined ||
      profileCompanionName
    ) {
      return;
    }

    const controller = new AbortController();

    async function loadProfile() {
      try {
        const response = await fetch("/api/profile", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) return;

        const profile = (await response.json()) as {
          companionName?: string | null;
        };

        setProfileCompanionName(profile.companionName?.trim() || null);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error("Unable to load profile menu data", error);
      }
    }

    void loadProfile();
    return () => controller.abort();
  }, [companionName, profileCompanionName, status]);

  useEffect(() => {
    if (!open) return;

    function closeOutside(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function closeEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", closeOutside);
    window.addEventListener("keydown", closeEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("keydown", closeEscape);
    };
  }, [open]);

  if (status !== "authenticated" || !session?.user) return null;

  const nickname =
    session.user.displayName?.trim() ||
    session.user.name?.trim() ||
    (zh ? "用户" : "User");

  const houseName = zh
    ? `${profileCompanionName || "伙伴"}的小屋`
    : `${profileCompanionName || "Companion"}'s House`;

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={zh ? "打开用户菜单" : "Open user menu"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 items-center gap-2 rounded-xl border border-slate-700 px-2.5 text-white transition hover:bg-slate-800 active:scale-95"
      >
        {session.user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={session.user.image}
            alt=""
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">
            {nickname.slice(0, 1).toUpperCase()}
          </span>
        )}

        {!compact && (
          <span className="hidden max-w-28 truncate text-sm font-bold xl:block">
            {nickname}
          </span>
        )}

        <span
          aria-hidden="true"
          className={`text-xs transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <AnimatedDropdown
        open={open}
        className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-72 rounded-3xl border border-slate-700 bg-slate-900 p-2 shadow-2xl shadow-black/50"
      >
        <MenuLink
          href="/settings/profile"
          label={zh ? "我的资料" : "My Profile"}
          icon="👤"
          onClick={closeMenu}
        />
        <MenuLink
          href="/settings"
          label={zh ? "设置" : "Settings"}
          icon="⚙️"
          onClick={closeMenu}
        />

        <div className="my-2 border-t border-slate-700" />

        <MenuLink
          href="/companion"
          label={houseName}
          icon="🏡"
          onClick={closeMenu}
        />
        <MenuLink
          href="/guide"
          label={zh ? "使用指南" : "Guide"}
          icon="📖"
          onClick={closeMenu}
        />
        <MenuLink
          href="/contact"
          label={zh ? "联系我们" : "Contact Us"}
          icon="✉️"
          onClick={closeMenu}
        />

        <div className="my-2 border-t border-slate-700" />

        <button
          type="button"
          role="menuitem"
          onClick={() => void signOut({ callbackUrl: "/" })}
          className="flex min-h-12 w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-base font-semibold text-red-400 transition hover:bg-red-950/30"
        >
          <span aria-hidden="true">🚪</span>
          {zh ? "退出登录" : "Log out"}
        </button>
      </AnimatedDropdown>
    </div>
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
      className="flex min-h-12 items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold text-slate-100 transition hover:bg-slate-800"
    >
      <span aria-hidden="true">{icon}</span>
      <span className="min-w-0 truncate">{label}</span>
    </Link>
  );
}
