"use client";

import { useEffect } from "react";
import {
  preloadCompanionSounds,
} from "@/lib/audio/companion-audio";

export function AudioBootstrap() {
  useEffect(() => {
    void preloadCompanionSounds();
  }, []);

  return null;
}