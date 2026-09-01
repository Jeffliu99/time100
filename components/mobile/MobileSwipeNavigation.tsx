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

  function handleStart(event: TouchEvent<HTMLDivElement>) {
    startX.current = event.touches[0].clientX;
    startY.current = event.touches[0].clientY;
    blocked.current = isInteractive(event.target);
  }

  function handleEnd(event: TouchEvent<HTMLDivElement>) {
    if (blocked.current || startX.current === null || startY.current === null) return;

    const deltaX = event.changedTouches[0].clientX - startX.current;
    const deltaY = event.changedTouches[0].clientY - startY.current;
    startX.current = null;
    startY.current = null;

    if (Math.abs(deltaX) < 90 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.35) return;
    if (pathname === "/" && deltaX < 0) router.push("/timeline");
    if (pathname.startsWith("/timeline") && deltaX > 0) router.push("/");
  }

  return (
    <div className="h-full md:contents" onTouchStart={handleStart} onTouchEnd={handleEnd}>
      {children}
    </div>
  );
}
