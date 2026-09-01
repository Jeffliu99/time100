"use client";

import { Button } from "@/components/ui/Button";
import type { Language } from "@/types";

export default function FormActions({
  language,
  submitting,
  canSubmit,
  onCancel,
}: {
  language: Language;
  submitting: boolean;
  canSubmit: boolean;
  onCancel: () => void;
}) {
  const zh = language === "zh";

  return (
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      <Button type="button" variant="secondary" disabled={submitting} onClick={onCancel}>
        {zh ? "取消" : "Cancel"}
      </Button>
      <Button
        type="submit"
        loading={submitting}
        loadingText={zh ? "正在保存..." : "Saving..."}
        disabled={!canSubmit}
      >
        {zh ? "保存任务" : "Save Task"}
      </Button>
    </div>
  );
}
