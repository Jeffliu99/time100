"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Language, TaskStatus } from "@/types";
import { getMessages } from "@/lib/translations";

type Props = {
  status: TaskStatus;
  language: Language;
  busy: boolean;
  taskTitle: string;
  onMove: (status: TaskStatus) => Promise<void> | void;
  onEdit: () => void;
  onDelete: () => Promise<void> | void;
};

export function TaskCardActions({ status, language, busy, taskTitle, onMove, onEdit, onDelete }: Props) {
  const t = getMessages(language);
  const [deleting, setDeleting] = useState(false);

  async function confirmDelete() {
    if (status !== "TODO" || busy || deleting) return;
    const confirmed = window.confirm(
      language === "zh"
        ? `确定删除待办任务“${taskTitle}”吗？此操作无法撤销。`
        : `Delete the To Do task “${taskTitle}”? This action cannot be undone.`,
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      await onDelete();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {status === "TODO" && (
        <>
          <Button size="sm" disabled={busy} onClick={() => void onMove("DOING")}>▶ {t.start}</Button>
          <Button variant="secondary" size="sm" disabled={busy} onClick={onEdit}>✏️ {language === "zh" ? "编辑" : "Edit"}</Button>
          <Button variant="danger" size="sm" className="sm:ml-auto" loading={deleting} loadingText={language === "zh" ? "删除中..." : "Deleting..."} onClick={() => void confirmDelete()}>🗑️ {t.delete}</Button>
        </>
      )}

      {status === "DOING" && (
        <>
          <Button variant="secondary" size="sm" disabled={busy} onClick={() => void onMove("TODO")}>↩ {language === "zh" ? "退回待办" : "Back to To Do"}</Button>
          <Button variant="success" size="sm" disabled={busy} onClick={() => void onMove("DONE")}>✓ {t.finish}</Button>
          <Button variant="secondary" size="sm" disabled={busy} onClick={onEdit}>✏️ {language === "zh" ? "编辑" : "Edit"}</Button>
        </>
      )}

      {status === "DONE" && (
        <>
          <Button variant="secondary" size="sm" disabled={busy} onClick={() => void onMove("DOING")}>↩ {language === "zh" ? "重新进行" : "Reopen"}</Button>
          <Button variant="secondary" size="sm" disabled={busy} onClick={onEdit}>✏️ {language === "zh" ? "编辑" : "Edit"}</Button>
        </>
      )}
    </div>
  );
}
