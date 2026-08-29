"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <h1>Welcome</h1>

        <p>{session.user?.name}</p>

        <p>{session.user?.email}</p>

        <button onClick={() => signOut()}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/",
        })
      }
    >
      Continue with Google
    </button>
  );
}
