import type { CompanionMemoryDto } from "./memory-types";

export function createRecallMessage(memory: CompanionMemoryDto): string {
  switch (memory.type) {
    case "PROJECT_COMPLETED":
      return `I remember when you completed ${memory.title}. That became part of your growth journey.`;
    case "TASK_COMPLETED":
      return `I remember the step you completed: ${memory.title}.`;
    case "LEVEL_UP":
      return `I remember when your journey reached ${memory.title}.`;
    case "MILESTONE":
      return `${memory.title} remains an important part of your growth story.`;
    default:
      return `I remember ${memory.title}.`;
  }
}
