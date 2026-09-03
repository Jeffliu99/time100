import Image from "next/image";
import Link from "next/link";
import type { HomeLanguage } from "./home-copy";
import { getHomeCopy } from "./home-copy";

export default function PublicFooter({ language }: { language: HomeLanguage }) {
  const copy = getHomeCopy(language).footer;

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/logo/time100-logo-dark.svg" alt="Time100" width={360} height={110} className="h-auto w-44" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">{copy.description}</p>
        </div>
        <FooterColumn title={copy.product} links={[["#workflow", "Workflow"], ["#features", "Features"], ["#compare", "Compare"], ["#pricing", "Pricing"]]} />
        <FooterColumn title={copy.company} links={[["#faq", "FAQ"], ["mailto:hello@time100.ca", copy.contact], ["/login", "Login"]]} />
        <FooterColumn title={copy.legal} links={[["#", copy.privacy], ["#", copy.terms]]} />
      </div>
      <div className="border-t border-slate-800 px-4 py-5 text-center text-xs text-slate-500">© {new Date().getFullYear()} Time100</div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return (
    <div>
      <h2 className="text-sm font-black uppercase tracking-[0.16em] text-slate-200">{title}</h2>
      <nav className="mt-4 grid gap-3 text-sm font-semibold text-slate-400">
        {links.map(([href, label]) => href.startsWith("/") ? <Link key={`${href}-${label}`} href={href} className="hover:text-white">{label}</Link> : <a key={`${href}-${label}`} href={href} className="hover:text-white">{label}</a>)}
      </nav>
    </div>
  );
}
