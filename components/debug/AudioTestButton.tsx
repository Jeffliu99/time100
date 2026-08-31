"use client";

import { audioEngine } from "@/lib/audio/audio-engine";

export default function AudioTestButton() {
  async function testSound() {
    await audioEngine.init();

    await audioEngine.load(
      "select",
      "/sounds/companion-select.mp3",
    );

    await audioEngine.play(
      "select",
      {
        volume: 0.3,
      },
    );
  }

  return (
    <button
      onClick={testSound}
      className="rounded-xl bg-blue-600 px-4 py-2 text-white"
    >
      Test Audio
    </button>
  );
}
