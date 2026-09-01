import type { FormEventHandler, ReactNode } from "react";

interface Props {
  icon: string;
  title: string;
  description?: string;
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  busy?: boolean;
  maxWidth?: "4xl" | "5xl";
}

export default function CreateFormShell({
  icon,
  title,
  description,
  children,
  onSubmit,
  busy = false,
  maxWidth = "4xl",
}: Props) {
  const widthClass = maxWidth === "5xl" ? "max-w-5xl" : "max-w-4xl";

  return (
    <div className={`mx-auto w-full ${widthClass}`}>
      <form
        onSubmit={onSubmit}
        className="rounded-3xl border border-slate-700 bg-slate-800/90 p-4 shadow-lg sm:p-5"
      >
        <fieldset disabled={busy} aria-busy={busy} className="space-y-5">
          <header className="border-b border-slate-700 pb-4">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="text-2xl">{icon}</span>
              <div>
                <h2 className="text-lg font-bold text-white">{title}</h2>
                {description && (
                  <p className="mt-1 text-sm text-slate-400">{description}</p>
                )}
              </div>
            </div>
          </header>

          {children}
        </fieldset>
      </form>
    </div>
  );
}
