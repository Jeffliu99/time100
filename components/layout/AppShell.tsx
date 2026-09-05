"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import {
  CreateProvider,
  useCreate,
} from "@/components/create/CreateContext";
import CreatePanel from "@/components/create/CreatePanel";
import AppFooter from "@/components/layout/AppFooter";
import AppHeader from "@/components/layout/AppHeader";
import MobileBottomNav from "@/components/mobile/MobileBottomNav";
import MobileCreateOverlay from "@/components/mobile/MobileCreateOverlay";
import MobileHeader from "@/components/mobile/MobileHeader";
import MobileSwipeNavigation from "@/components/mobile/MobileSwipeNavigation";
import { Time100Provider } from "@/components/providers/Time100Provider";
import type { Language } from "@/types";

interface AppShellProps {
  language: Language;
  companionName?: string | null;
  userName?: string | null;
  userImage?: string | null;
  children: ReactNode;
  enableSwipeNavigation?: boolean;
}

export default function AppShell(props: AppShellProps) {
  return (
    <CreateProvider>
      <Time100Provider>
        <AppShellContent {...props} />
      </Time100Provider>
    </CreateProvider>
  );
}

function AppShellContent({
  language,
  companionName,
  userName,
  userImage,
  children,
  enableSwipeNavigation = true,
}: AppShellProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { open, openCreate, closeCreate } = useCreate();

  useEffect(() => {
    if (pathname !== "/dashboard" || searchParams.get("create") !== "1") return;
    openCreate();
    window.history.replaceState(null, "", "/dashboard");
  }, [openCreate, pathname, searchParams]);

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
      <MobileHeader
        language={language}
        companionName={companionName}
        userName={userName}
        userImage={userImage}
      />

      <AppHeader language={language} companionName={companionName} />

      {enableSwipeNavigation ? (
        <MobileSwipeNavigation>{pageContent}</MobileSwipeNavigation>
      ) : (
        pageContent
      )}

      <MobileBottomNav language={language} />

      <MobileCreateOverlay open={open} language={language} onClose={closeCreate}>
        <CreatePanel language={language} />
      </MobileCreateOverlay>

      <AppFooter language={language} />
    </div>
  );
}
