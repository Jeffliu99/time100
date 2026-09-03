"use client";

import { type ReactNode, useCallback, useState } from "react";
import type { Language } from "@/types";

import AppHeader from "@/components/layout/AppHeader";
import AppFooter from "@/components/layout/AppFooter";
import MobileHeader from "@/components/mobile/MobileHeader";
import MobileBottomNav from "@/components/mobile/MobileBottomNav";
import MobileCreateOverlay from "@/components/mobile/MobileCreateOverlay";
import MobileSwipeNavigation from "@/components/mobile/MobileSwipeNavigation";

interface AppShellProps {
  language: Language;
  companionName?: string | null;
  children: ReactNode;

  /**
   * Optional mobile Create content.
   * When omitted, the center Create button remains visible but does nothing.
   */
  createContent?: (close: () => void) => ReactNode;

  /** Disable swipe navigation for pages containing horizontal gestures. */
  enableSwipeNavigation?: boolean;
}

export default function AppShell({
  language,
  companionName,
  children,
  createContent,
  enableSwipeNavigation = true,
}: AppShellProps) {
  const [createOpen, setCreateOpen] = useState(false);

  const closeCreate = useCallback(() => {
    setCreateOpen(false);
  }, []);

  const pageContent = (
    <main
      id="main-content"
      className="h-full overflow-y-auto overscroll-y-contain pt-20 pb-[calc(80px+env(safe-area-inset-bottom))] md:h-auto md:min-h-[calc(100vh-10rem)] md:overflow-visible md:p-0"
    >
      {children}
    </main>
  );

  return (
    <div className="h-[100dvh] overflow-hidden bg-slate-950 text-white md:h-auto md:min-h-screen md:overflow-visible">
      {/* Mobile: compact fixed header */}
      <MobileHeader
        language={language}
        companionName={companionName}
      />

      {/* Tablet/Desktop: responsive top navigation */}
      <AppHeader
        language={language}
        companionName={companionName}
      />

      {/* One shared content tree for all screen sizes */}
      {enableSwipeNavigation ? (
        <MobileSwipeNavigation>{pageContent}</MobileSwipeNavigation>
      ) : (
        pageContent
      )}

      {/* Mobile: fixed View / Create / Plan navigation */}
      <MobileBottomNav
        language={language}
        createOpen={createOpen}
        onCreate={() => {
          if (createContent) {
            setCreateOpen((current) => !current);
          }
        }}
      />

      {/* Mobile Create panel */}
      {createContent && (
        <MobileCreateOverlay
          open={createOpen}
          language={language}
          onClose={closeCreate}
        >
          {createContent(closeCreate)}
        </MobileCreateOverlay>
      )}

      {/* Tablet/Desktop footer */}
      <AppFooter language={language} />
    </div>
  );
}
