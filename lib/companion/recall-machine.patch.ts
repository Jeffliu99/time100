// Merge these additions into the existing house-machine.ts.

export type RecallPhase = "LOADING_RECALL" | "REMEMBERING";

export type RecallEvent =
  | { type: "RECALL_REQUESTED" }
  | { type: "RECALL_RECEIVED"; message: string }
  | { type: "RECALL_FAILED"; message: string };

// Reducer cases:
// case "RECALL_REQUESTED":
//   return state.phase === "IDLE"
//     ? { ...state, phase: "LOADING_RECALL" }
//     : state;
//
// case "RECALL_RECEIVED":
// case "RECALL_FAILED":
//   return state.phase === "LOADING_RECALL"
//     ? { ...state, phase: "REMEMBERING", message: event.message }
//     : state;
//
// MESSAGE_COMPLETE should accept TALKING or REMEMBERING.
