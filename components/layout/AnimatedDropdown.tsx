"use client";

import type { ReactNode } from "react";

interface Props {
  open: boolean;
  children: ReactNode;
  className?: string;
}

export default function AnimatedDropdown({
  open,
  children,
  className = "",
}: Props) {
  return (
    <div
      aria-hidden={!open}
      className={`origin-top-right transition-all duration-200 ease-out ${
        open
          ? "visible translate-y-0 scale-100 opacity-100"
          : "invisible pointer-events-none -translate-y-2 scale-95 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
