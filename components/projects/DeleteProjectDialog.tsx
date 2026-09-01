"use client";

import ConfirmDialog from "@/components/ui/ConfirmDialog";
import type { Language } from "@/types";

type Props = {
  open: boolean;
  projectTitle: string;
  todoTaskCount: number;
  language: Language;
  loading?: boolean;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
};

export default function DeleteProjectDialog({ open, projectTitle, todoTaskCount, language, loading = false, onConfirm, onCancel }: Props) {
  const zh = language === "zh";
  const description = todoTaskCount === 0
    ? zh
      ? `项目“${projectTitle}”将被永久删除。\n此操作无法撤销。`
      : `Project “${projectTitle}” will be permanently deleted.\nThis action cannot be undone.`
    : zh
      ? `项目“${projectTitle}”及其中 ${todoTaskCount} 个待办任务将被永久删除。\n此操作无法撤销。`
      : `Project “${projectTitle}” and ${todoTaskCount} To Do task${todoTaskCount === 1 ? "" : "s"} will be permanently deleted.\nThis action cannot be undone.`;

  return (
    <ConfirmDialog
      open={open}
      variant="danger"
      title={zh ? "删除项目" : "Delete project"}
      description={description}
      confirmText={zh ? "删除项目" : "Delete project"}
      cancelText={zh ? "取消" : "Cancel"}
      loading={loading}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
