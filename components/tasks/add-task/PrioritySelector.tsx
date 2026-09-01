"use client";

import { Button } from "@/components/ui/Button";
import type { Language, Priority } from "@/types";
import { legendClass } from "./styles";

const priorities = [
  { value: "LOW", icon: "🌱", en: "Low", zh: "低", variant: "priorityLow" },
  { value: "MEDIUM", icon: "✨", en: "Medium", zh: "中", variant: "priorityMedium" },
  { value: "HIGH", icon: "🔥", en: "High", zh: "高", variant: "priorityHigh" },
] as const;

export default function PrioritySelector({
  value,
  language,
  onChange,
}: {
  value: Priority;
  language: Language;
  onChange: (priority: Priority) => void;
}) {
  const zh = language === "zh";

  return (
    <fieldset>
      <legend className={legendClass}>{zh ? "优先级" : "Priority"}</legend>
      <div className="flex flex-wrap gap-2">
        {priorities.map((item) => (
          <Button
            type="button"
            key={item.value}
            variant={item.variant}
            pressed={value === item.value}
            onClick={() => onChange(item.value)}
          >
            {item.icon} {zh ? item.zh : item.en}
          </Button>
        ))}
      </div>
    </fieldset>
  );
}
