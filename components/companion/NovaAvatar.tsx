import Image from "next/image";
import type { CompanionPhase } from "@/lib/companion/house-machine";

type Props = { phase: CompanionPhase };

export function NovaAvatar({ phase }: Props) {
  const visible = phase !== "IDLE" && phase !== "RETURNING";
  const celebrating = phase === "LEVEL_UP_CELEBRATING";

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none absolute bottom-14 right-2 z-10 h-24 w-24 transition-[transform,opacity] ease-out motion-reduce:transform-none motion-reduce:transition-none ${
        celebrating ? "duration-700" : "duration-300"
      } ${
        visible
          ? celebrating
            ? "-translate-y-2 opacity-100"
            : "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      }`}
    >
      <Image
        src="/companions/nova.png"
        alt=""
        fill
        priority
        sizes="96px"
        className="object-contain"
      />
    </div>
  );
}
