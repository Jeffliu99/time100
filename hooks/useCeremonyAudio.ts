"use client";

import { useEffect, useRef } from "react";
import {
  playCompanionSound,
  preloadCompanionSounds,
} from "@/lib/audio/companion-audio";

export type CeremonyPhase =
  | "APPEAR"
  | "GREETING"
  | "MOVE_IN"
  | "WELCOME"
  | "COMPLETE";

export function useCeremonyAudio(phase: CeremonyPhase) {
  const lastPhase = useRef<CeremonyPhase | null>(null);

  useEffect(() => {
    void preloadCompanionSounds();
  }, []);

  useEffect(() => {
    if (lastPhase.current === phase) return;
    lastPhase.current = phase;

    switch (phase) {
      case "APPEAR":
        void playCompanionSound("select");
        break;
      case "GREETING":
        void playCompanionSound("halo");
        break;
      case "MOVE_IN":
        void playCompanionSound("move");
        break;
      case "WELCOME":
        void playCompanionSound("arrival");
        break;
      case "COMPLETE":
        break;
    }
  }, [phase]);
}
