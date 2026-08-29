"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NovaCard } from "./NovaCard";

export function CompanionSetupWizard() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirmNova() {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/companion/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companionType: "NOVA" }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Unable to complete companion setup");
      }

      router.replace("/");
      router.refresh();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to complete companion setup",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <section className="w-full max-w-xl text-center">
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">
        Your growth companion
      </p>
      <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Meet Nova</h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-300 sm:text-base">
        Nova will accompany your growth journey, remember meaningful moments,
        and help your growth world feel alive.
      </p>

      <div className="mt-8">
        <NovaCard />
      </div>

      {error ? (
        <p role="alert" className="mt-5 text-sm text-rose-300">
          {error}
        </p>
      ) : null}

      <button
        type="button"
        onClick={confirmNova}
        disabled={isSubmitting}
        className="mt-7 rounded-full bg-cyan-300 px-7 py-3 font-medium text-slate-950 transition duration-200 ease-out hover:scale-[1.02] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none motion-reduce:transition-none"
      >
        {isSubmitting ? "Starting your journey..." : "Start my journey with Nova"}
      </button>
    </section>
  );
}
