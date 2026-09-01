"use client";

import ConfirmDialog from "@/components/ui/ConfirmDialog";
import type { Language } from "@/types";

type Props = {
  open: boolean;
  eventCount: number;
  language: Language;
  loading?: boolean;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
};

export default function ClearTimelineDialog({ open, eventCount, language, loading = false, onConfirm, onCancel }: Props) {
  const zh = language === "zh";
  return (
    <ConfirmDialog
      open={open}
      variant="danger"
      title={zh ? "清空时间线" : "Clear timeline"}
      description={zh
        ? `即将永久删除 ${eventCount} 条成长记录。\n任务和项目不会被删除，但此操作无法撤销。`
        : `${eventCount} growth record${eventCount === 1 ? "" : "s"} will be permanently deleted.\nTasks and projects will remain, but this action cannot be undone.`}
      confirmText={zh ? "确认清空" : "Clear timeline"}
      cancelText={zh ? "取消" : "Cancel"}
      loading={loading}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
