"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import type { Language } from "@/types";
import CreateOptions from "./CreateOptions";
import type { CreateType } from "./types";

type Props = {
  open: boolean;
  language: Language;
  canCreateTask: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (type: CreateType) => void;
};

export default function MobileCreateSheet({ open, language, canCreateTask, onOpen, onClose, onSelect }: Props) {
  const zh = language === "zh";

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function closeEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", closeEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", closeEscape);
    };
  }, [open, onClose]);

  return (
    <div className="md:hidden">
      <Button fullWidth onClick={onOpen}>✨ {zh ? "创建" : "Create"}</Button>
      {open && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/70" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
          <section role="dialog" aria-modal="true" aria-label={zh ? "创建" : "Create"} className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-slate-700 bg-slate-900 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-600" />
            <h2 className="mb-4 text-xl font-bold text-white">✨ {zh ? "创建" : "Create"}</h2>
            <CreateOptions language={language} canCreateTask={canCreateTask} onSelect={onSelect} />
            <Button fullWidth variant="secondary" className="mt-4" onClick={onClose}>{zh ? "取消" : "Cancel"}</Button>
          </section>
        </div>,
        document.body,
      )}
    </div>
  );
}
