"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <h1 className="mb-4 text-3xl font-bold">
            🌱 Time100
          </h1>

          <p className="mb-2">{session.user?.name}</p>

          <p className="mb-6 text-slate-400">
            {session.user?.email}
          </p>

          <button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center shadow-2xl">
        <div className="mb-6 text-6xl">
          🌱
        </div>

        <h1 className="mb-3 text-4xl font-black">
          Time100
        </h1>

        <p className="mb-2 text-slate-300">
          Turn Ideas Into Reality
        </p>

        <p className="mb-8 text-sm text-slate-500">
          Growth Operating System • v1.0 RC1
        </p>

        <button
          onClick={() =>
            signIn("google", {
              callbackUrl: "/dashboard",
            })
          }
          className="w-full rounded-xl bg-white px-6 py-4 font-semibold text-slate-900 transition hover:bg-slate-200"
        >
          Continue with Google
        </button>

        <p className="mt-8 text-sm text-slate-500">
          Projects • Tasks • Timeline • Nova
        </p>
      </div>
    </main>
  );
}