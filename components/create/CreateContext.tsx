"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type CreateContextType = {
  open: boolean;
  openCreate: () => void;
  closeCreate: () => void;
  toggleCreate: () => void;
};

const CreateContext = createContext<CreateContextType | null>(
  null,
);

export function CreateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <CreateContext.Provider
      value={{
        open,
        openCreate: () => setOpen(true),
        closeCreate: () => setOpen(false),
        toggleCreate: () =>
          setOpen((current) => !current),
      }}
    >
      {children}
    </CreateContext.Provider>
  );
}

export function useCreate() {
  const context = useContext(CreateContext);

  if (!context) {
    throw new Error(
      "useCreate must be used within CreateProvider",
    );
  }

  return context;
}