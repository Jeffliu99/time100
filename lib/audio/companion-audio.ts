"use client";

import { audioEngine } from "./audio-engine";
import {
  companionSoundOptions,
  companionSounds,
  type CompanionSoundCue,
} from "./companion-sounds";

let preloadPromise: Promise<void> | null = null;

export function preloadCompanionSounds() {
  preloadPromise ??= audioEngine.preload(companionSounds);
  return preloadPromise;
}

export async function playCompanionSound(cue: CompanionSoundCue) {
  await audioEngine.init();
  await audioEngine.load(cue, companionSounds[cue]);
  await audioEngine.play(cue, companionSoundOptions[cue]);
}
