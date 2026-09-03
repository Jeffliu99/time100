import Image from "next/image";
import Link from "next/link";
import type { HomeLanguage } from "./home-copy";
import { getHomeCopy } from "./home-copy";

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

export default function PublicFooter({
  language,
}: {
  language: HomeLanguage;
}) {
  const copy = getHomeCopy(language).footer;
  const zh = language === "zh";

  const productLinks: FooterLink[] = [
    { href: "/", label: zh ? "主页" : "Home" },
    { href: "/features", label: zh ? "核心功能" : "Features" },
    { href: "/compare", label: zh ? "产品对比" : "Compare" },
    { href: "/pricing", label: zh ? "价格方案" : "Pricing" },
    { href: "/guide", label: zh ? "使用指南" : "Guide" },
  ];

  const companyLinks: FooterLink[] = [
    { href: "/about", label: zh ? "关于我们" : "About" },
    { href: "/contact", label: zh ? "联系我们" : "Contact" },
    { href: "/faqs", label: zh ? "常见问题" : "FAQs" },
    { href: "/login", label: zh ? "登录" : "Log in" },
  ];

  const legalLinks: FooterLink[] = [
    { href: "/privacy", label: zh ? "隐私政策" : "Privacy Policy" },
    { href: "/terms", label: zh ? "使用条款" : "Terms of Use" },
  ];

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
        <section>
          <Link href="/" aria-label={zh ? "Time100 主页" : "Time100 home"}>
            <Image
              src="/logo/time100-logo-dark.svg"
              alt="Time100"
              width={360}
              height={110}
              className="h-auto w-44"
            />
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            {copy.description}
          </p>

          <a
            href="mailto:hello@time100.ca"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-700 px-4 text-sm font-bold text-slate-200 transition hover:border-blue-500/60 hover:bg-slate-900 hover:text-white"
          >
            <span aria-hidden="true">✉️</span>
            hello@time100.ca
          </a>
        </section>

        <FooterColumn title={copy.product} links={productLinks} />

        <FooterColumn
          title={copy.company}
          links={companyLinks}
        />

        <FooterColumn title={copy.legal} links={legalLinks} />
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Time100</p>
          <p>
            {zh
              ? "把想法变成现实，把行动沉淀为成长。"
              : "Turn ideas into reality and action into growth."}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <section>
      <h2 className="text-sm font-black uppercase tracking-[0.16em] text-slate-200">
        {title}
      </h2>

      <nav className="mt-4 grid gap-3 text-sm font-semibold text-slate-400">
        {links.map((item) =>
          item.external ? (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className="transition hover:text-white"
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
            </Link>
          ),
        )}
      </nav>
    </section>
  );
}
