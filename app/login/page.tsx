"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
      router.refresh();
    }
  }, [router, status]);

  async function handleGoogleLogin() {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (cause) {
      console.error("Google sign-in failed", cause);
      setError("Unable to start Google sign-in. Please try again.");
      setLoading(false);
    }
  }

  const busy = loading || status === "loading" || status === "authenticated";

  return (
    <main className="dark flex min-h-dvh items-center justify-center bg-slate-950 px-4 py-8 text-white sm:px-6">
      <section className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-6 text-center shadow-2xl shadow-black/30 sm:p-10">
        <div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500/15 to-violet-500/15 text-6xl ring-1 ring-white/10"
          aria-hidden="true"
        >
          🌱
        </div>

        <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
          Time100
        </h1>

        <p className="mt-4 text-lg text-slate-300">
          Turn Ideas Into Reality
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Growth Operating System • v1.0 RC1
        </p>

        <button
          type="button"
          onClick={() => void handleGoogleLogin()}
          disabled={busy}
          aria-busy={busy}
          className="mt-10 flex min-h-14 w-full touch-manipulation items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 font-bold text-slate-900 shadow-lg transition hover:bg-slate-100 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 motion-reduce:transform-none"
        >
          {busy ? (
            <>
              <span
                className="h-5 w-5 animate-spin rounded-full border-2 border-slate-400 border-t-slate-900 motion-reduce:animate-none"
                aria-hidden="true"
              />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <GoogleIcon />
              <span>Continue with Google</span>
            </>
          )}
        </button>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-red-900/70 bg-red-950/40 px-4 py-3 text-sm text-red-300"
          >
            {error}
          </p>
        )}

        <p className="mt-8 text-sm text-slate-500">
          Projects • Tasks • Timeline • Companion
        </p>

        <p className="mt-6 text-xs leading-5 text-slate-600">
          By continuing, you agree to use Time100 with your Google account.
        </p>
      </section>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
    >
      <path
        fill="#4285F4"
        d="M21.35 12.27c0-.7-.06-1.22-.2-1.76H12v3.31h5.37a4.59 4.59 0 0 1-1.99 3.01v2.15h3.22c1.88-1.74 2.75-4.3 2.75-6.71Z"
      />
      <path
        fill="#34A853"
        d="M12 21.75c2.7 0 4.95-.89 6.6-2.77l-3.22-2.15c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.6-4.12H3.08v2.22A9.98 9.98 0 0 0 12 21.75Z"
      />
      <path
        fill="#FBBC05"
        d="M6.4 13.67a6 6 0 0 1 0-3.84V7.61H3.08A9.98 9.98 0 0 0 2 12c0 1.58.38 3.08 1.08 4.39l3.32-2.72Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.21c1.47 0 2.78.5 3.81 1.49l2.86-2.87A9.58 9.58 0 0 0 12 2.25a9.98 9.98 0 0 0-8.92 5.36L6.4 10.33C7.2 7.97 9.4 6.21 12 6.21Z"
      />
    </svg>
  );
}
