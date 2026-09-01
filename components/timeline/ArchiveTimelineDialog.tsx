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

export default function ArchiveTimelineDialog({ open, eventCount, language, loading = false, onConfirm, onCancel }: Props) {
  const zh = language === "zh";
  return (
    <ConfirmDialog
      open={open}
      variant="archive"
      title={zh ? "归档时间线" : "Archive timeline"}
      description={zh
        ? `即将归档 ${eventCount} 条成长记录。\n记录将从当前时间线隐藏，但不会被删除。`
        : `${eventCount} growth record${eventCount === 1 ? "" : "s"} will be archived.\nThe records will be hidden from the current timeline, not deleted.`}
      confirmText={zh ? "确认归档" : "Archive timeline"}
      cancelText={zh ? "取消" : "Cancel"}
      loading={loading}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <ul className="list-inside list-disc space-y-1 text-slate-400">
        <li>{zh ? "任务与项目保持不变" : "Tasks and projects remain unchanged"}</li>
        <li>{zh ? "成长记录可在归档中心恢复" : "Growth records can be restored from the archive"}</li>
      </ul>
    </ConfirmDialog>
  );
}
