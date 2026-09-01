"use client";

import { useEffect, useReducer } from "react";
import { CompanionAvatar } from "./CompanionAvatar";
import { LevelCelebration } from "./LevelCelebration";
import { LevelReveal } from "./LevelReveal";
import { audioEngine } from "@/lib/audio/audio-engine";
import { companionSounds } from "@/lib/audio/companion-sounds";
import { COMPANION_LEVEL_UP_EVENT } from "@/lib/companion/events";
import {
  companionHouseReducer,
  initialCompanionHouseState,
  type LevelUpPayload,
} from "@/lib/companion/house-machine";
import {
  createLevelUpMessage,
  selectWelcomeMessage,
} from "@/lib/companion/messages";

import {
  playCompanionSound,
} from "@/lib/audio/companion-audio";

const TIMING = {
  opening: 300,
  message: 5000,
  levelEntering: 300,
  levelReveal: 700,
  celebration: 1800,
  dialogExit: 200,
  returning: 300,
} as const;

type CompanionHouseProps = {
  companionName: string;
  companionAvatar: string;
};

export function CompanionHouse({
  companionName,
  companionAvatar,
}: CompanionHouseProps) {
  const [state, dispatch] = useReducer(
    companionHouseReducer,
    initialCompanionHouseState,
  );

  useEffect(() => {
    void audioEngine.preload(companionSounds);
  }, []);

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
    let nextEvent: Parameters<typeof dispatch>[0] | null = null;

    switch (state.phase) {
      case "OPENING":
        delay = TIMING.opening;
        nextEvent = { type: "OPEN_COMPLETE" };
        break;
      case "TALKING":
        delay = TIMING.message;
        nextEvent = { type: "MESSAGE_COMPLETE" };
        break;
      case "LEVEL_UP_ENTERING":
        delay = TIMING.levelEntering;
        nextEvent = { type: "ENTRANCE_COMPLETE" };
        break;
      case "LEVEL_UP_REVEAL":
        delay = TIMING.levelReveal;
        nextEvent = state.levelUp
          ? {
              type: "LEVEL_REVEALED",
              message: createLevelUpMessage(state.levelUp),
            }
          : null;
        break;
      case "LEVEL_UP_CELEBRATING":
        delay = TIMING.celebration;
        nextEvent = { type: "CELEBRATION_COMPLETE" };
        break;
      case "DISMISSING":
        delay = TIMING.dialogExit;
        nextEvent = { type: "DIALOG_HIDDEN" };
        break;
      case "RETURNING":
        delay = TIMING.returning;
        nextEvent = { type: "RETURN_COMPLETE" };
        break;
    }

    if (delay === null || nextEvent === null) return;

    const timer = window.setTimeout(() => dispatch(nextEvent), delay);
    return () => window.clearTimeout(timer);
  }, [state.phase, state.levelUp]);

  async function handleHouseClick() {
    
    void playCompanionSound("houseOpen");

    try {
      await audioEngine.init();
      await audioEngine.load("halo", companionSounds.halo);
      await audioEngine.play("halo", {
        volume: 0.25,
        fadeIn: 0.05,
        fadeOut: 0.25,
      });
    } catch (error) {
      console.error("Unable to play house sound", error);
    }

    try {
      const response = await fetch("/api/companion/recall", {
        cache: "no-store",
      });

      if (response.ok) {
        const result = await response.json();

        if (result.message) {
          dispatch({
            type: "HOUSE_CLICKED",
            message: result.message,
          });
          return;
        }
      }
    } catch (error) {
      console.error("Unable to recall companion message", error);
    }

    dispatch({
      type: "HOUSE_CLICKED",
      message: selectWelcomeMessage(),
    });
  }

  const disabled = !["IDLE", "TALKING"].includes(state.phase);

  return (
    <aside
      aria-label={`${companionName} companion house`}
      className="pointer-events-none fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-4 z-50 sm:right-6"
    >
      <div className="relative h-52 w-72">

        <LevelReveal phase={state.phase} levelUp={state.levelUp} />

        <LevelCelebration phase={state.phase} levelUp={state.levelUp} />

        <CompanionAvatar
          phase={state.phase}
          companionName={companionName}
          companionAvatar={companionAvatar}
          message={state.message}
        />

        <button
          type="button"
          onClick={() => void handleHouseClick()}
          disabled={disabled}
          aria-label={
            state.phase === "IDLE"
              ? `Open ${companionName}'s house`
              : `${companionName} is outside`
          }
          className="pointer-events-auto absolute bottom-0 right-0 z-30 grid h-16 w-20 touch-manipulation place-items-center rounded-2xl border border-white/10 bg-slate-900 text-3xl shadow-xl transition-[transform,opacity] duration-200 ease-out hover:scale-[1.03] hover:opacity-95 active:scale-95 disabled:cursor-default disabled:opacity-80 motion-reduce:transform-none motion-reduce:transition-none"
        >
          <span aria-hidden="true">🏠</span>
        </button>
      </div>
    </aside>
  );
}
