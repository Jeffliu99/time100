"use client";

import { type ReactNode, useCallback, useState } from "react";
import type { Language } from "@/types";
import MobileHeader from "./MobileHeader";
import MobileBottomNav from "./MobileBottomNav";
import MobileCreateOverlay from "./MobileCreateOverlay";
import MobileSwipeNavigation from "./MobileSwipeNavigation";

interface Props {
  language: Language;
  desktopHeader?: ReactNode;
  children: ReactNode;
  createContent?: (close: () => void) => ReactNode;
}

export default function MobileAppShell({
  language,
  desktopHeader,
  children,
  createContent,
}: Props) {
  const [createOpen, setCreateOpen] = useState(false);
  const closeCreate = useCallback(() => setCreateOpen(false), []);

  return (
    <div className="h-[100dvh] overflow-hidden bg-slate-950 text-white md:h-auto md:min-h-screen md:overflow-visible">
      <MobileHeader language={language} />
     
      <div className="hidden md:block">{desktopHeader}</div>

      <MobileSwipeNavigation>
        <main className="h-full overflow-y-auto overscroll-y-contain pt-18 pb-[calc(80px+env(safe-area-inset-bottom))] md:h-auto md:overflow-visible md:p-0">
          {children}
        </main>
      </MobileSwipeNavigation>

      <MobileBottomNav
        language={language}
        createOpen={createOpen}
        onCreate={() => setCreateOpen((value) => !value)}
      />

      {createContent && (
        <MobileCreateOverlay open={createOpen} language={language} onClose={closeCreate}>
          {createContent(closeCreate)}
        </MobileCreateOverlay>
      )}
    </div>
  );
}
