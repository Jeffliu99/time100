"use client";

import { type ReactNode, type TouchEvent, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

function isInteractive(target: EventTarget | null) {
  return target instanceof Element && Boolean(
    target.closest("button,a,input,textarea,select,[role='dialog'],[data-no-swipe]"),
  );
}

export default function MobileSwipeNavigation({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const blocked = useRef(false);

  function onTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    startX.current = touch.clientX;
    startY.current = touch.clientY;
    blocked.current = isInteractive(event.target);
  }

  function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (blocked.current || startX.current === null || startY.current === null) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - startX.current;
    const deltaY = touch.clientY - startY.current;
    startX.current = null;
    startY.current = null;

    if (Math.abs(deltaX) < 80 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.25) return;
    if (pathname === "/" && deltaX < 0) router.push("/timeline");
    if (pathname.startsWith("/timeline") && deltaX > 0) router.push("/");
  }

  return (
    <div className="h-full md:contents" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {children}
    </div>
  );
}
