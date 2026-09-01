"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import  CompanionHouse  from "./CompanionHouse";

type CompanionProfile = {
  profileCompleted: boolean;

  preferredLanguage?: string;

  companionName: string | null;
  companionAvatar: string | null;

  companionType?: string | null;
  companionLevel?: number | null;
  companionXp?: number | null;
};

const HIDDEN_ROUTES = new Set([
  "/",
  "/login",
  "/onboarding",
  "/onboarding/companion",
]);

export function CompanionHouseGate() {
  const pathname = usePathname();
  const { status } = useSession();
  const [profile, setProfile] =
    useState<CompanionProfile | null>(null);

  useEffect(() => {
    if (status !== "authenticated") {
      setProfile(null);
      return;
    }

    const controller = new AbortController();

    async function loadProfile() {
      try {
        const response = await fetch("/api/profile", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) return;

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error("Unable to load companion profile", error);
      }
    }

    void loadProfile();

    return () => controller.abort();
  }, [status]);

  if (
    status !== "authenticated" ||
    HIDDEN_ROUTES.has(pathname) ||
    !profile?.profileCompleted ||
    !profile.companionName ||
    !profile.companionAvatar
  ) {
    return null;
  }

  return (
    <CompanionHouse
  language={profile.preferredLanguage === "zh" ? "zh" : "en"}
  companionName={profile.companionName ?? null}
  companionType={profile.companionType ?? null}
  companionAvatar={profile.companionAvatar ?? null}
  companionLevel={profile.companionLevel ?? 1}
  companionXp={profile.companionXp ?? 0}
/>
  );
}