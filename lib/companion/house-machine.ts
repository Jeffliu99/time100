export type LevelUpPayload = {
  previousLevel: number;
  newLevel: number;
  xpGained: number;
  levelTitle: string;
  unlockedReward?: string;
  sourceEventId?: string;
};

export type CompanionPhase =
  | "IDLE"
  | "OPENING"
  | "TALKING"
  | "LEVEL_UP_ENTERING"
  | "LEVEL_UP_REVEAL"
  | "LEVEL_UP_CELEBRATING"
  | "DISMISSING"
  | "RETURNING";

export type CompanionHouseState = {
  phase: CompanionPhase;
  message: string | null;
  levelUp: LevelUpPayload | null;
};

export type CompanionHouseEvent =
  | { type: "HOUSE_CLICKED"; message: string }
  | { type: "OPEN_COMPLETE" }
  | { type: "MESSAGE_COMPLETE" }
  | { type: "LEVEL_UP_RECEIVED"; payload: LevelUpPayload }
  | { type: "ENTRANCE_COMPLETE" }
  | { type: "LEVEL_REVEALED"; message: string }
  | { type: "CELEBRATION_COMPLETE" }
  | { type: "DIALOG_HIDDEN" }
  | { type: "RETURN_COMPLETE" };

export const initialCompanionHouseState: CompanionHouseState = {
  phase: "IDLE",
  message: null,
  levelUp: null,
};

export function companionHouseReducer(
  state: CompanionHouseState,
  event: CompanionHouseEvent,
): CompanionHouseState {
  switch (event.type) {
    case "HOUSE_CLICKED":
      if (state.phase === "IDLE") {
        return { ...state, phase: "OPENING", message: event.message };
      }
      if (state.phase === "TALKING") {
        return { ...state, message: event.message };
      }
      return state;

    case "OPEN_COMPLETE":
      return state.phase === "OPENING"
        ? { ...state, phase: "TALKING" }
        : state;

    case "MESSAGE_COMPLETE":
      return state.phase === "TALKING"
        ? { ...state, phase: "DISMISSING" }
        : state;

    case "LEVEL_UP_RECEIVED":
      if (state.phase !== "IDLE") return state;
      return {
        phase: "LEVEL_UP_ENTERING",
        message: null,
        levelUp: event.payload,
      };

    case "ENTRANCE_COMPLETE":
      return state.phase === "LEVEL_UP_ENTERING"
        ? { ...state, phase: "LEVEL_UP_REVEAL" }
        : state;

    case "LEVEL_REVEALED":
      return state.phase === "LEVEL_UP_REVEAL"
        ? {
            ...state,
            phase: "LEVEL_UP_CELEBRATING",
            message: event.message,
          }
        : state;

    case "CELEBRATION_COMPLETE":
      return state.phase === "LEVEL_UP_CELEBRATING"
        ? { ...state, phase: "DISMISSING" }
        : state;

    case "DIALOG_HIDDEN":
      return state.phase === "DISMISSING"
        ? { ...state, phase: "RETURNING" }
        : state;

    case "RETURN_COMPLETE":
      return state.phase === "RETURNING"
        ? initialCompanionHouseState
        : state;

    default:
      return state;
  }
}
