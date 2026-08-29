import type { LevelUpPayload } from "./house-machine";

const WELCOME_MESSAGES = [
  "Welcome back. Your growth world is here when you're ready.",
  "I'm here. We can take the next step whenever it feels right.",
  "Let's continue building your growth world.",
] as const;

export function selectWelcomeMessage(): string {
  return WELCOME_MESSAGES[
    Math.floor(Math.random() * WELCOME_MESSAGES.length)
  ];
}

export function createLevelUpMessage(payload: LevelUpPayload): string {
  return `Nova reached Level ${payload.newLevel}: ${payload.levelTitle}.`;
}
