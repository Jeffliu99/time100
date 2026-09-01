import Link from "next/link";
import type { CompanionPhase } from "@/lib/companion/house-machine";

type Props = {
  phase: CompanionPhase;
  message: string | null;
};

export function NovaDialog({ phase, message }: Props) {
  const visible = Boolean(message) && ["TALKING", "REMEMBERING", "LEVEL_UP_CELEBRATING"].includes(phase);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
         className={`
absolute
bottom-50
right-7
z-20
w-72
rounded-2xl
border border-white/10
bg-slate-900/95
px-4 py-3
text-sm leading-6
text-white
shadow-xl
transition-[transform,opacity]
duration-200
ease-out
motion-reduce:transform-none
motion-reduce:transition-none
${visible
  ? "translate-y-0 opacity-100"
  : "pointer-events-none translate-y-2 opacity-0"}
                    `}
    >
      <p>{message}</p>
      <Link href="/timeline" className="mt-3 inline-flex text-xs font-semibold text-cyan-300 hover:opacity-80">
        View Timeline →
      </Link>
    </div>
  );
}
