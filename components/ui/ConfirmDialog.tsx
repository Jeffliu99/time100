"use client";

import { useEffect, useId, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { createPortal } from "react-dom";

type DialogVariant = "danger" | "warning" | "success" | "archive";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: DialogVariant;
  loading?: boolean;
  children?: React.ReactNode;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
};

const dialogConfig = {
  danger: { icon: "🗑️", buttonVariant: "danger", border: "border-red-500/30" },
  warning: { icon: "⚠️", buttonVariant: "warning", border: "border-amber-500/30" },
  success: { icon: "✓", buttonVariant: "success", border: "border-emerald-500/30" },
  archive: { icon: "🗂️", buttonVariant: "archive", border: "border-cyan-500/30" },
} as const;

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
  children,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const config = dialogConfig[variant];

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cancelRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !loading) onCancel();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, loading, onCancel]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) onCancel();
      }}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        aria-busy={loading || undefined}
        className={`w-full max-w-md rounded-3xl border ${config.border} bg-slate-900 p-6 text-white shadow-2xl shadow-black/50`}
      >
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="text-2xl">{config.icon}</span>
          <div className="min-w-0 flex-1">
            <h2 id={titleId} className="text-xl font-bold">{title}</h2>
            {description && (
              <p id={descriptionId} className="mt-3 whitespace-pre-line leading-6 text-slate-300">
                {description}
              </p>
            )}
            {children && <div className="mt-4 text-sm text-slate-300">{children}</div>}
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button ref={cancelRef} variant="secondary" disabled={loading} onClick={onCancel}>
            {cancelText}
          </Button>
          <Button
            variant={config.buttonVariant}
            loading={loading}
            loadingText={confirmText}
            onClick={() => void onConfirm()}
          >
            {confirmText}
          </Button>
        </div>
      </section>
    </div>,
    document.body
  );
}
