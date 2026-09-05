
"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import { useTime100 } from "@/hooks/useTime100";

type Time100ContextValue =
  ReturnType<typeof useTime100>;

const Time100Context =
  createContext<Time100ContextValue | null>(
    null,
  );

export function Time100Provider({
  children,
}: {
  children: ReactNode;
}) {
  const value = useTime100();

  return (
    <Time100Context.Provider value={value}>
      {children}
    </Time100Context.Provider>
  );
}

export function useTime100Context() {
  const context =
    useContext(Time100Context);

  if (!context) {
    throw new Error(
      "useTime100Context must be used within Time100Provider",
    );
  }

  return context;
}