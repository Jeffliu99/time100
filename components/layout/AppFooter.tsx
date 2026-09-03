import Image from "next/image";
import Link from "next/link";
import type { Language } from "@/types";
import { NAV_ITEMS, getNavLabel } from "./nav.config";

export default function AppFooter({ language }: { language: Language }) {
  return (
    <footer className="hidden border-t border-slate-800 bg-slate-950 text-white md:block">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <Image
            src="/logo/time100-logo-dark.svg"
            alt="Time100, Turn Ideas Into Reality"
            width={360}
            height={110}
            className="h-auto w-48"
          />
          <p className="mt-3 text-sm text-slate-400">Turn Ideas Into Reality</p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-slate-300" aria-label="Footer navigation">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white">
              {getNavLabel(item, language)}
            </Link>
          ))}
          <Link href="/contact" className="hover:text-white">
            {language === "zh" ? "联系我们" : "Contact"}
          </Link>
        </nav>
      </div>

      <div className="border-t border-slate-800 px-6 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Time100
      </div>
    </footer>
  );
}
