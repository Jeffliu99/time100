"use client";

type LoadedSound = {
  buffer: AudioBuffer;
};

type PlayOptions = {
  volume?: number;
  fadeIn?: number;
  fadeOut?: number;
  playbackRate?: number;
};

class AudioEngine {
  private context: AudioContext | null = null;
  private sounds = new Map<string, LoadedSound>();
  private muted = false;

  async init() {
    if (typeof window === "undefined") return;

    if (!this.context) {
      this.context = new AudioContext();
    }

    if (this.context.state === "suspended") {
      await this.context.resume();
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;
  }

  async load(name: string, url: string) {
    await this.init();
    if (!this.context || this.sounds.has(name)) return;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Unable to load sound: ${url}`);

    const arrayBuffer = await response.arrayBuffer();
    const buffer = await this.context.decodeAudioData(arrayBuffer);
    this.sounds.set(name, { buffer });
  }

  async preload(entries: Record<string, string>) {
    const results = await Promise.allSettled(
      Object.entries(entries).map(([name, url]) => this.load(name, url)),
    );

    results.forEach((result) => {
      if (result.status === "rejected") {
        console.warn(result.reason);
      }
    });
  }

  async play(name: string, options: PlayOptions = {}) {
    if (this.muted) return;

    await this.init();
    if (!this.context) return;

    const sound = this.sounds.get(name);
    if (!sound) return;

    const {
      volume = 0.3,
      fadeIn = 0,
      fadeOut = 0,
      playbackRate = 1,
    } = options;

    const source = this.context.createBufferSource();
    const gain = this.context.createGain();
    const now = this.context.currentTime;
    const duration = sound.buffer.duration / playbackRate;

    source.buffer = sound.buffer;
    source.playbackRate.value = playbackRate;
    source.connect(gain);
    gain.connect(this.context.destination);

    if (fadeIn > 0) {
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(Math.max(volume, 0.001), now + fadeIn);
    } else {
      gain.gain.setValueAtTime(volume, now);
    }

    if (fadeOut > 0 && duration > fadeOut) {
      const fadeStart = now + duration - fadeOut;
      gain.gain.setValueAtTime(Math.max(volume, 0.001), fadeStart);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    }

    source.start(now);
    source.stop(now + duration + 0.05);
  }
}

export const audioEngine = new AudioEngine();
