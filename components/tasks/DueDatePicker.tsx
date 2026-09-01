"use client";

import { Button } from "@/components/ui/Button";

type DatePreset = "today" | "tomorrow" | "custom" | null;

type Props = {
  value: string;
  onChange: (value: string) => void;
  preset: DatePreset;
  onPresetChange: (preset: DatePreset) => void;
};

function localDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function DueDatePicker({ value, onChange, preset, onPresetChange }: Props) {
  function chooseToday() {
    onChange(localDateInputValue(new Date()));
    onPresetChange("today");
  }

  function chooseTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    onChange(localDateInputValue(tomorrow));
    onPresetChange("tomorrow");
  }

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-slate-300">Due date</legend>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" pressed={preset === "today"} onClick={chooseToday}>📅 Today</Button>
        <Button variant="secondary" pressed={preset === "tomorrow"} onClick={chooseTomorrow}>🌅 Tomorrow</Button>
        <label className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white focus-within:ring-2 focus-within:ring-blue-400/70">
          📆 Other date
          <input
            type="date"
            value={value}
            onChange={(event) => {
              onChange(event.target.value);
              onPresetChange("custom");
            }}
            className="sr-only"
          />
        </label>
        {value && <Button variant="ghost" size="sm" onClick={() => { onChange(""); onPresetChange(null); }}>Clear</Button>}
      </div>
      {value && <p className="text-sm text-slate-400">Selected: {value}</p>}
    </fieldset>
  );
}
