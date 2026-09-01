"use client";

import { Button } from "@/components/ui/Button";
import type { Language, TaskStatus } from "@/types";
import { getMessages } from "@/lib/translations";

type Props = {
  status: TaskStatus;
  language: Language;
  busy: boolean;
  onMove: (status: TaskStatus) => Promise<void> | void;
  onEdit: () => void;
  onDelete: () => Promise<void> | void;
};

export function TaskCardActions({
  status,
  language,
  busy,
  onMove,
  onEdit,
  onDelete,
}: Props) {
  const t = getMessages(language);

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {status !== "TODO" && (
        <Button
          variant="secondary"
          size="sm"
          disabled={busy}
          onClick={() => void onMove(status === "DONE" ? "DOING" : "TODO")}
        >
          ↩ {t.moveBack}
        </Button>
      )}

      {status === "TODO" && (
        <Button size="sm" disabled={busy} onClick={() => void onMove("DOING")}>
          ▶ {t.start}
        </Button>
      )}

      {status === "DOING" && (
        <Button
          variant="success"
          size="sm"
          disabled={busy}
          onClick={() => void onMove("DONE")}
        >
          ✓ {t.finish}
        </Button>
      )}

      <Button variant="secondary" size="sm" disabled={busy} onClick={onEdit}>
        ✏️ {language === "en" ? "Edit" : "编辑"}
      </Button>

      <Button
        variant="danger"
        size="sm"
        disabled={busy}
        className="sm:ml-auto"
        onClick={() => void onDelete()}
      >
        🗑️ {t.delete}
      </Button>
    </div>
  );
}
