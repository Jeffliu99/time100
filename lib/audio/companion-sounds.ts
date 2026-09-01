import type { SoundPlayOptions } from "./audio-engine";

export type CompanionSoundCue =
  | "select"
  | "halo"
  | "move"
  | "arrival"
  | "houseOpen";

export const companionSounds: Record<CompanionSoundCue, string> = {
  select: "/sounds/companion-select.mp3",
  halo: "/sounds/halo-whoosh.mp3",
  move: "/sounds/move-swish.mp3",
  arrival: "/sounds/arrival-chime.mp3",
  houseOpen: "/sounds/halo-whoosh.mp3",
};

export const companionSoundOptions: Record<
  CompanionSoundCue,
  SoundPlayOptions
> = {
  select: { volume: 0.25, fadeIn: 0.05, fadeOut: 0.12 },
  halo: { volume: 0.2, fadeIn: 0.05, fadeOut: 0.2 },
  move: { volume: 0.25, fadeIn: 0.02, fadeOut: 0.18 },
  arrival: { volume: 0.35, fadeIn: 0.15, fadeOut: 0.8 },
  houseOpen: { volume: 0.22, fadeIn: 0.03, fadeOut: 0.2 },
};
