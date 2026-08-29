"use client";

import { useEffect, useState } from "react";
import { defaultPreferences } from "@/lib/seed";
import type { UserPreferences } from "@/types";

const SETTINGS_KEY = "time100-settings-v1";

export function usePreferences(ready: boolean) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  useEffect(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      try {
        setPreferences(JSON.parse(stored));
      } catch {
        localStorage.removeItem(SETTINGS_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(preferences));
    }
  }, [ready, preferences]);

  return { preferences, setPreferences };
}
