export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "archive"
  | "ghost"
  | "priorityLow"
  | "priorityMedium"
  | "priorityHigh";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export const buttonBase = [
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap",
  "rounded-full font-semibold",
  "transition-all duration-200",
  "hover:-translate-y-0.5 hover:scale-[1.02]",
  "active:translate-y-0.5 active:scale-[0.97] active:shadow-none",
  "focus-visible:outline-none focus-visible:ring-2",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
  "disabled:translate-y-0 disabled:scale-100 disabled:shadow-none",
].join(" ");

export const buttonVariants: Record<ButtonVariant, string> = {
  primary: [
    "bg-gradient-to-r from-blue-600 to-violet-600 text-white",
    "shadow-lg shadow-blue-950/40",
    "hover:from-blue-500 hover:to-violet-500 hover:shadow-blue-500/20",
    "focus-visible:ring-blue-400/70",
  ].join(" "),

  secondary: [
    "border border-slate-700 bg-slate-900 text-slate-300",
    "hover:border-slate-500 hover:bg-slate-800 hover:text-white",
    "focus-visible:ring-slate-400/70",
  ].join(" "),

  success: [
    "border border-emerald-500/40 bg-emerald-500/15 text-emerald-200",
    "hover:border-emerald-400 hover:bg-emerald-500/25",
    "hover:shadow-lg hover:shadow-emerald-500/10",
    "focus-visible:ring-emerald-400/70",
  ].join(" "),

  danger: [
    "border border-red-500/40 bg-red-500/15 text-red-200",
    "hover:border-red-400 hover:bg-red-500/25",
    "hover:shadow-lg hover:shadow-red-500/10",
    "focus-visible:ring-red-400/70",
  ].join(" "),

  warning: [
    "border border-amber-500/40 bg-amber-500/15 text-amber-200",
    "hover:border-amber-400 hover:bg-amber-500/25",
    "hover:shadow-lg hover:shadow-amber-500/10",
    "focus-visible:ring-amber-400/70",
  ].join(" "),

  archive: [
    "border border-cyan-500/40 bg-cyan-500/10 text-cyan-200",
    "shadow-sm shadow-cyan-950/20",
    "hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-100",
    "hover:shadow-lg hover:shadow-cyan-500/10",
    "active:bg-cyan-500/25",
    "focus-visible:ring-cyan-400/70",
    "aria-pressed:border-cyan-300 aria-pressed:bg-cyan-500/25",
    "aria-pressed:ring-2 aria-pressed:ring-cyan-400/30",
  ].join(" "),

  ghost: [
    "text-slate-300",
    "hover:bg-slate-800 hover:text-white",
    "focus-visible:ring-slate-400/70",
  ].join(" "),

  priorityLow: [
    "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    "hover:border-emerald-400 hover:bg-emerald-500/20",
    "focus-visible:ring-emerald-400/70",
    "aria-pressed:ring-2 aria-pressed:ring-emerald-400/40",
  ].join(" "),

  priorityMedium: [
    "border border-amber-500/30 bg-amber-500/10 text-amber-300",
    "hover:border-amber-400 hover:bg-amber-500/20",
    "focus-visible:ring-amber-400/70",
    "aria-pressed:ring-2 aria-pressed:ring-amber-400/40",
  ].join(" "),

  priorityHigh: [
    "border border-red-500/30 bg-red-500/10 text-red-300",
    "hover:border-red-400 hover:bg-red-500/20",
    "focus-visible:ring-red-400/70",
    "aria-pressed:ring-2 aria-pressed:ring-red-400/40",
  ].join(" "),
};

export const buttonSizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 py-1.5 text-sm",
  md: "min-h-11 px-4 py-2 text-sm",
  lg: "min-h-12 px-6 py-3 text-base",
  icon: "h-11 w-11 p-0",
};

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
