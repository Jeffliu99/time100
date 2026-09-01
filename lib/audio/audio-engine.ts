"use client";

export type SoundPlayOptions = {
  volume?: number;
  fadeIn?: number;
  fadeOut?: number;
  playbackRate?: number;
};

type ActiveSound = {
  source: AudioBufferSourceNode;
  gain: GainNode;
};

class AudioEngine {
  private context: AudioContext | null = null;
  private buffers = new Map<string, AudioBuffer>();
  private loading = new Map<string, Promise<void>>();
  private active = new Map<string, Set<ActiveSound>>();
  private muted = false;
  private masterVolume = 1;

  async init() {
    if (typeof window === "undefined") return;

    if (!this.context) {
      this.context = new AudioContext();
    }

    if (this.context.state === "suspended") {
      await this.context.resume();
    }
  }

  setMuted(value: boolean) {
    this.muted = value;
  }

  setMasterVolume(value: number) {
    this.masterVolume = Math.min(Math.max(value, 0), 1);
  }

  async load(name: string, url: string) {
    if (this.buffers.has(name)) return;

    const existing = this.loading.get(name);
    if (existing) return existing;

    const task = (async () => {
      await this.init();
      if (!this.context) return;

      const response = await fetch(url, { cache: "force-cache" });
      if (!response.ok) {
        throw new Error(`Unable to load sound: ${url}`);
      }

      const data = await response.arrayBuffer();
      const buffer = await this.context.decodeAudioData(data);
      this.buffers.set(name, buffer);
    })();

    this.loading.set(name, task);

    try {
      await task;
    } finally {
      this.loading.delete(name);
    }
  }

  async preload(sounds: Record<string, string>) {
    const results = await Promise.allSettled(
      Object.entries(sounds).map(([name, url]) => this.load(name, url)),
    );

    for (const result of results) {
      if (result.status === "rejected") {
        console.warn("Sound preload failed", result.reason);
      }
    }
  }

  async play(name: string, options: SoundPlayOptions = {}) {
    if (this.muted) return;

    await this.init();
    if (!this.context) return;

    const buffer = this.buffers.get(name);
    if (!buffer) {
      console.warn(`Sound is not loaded: ${name}`);
      return;
    }

    const volume = Math.max((options.volume ?? 0.3) * this.masterVolume, 0.001);
    const fadeIn = Math.max(options.fadeIn ?? 0, 0);
    const fadeOut = Math.max(options.fadeOut ?? 0, 0);
    const playbackRate = Math.max(options.playbackRate ?? 1, 0.1);
    const now = this.context.currentTime;
    const duration = buffer.duration / playbackRate;

    const source = this.context.createBufferSource();
    const gain = this.context.createGain();
    const activeSound = { source, gain };

    source.buffer = buffer;
    source.playbackRate.setValueAtTime(playbackRate, now);
    source.connect(gain);
    gain.connect(this.context.destination);

    gain.gain.setValueAtTime(fadeIn > 0 ? 0.001 : volume, now);

    if (fadeIn > 0) {
      gain.gain.exponentialRampToValueAtTime(volume, now + Math.min(fadeIn, duration));
    }

    if (fadeOut > 0 && duration > fadeOut) {
      const fadeStart = now + duration - fadeOut;
      gain.gain.setValueAtTime(volume, fadeStart);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    }

    const collection = this.active.get(name) ?? new Set<ActiveSound>();
    collection.add(activeSound);
    this.active.set(name, collection);

    source.onended = () => {
      collection.delete(activeSound);
      source.disconnect();
      gain.disconnect();
    };

    source.start(now);
  }

  stop(name: string, fadeOut = 0.15) {
    if (!this.context) return;

    const collection = this.active.get(name);
    if (!collection) return;

    const now = this.context.currentTime;

    for (const sound of collection) {
      sound.gain.gain.cancelScheduledValues(now);
      sound.gain.gain.setValueAtTime(
        Math.max(sound.gain.gain.value, 0.001),
        now,
      );
      sound.gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + Math.max(fadeOut, 0.01),
      );
      sound.source.stop(now + Math.max(fadeOut, 0.01) + 0.02);
    }
  }
}

export const audioEngine = new AudioEngine();
