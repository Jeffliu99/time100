"use client";

import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import type { Language } from "@/types";

interface Props {
  open: boolean;
  language: Language;
  children: ReactNode;
  onClose: () => void;
}

export default function MobileCreateOverlay({ open, language, children, onClose }: Props) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-end md:hidden"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-black/35 backdrop-blur-[2px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/80 via-black/35 to-transparent [mask-image:linear-gradient(to_top,black,transparent)] [-webkit-mask-image:linear-gradient(to_top,black,transparent)] backdrop-blur-[5px]" />

      <section
        role="dialog"
        aria-modal="true"
        aria-label={language === "zh" ? "创建" : "Create"}
        className="relative z-10 max-h-[86dvh] w-full animate-[sheet-in_240ms_ease-out] overflow-y-auto rounded-t-3xl border-t border-slate-600 bg-slate-900/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-16px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="h-1.5 w-12 rounded-full bg-slate-500" />
          <button
            type="button"
            onClick={onClose}
            aria-label={language === "zh" ? "关闭" : "Close"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-2xl font-medium text-white transition active:scale-90"
          >
            ×
          </button>
        </div>

        {children}

        <button
          type="button"
          onClick={onClose}
          className="mt-4 min-h-12 w-full rounded-2xl border border-slate-600 bg-slate-800 px-4 text-base font-bold text-slate-100 transition active:scale-[0.98]"
        >
          {language === "zh" ? "取消" : "Cancel"}
        </button>
      </section>
    </div>,
    document.body,
  );
}
