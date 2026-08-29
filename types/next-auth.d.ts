import "next-auth";

declare module "next-auth" {
  interface User {
    displayName?: string | null;
    companionName?: string | null;
  }

  interface Session {
    user: {
      id: string;
      displayName?: string | null;
      companionName?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
