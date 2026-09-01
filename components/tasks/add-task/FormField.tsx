import type { ReactNode } from "react";
import { legendClass } from "./styles";

export default function FormField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={legendClass}>
        {label}
      </label>
      {children}
    </div>
  );
}
