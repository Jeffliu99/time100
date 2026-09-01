"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import type { Language } from "@/types";
import CreateOptions from "./CreateOptions";
import type { CreateType } from "./types";

type Props = {
  open: boolean;
  language: Language;
  canCreateTask: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSelect: (type: CreateType) => void;
};

export default function DesktopCreateMenu({ open, language, canCreateTask, onToggle, onClose, onSelect }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const zh = language === "zh";

  useEffect(() => {
    if (!open) return;
    function closeOutside(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) onClose();
    }
    function closeEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", closeOutside);
    window.addEventListener("keydown", closeEscape);
    return () => {
      document.removeEventListener("mousedown", closeOutside);
      window.removeEventListener("keydown", closeEscape);
    };
  }, [open, onClose]);

  return (
    <div ref={rootRef} className="relative hidden md:block">
      <Button aria-haspopup="menu" aria-expanded={open} onClick={onToggle}>
        ✨ {zh ? "创建" : "Create"} <span aria-hidden="true">▾</span>
      </Button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-3xl border border-slate-700 bg-slate-900 p-3 shadow-2xl shadow-black/40">
          <CreateOptions language={language} canCreateTask={canCreateTask} onSelect={onSelect} />
        </div>
      )}
    </div>
  );
}
