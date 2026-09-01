"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { buttonBase, buttonSizes, buttonVariants, cn, type ButtonSize, type ButtonVariant } from "./button-styles";

type PopupType = boolean | "menu" | "listbox" | "tree" | "grid" | "dialog";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-busy" | "aria-expanded" | "aria-haspopup" | "aria-pressed"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: ReactNode;
  pressed?: boolean;
  hasPopup?: PopupType;
  expanded?: boolean;
  fullWidth?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    loadingText = "Loading...",
    pressed,
    hasPopup,
    expanded,
    fullWidth = false,
    disabled = false,
    type = "button",
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-pressed={pressed}
      aria-haspopup={hasPopup}
      aria-expanded={hasPopup !== undefined ? expanded : undefined}
      className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], fullWidth && "w-full", loading && "cursor-wait opacity-80", className)}
      {...props}
    >
      {loading ? (
        <>
          <span aria-hidden="true" className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current/30 border-t-current" />
          <span>{loadingText}</span>
        </>
      ) : children}
    </button>
  );
});
