"use client";

import { createContext, ReactNode, use, useCallback, useState } from "react";

const FlushSignalContext = createContext<{
  signal: boolean;
  setSignalToFlush: () => void;
}>({
  signal: false,
  setSignalToFlush: () => console.warn("default createContext dull function"),
});

export function FlushSignalContextWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [signal, setSignal] = useState(false);
  const setSignalToFlush = useCallback(() => {
    setSignal(true);
  }, []);

  return (
    <FlushSignalContext.Provider value={{ signal, setSignalToFlush }}>
      {children}
    </FlushSignalContext.Provider>
  );
}

export const useFlushSignal = () => use(FlushSignalContext)