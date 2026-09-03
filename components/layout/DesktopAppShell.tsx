import type { ReactNode } from "react";
import type { Language } from "@/types";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

interface Props {
  language: Language;
  companionName?: string | null;
  children: ReactNode;
}

export default function DesktopAppShell({
  language,
  companionName,
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppHeader language={language} companionName={companionName} />
      <main>{children}</main>
      <AppFooter language={language} />
    </div>
  );
}
