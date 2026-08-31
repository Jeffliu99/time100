"use client";

import Image from "next/image";
import { useEffect } from "react";

type Props = {
  name: string;
  avatar: string;
  onComplete: () => void;
};

export default function CompanionMoveIn({
  name,
  avatar,
  onComplete,
}: Props) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 2600);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-slate-950/85 backdrop-blur-sm">
      <div className="move-in-companion">
        <div className="companion-glow" />

        {avatar}

        <p className="relative mt-3 text-center text-2xl font-black text-white">
          {name}
        </p>
      </div>

      <div className="move-in-house" aria-hidden="true">
        🏠
      </div>

      <p className="absolute inset-x-4 bottom-28 text-center font-semibold text-blue-200">
        {name} is moving into your growth world...
      </p>
    </div>
  );
}