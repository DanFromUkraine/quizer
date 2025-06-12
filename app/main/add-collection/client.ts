"use client";
import { getOrInitSS, setSS } from "@/app/lib/other";
import { useState } from "react";

export function useSyncIDs() {
  const location = "cardIDs";
  const get = () => getOrInitSS<string[]>(location, []);
  const [state, setState] = useState<string[]>(get);
  const addCard = () => {
    const newID = crypto.randomUUID();
    const lastState = get();
    const newState = [...lastState, newID];
    setSS(location, newState);
    setState(newState); // force update
  };

  return [state, addCard] as const;
}
