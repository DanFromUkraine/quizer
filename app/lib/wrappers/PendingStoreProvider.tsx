"use client";

import { createContext, ReactNode, use, useCallback } from "react";
import useRefObservable from "../hooks/refObservable";

const PendingContext = createContext<ReturnType<typeof usePendingStore>>({
  executeAsync: (asyncCallback: () => Promise<void>) => {},
  subscribe: (callback: (newVal: string[]) => void) => () => {},
});

function usePendingStore() {
  const { getValue, set, subscribe } = useRefObservable<string[]>([]);

  const executeAsync = useCallback((asyncCallback: () => Promise<void>) => {
    const id = crypto.randomUUID();
    set([...getValue(), id]);

    asyncCallback().finally(() => {
      set(getValue().filter((i) => i !== id));
    });
  }, []);

  return { executeAsync, subscribe };
}

export function PendingStoreContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const methods = usePendingStore();

  return (
    <PendingContext.Provider value={methods}>
      {children}
    </PendingContext.Provider>
  );
}

export const usePendingStoreContext = () => use(PendingContext);



/*

такс, згідно моєю останньою ідеєю, як це має працювати?


*/