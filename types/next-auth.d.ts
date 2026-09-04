import "next-auth";

declare module "next-auth" {
  interface User {
    role?: "USER" | "AUTHOR" | "EDITOR" | "ADMIN";
    displayName?: string | null;
    companionName?: string | null;
  }

  interface Session {
    user: {
      id: string;
      role?: "USER" | "AUTHOR" | "EDITOR" | "ADMIN";
      displayName?: string | null;
      companionName?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}