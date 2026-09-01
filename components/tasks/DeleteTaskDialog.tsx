"use client";

import ConfirmDialog from "@/components/ui/ConfirmDialog";
import type { Language } from "@/types";

type Props = {
  open: boolean;
  taskTitle: string;
  language: Language;
  loading?: boolean;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
};

export default function DeleteTaskDialog({ open, taskTitle, language, loading = false, onConfirm, onCancel }: Props) {
  const zh = language === "zh";
  return (
    <ConfirmDialog
      open={open}
      variant="danger"
      title={zh ? "删除待办任务" : "Delete To Do task"}
      description={zh ? `确定删除“${taskTitle}”吗？\n此操作无法撤销。` : `Delete “${taskTitle}”?\nThis action cannot be undone.`}
      confirmText={zh ? "确认删除" : "Delete task"}
      cancelText={zh ? "取消" : "Cancel"}
      loading={loading}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
