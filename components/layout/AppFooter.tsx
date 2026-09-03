"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Language } from "@/types";

type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

interface AppFooterProps {
  language: Language;
  socialLinks?: SocialLink[];
}

const defaultSocialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
    icon: "f",
  },
  {
    label: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    icon: "◎",
  },
  {
    label: "LinkedIn",
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    icon: "in",
  },
  {
    label: "YouTube",
    href: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "",
    icon: "▶",
  },
].filter((item) => item.href);

export default function AppFooter({
  language,
  socialLinks = defaultSocialLinks,
}: AppFooterProps) {
  const zh = language === "zh";
  const [shareStatus, setShareStatus] = useState<"idle" | "shared" | "copied">(
    "idle",
  );

  async function shareTime100() {
    const shareData = {
      title: "Time100",
      text: zh
        ? "Time100，帮助你把想法变成现实。"
        : "Time100 helps turn ideas into reality.",
      url: window.location.origin,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus("shared");
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setShareStatus("copied");
      }

      window.setTimeout(() => setShareStatus("idle"), 2200);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      console.error("Unable to share Time100", error);
    }
  }

  const shareLabel =
    shareStatus === "shared"
      ? zh
        ? "已分享"
        : "Shared"
      : shareStatus === "copied"
        ? zh
          ? "链接已复制"
          : "Link copied"
        : zh
          ? "分享 Time100"
          : "Share Time100";

  return (
    <footer className="hidden border-t border-slate-800 bg-slate-950 text-white md:block">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.35fr_1fr_1fr]">
        <section>
          <Link href="/" aria-label="Time100 dashboard" className="inline-block">
            <Image
              src="/logo/time100-logo-dark.svg"
              alt="Time100, Turn Ideas Into Reality"
              width={360}
              height={110}
              className="h-auto w-48"
            />
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            {zh
              ? "帮助用户查看现状、创建行动，并规划成长旅程。"
              : "Helping people review the present, create action, and plan their growth journey."}
          </p>

          <button
            type="button"
            onClick={() => void shareTime100()}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 text-sm font-bold text-blue-200 transition hover:border-blue-400 hover:bg-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <span aria-hidden="true">↗</span>
            {shareLabel}
          </button>
        </section>

        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-slate-200">
            {zh ? "帮助与支持" : "Help & Support"}
          </h2>

          <nav className="mt-4 grid gap-3 text-sm font-semibold text-slate-400">
            <FooterLink href="/faqs" label={zh ? "常见问题" : "FAQs"} />
            <FooterLink href="/guide" label={zh ? "使用指南" : "Guide"} />
            <FooterLink href="/contact" label={zh ? "联系我们" : "Contact Us"} />
            <FooterLink
              href="/contact?topic=feedback"
              label={zh ? "提交反馈" : "Send Feedback"}
            />
            <FooterLink
              href="/contact?topic=bug"
              label={zh ? "报告问题" : "Report an Issue"}
            />
          </nav>
        </section>

        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-slate-200">
            {zh ? "关注 Time100" : "Follow Time100"}
          </h2>

          {socialLinks.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={item.label}
                  className="flex h-11 min-w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm font-black text-slate-300 transition hover:border-blue-500/50 hover:text-white"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-6 text-slate-500">
              {zh
                ? "社交媒体账号将在配置后显示。"
                : "Social accounts will appear after they are configured."}
            </p>
          )}
        </section>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Time100</p>

          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            <FooterLink href="/privacy" label={zh ? "隐私政策" : "Privacy"} />
            <FooterLink href="/terms" label={zh ? "使用条款" : "Terms"} />
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="transition hover:text-white">
      {label}
    </Link>
  );
}
