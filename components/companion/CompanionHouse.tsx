"use client";

import { useEffect, useReducer } from "react";
import { LevelCelebration } from "./LevelCelebration";
import { LevelReveal } from "./LevelReveal";
import { NovaAvatar } from "./NovaAvatar";
import { NovaDialog } from "./NovaDialog";
import {
  companionHouseReducer,
  initialCompanionHouseState,
  type LevelUpPayload,
} from "@/lib/companion/house-machine";
import {
  COMPANION_LEVEL_UP_EVENT,
} from "@/lib/companion/events";
import {
  createLevelUpMessage,
  selectWelcomeMessage,
} from "@/lib/companion/messages";

const TIMING = {
  opening: 300,
  message: 5000,
  levelEntering: 300,
  levelReveal: 700,
  celebration: 1800,
  dialogExit: 200,
  returning: 300,
} as const;

export function CompanionHouse() {
  const [state, dispatch] = useReducer(
    companionHouseReducer,
    initialCompanionHouseState,
  );

  useEffect(() => {
    function receiveLevelUp(event: Event) {
      const payload = (event as CustomEvent<LevelUpPayload>).detail;
      if (!payload) return;
      dispatch({ type: "LEVEL_UP_RECEIVED", payload });
    }

    window.addEventListener(COMPANION_LEVEL_UP_EVENT, receiveLevelUp);
    return () => {
      window.removeEventListener(COMPANION_LEVEL_UP_EVENT, receiveLevelUp);
    };
  }, []);

  useEffect(() => {
    let delay: number | null = null;
    let event:
      | Parameters<typeof dispatch>[0]
      | null = null;

    switch (state.phase) {
      case "OPENING":
        delay = TIMING.opening;
        event = { type: "OPEN_COMPLETE" };
        break;
      case "TALKING":
        delay = TIMING.message;
        event = { type: "MESSAGE_COMPLETE" };
        break;
      case "LEVEL_UP_ENTERING":
        delay = TIMING.levelEntering;
        event = { type: "ENTRANCE_COMPLETE" };
        break;
      case "LEVEL_UP_REVEAL":
        delay = TIMING.levelReveal;
        event = state.levelUp
          ? {
              type: "LEVEL_REVEALED",
              message: createLevelUpMessage(state.levelUp),
            }
          : null;
        break;
      case "LEVEL_UP_CELEBRATING":
        delay = TIMING.celebration;
        event = { type: "CELEBRATION_COMPLETE" };
        break;
      case "DISMISSING":
        delay = TIMING.dialogExit;
        event = { type: "DIALOG_HIDDEN" };
        break;
      case "RETURNING":
        delay = TIMING.returning;
        event = { type: "RETURN_COMPLETE" };
        break;
    }

    if (delay === null || event === null) return;

    const timer = window.setTimeout(() => dispatch(event), delay);
    return () => window.clearTimeout(timer);
  }, [state.phase, state.levelUp]);

 async function handleHouseClick() {
  try {
    const response =
      await fetch("/api/companion/recall");

    const result =
      await response.json();

    if (result.message) {
      dispatch({
        type: "HOUSE_CLICKED",
        message: result.message,
      });

      return;
    }
  } catch {
  }

  dispatch({
    type: "HOUSE_CLICKED",
    message: selectWelcomeMessage(),
  });
}

  const disabled = !["IDLE", "TALKING"].includes(state.phase);

  return (
    <aside
      aria-label="Nova companion house"
      className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-4 z-50 sm:right-6"
    >
      <div className="relative h-52 w-72">
        <NovaDialog phase={state.phase} message={state.message} />
        <LevelReveal phase={state.phase} levelUp={state.levelUp} />
        <LevelCelebration phase={state.phase} levelUp={state.levelUp} />
        <NovaAvatar phase={state.phase} />

        <button
          type="button"
          onClick={handleHouseClick}
          disabled={disabled}
          aria-label={state.phase === "IDLE" ? "Open Nova's house" : "Nova is outside"}
          className="absolute bottom-0 right-0 z-30 grid h-16 w-20 place-items-center rounded-2xl border border-white/10 bg-slate-900 text-3xl shadow-xl transition-[transform,opacity] duration-200 ease-out hover:scale-[1.03] hover:opacity-95 disabled:cursor-default motion-reduce:transform-none motion-reduce:transition-none"
        >
          <span aria-hidden="true">🏠</span>
        </button>
      </div>
    </aside>
  );
}
