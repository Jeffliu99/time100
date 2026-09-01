"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/Button";
import type { Language } from "@/types";
import type { DatePreset } from "./types";
import { datePickerClass, legendClass } from "./styles";
import { parseLocalDate, toLocalDateValue } from "./utils";

interface Props {
  value: string;
  preset: DatePreset;
  language: Language;
  onChange: (value: string, preset: DatePreset) => void;
}

export default function DueDateSelector({ value, preset, language, onChange }: Props) {
  const zh = language === "zh";

  function chooseToday() {
    onChange(toLocalDateValue(new Date()), "today");
  }

  function chooseTomorrow() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    onChange(toLocalDateValue(date), "tomorrow");
  }

  return (
    <fieldset>
      <legend className={legendClass}>{zh ? "截止日期" : "Due date"}</legend>
      <div className="flex flex-wrap items-start gap-2">
        <Button type="button" variant="secondary" pressed={preset === "today"} onClick={chooseToday}>
          📅 {zh ? "今天" : "Today"}
        </Button>
        <Button type="button" variant="secondary" pressed={preset === "tomorrow"} onClick={chooseTomorrow}>
          🌅 {zh ? "明天" : "Tomorrow"}
        </Button>

        <div className="min-w-[170px]">
          <DatePicker
            selected={parseLocalDate(value)}
            onChange={(date: Date | null) =>
              onChange(date ? toLocalDateValue(date) : "", date ? "custom" : null)
            }
            dateFormat={zh ? "yyyy年MM月dd日" : "yyyy-MM-dd"}
            placeholderText={zh ? "📆 选择日期" : "📆 Choose date"}
            isClearable
            popperPlacement="bottom-start"
            className={`${datePickerClass} ${
              preset === "custom" ? "border-blue-400 ring-2 ring-blue-400/30" : ""
            }`}
          />
        </div>

        {value && (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange("", null)}>
            {zh ? "清除" : "Clear"}
          </Button>
        )}
      </div>

      {value && (
        <p className="mt-2 text-xs text-slate-400">
          {zh ? "已选择：" : "Selected: "}{value}
        </p>
      )}
    </fieldset>
  );
}
