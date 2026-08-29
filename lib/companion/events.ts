import type { LevelUpPayload } from "./house-machine";

export const COMPANION_LEVEL_UP_EVENT = "time100:companion-level-up";

export function announceCompanionLevelUp(payload: LevelUpPayload): void {
  window.dispatchEvent(
    new CustomEvent<LevelUpPayload>(COMPANION_LEVEL_UP_EVENT, {
      detail: payload,
    }),
  );
}
