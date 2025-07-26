"use client";

import { createContext, ReactNode, use, useEffect, useState } from "react";
import { usePendingStoreContext } from "./PendingStoreProvider";

const AllPendingReadyContext = createContext(false);

export function AllPendingReadyContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { subscribe } = usePendingStoreContext();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribe((newVal) => {
      if (newVal.length === 0) {
        setReady(true);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AllPendingReadyContext.Provider value={ready}>
      {children}
    </AllPendingReadyContext.Provider>
  );
}

export const useAllPendingReadyContext = () => use(AllPendingReadyContext);
