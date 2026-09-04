import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import Apple from "next-auth/providers/apple";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "database",
  },

  providers: [
    Google,
    MicrosoftEntraID,
    Apple,
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
  session({ session, user }) {
    if (session.user) {
      session.user.id = user.id;

      session.user.role =
        (user as any).role;

      session.user.displayName =
        (user as any).displayName;

      session.user.companionName =
        (user as any).companionName;
    }

    return session;
  },
},
});