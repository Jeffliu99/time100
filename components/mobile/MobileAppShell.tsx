"use client";

import type { ReactNode } from "react";
import type { Language } from "@/types";
import MobileHeader from "./MobileHeader";
import MobilePageTabs from "./MobilePageTabs";
import MobileBottomNav from "./MobileBottomNav";
import MobileSwipeNavigation from "./MobileSwipeNavigation";

interface Props {
  language: Language;
  desktopHeader?: ReactNode;
  children: ReactNode;
}

export default function MobileAppShell({ language, desktopHeader, children }: Props) {
  return (
    <div className="h-[100dvh] overflow-hidden bg-slate-950 text-white md:h-auto md:min-h-screen md:overflow-visible">
      <MobileHeader language={language} />
      <MobilePageTabs language={language} />
      <div className="hidden md:block">{desktopHeader}</div>

      <MobileSwipeNavigation>
        <main className="h-full overflow-y-auto overscroll-y-contain pt-[100px] pb-[calc(68px+env(safe-area-inset-bottom))] md:h-auto md:overflow-visible md:p-0">
          {children}
        </main>
      </MobileSwipeNavigation>

      <MobileBottomNav language={language} />
    </div>
  );
}
