"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { CompanionHouse } from "./CompanionHouse";

const HIDDEN_ROUTES = new Set(["/", "/login", "/onboarding", "/onboarding/companion"]);

export function CompanionHouseGate() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status !== "authenticated" || !session?.user || HIDDEN_ROUTES.has(pathname)) {
    return null;
  }

  return <CompanionHouse />;
}
