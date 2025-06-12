"use client";

import { RefObject, useCallback, useRef, useSyncExternalStore } from "react";
import { QuestionCard } from "../page";

export function useSyncIDs() {
  const storeLocation = "cardIDs";
  const storage = typeof window !== "undefined" ? sessionStorage : null;

  const getIDs = (): string[] =>
    JSON.parse(storage?.getItem(storeLocation) || "[]");

  const IDs = useRef<string[]>(getIDs());

  const { subscribe, getSnapshot, getServerSnapshot, emitChange, updateRef } =
    useSyncInterface<string[]>(IDs, [], getIDs);

  const addID = () => {
    storage?.setItem(
      storeLocation,
      JSON.stringify([...IDs.current, crypto.randomUUID()])
    );
    updateRef();
    emitChange();
  };

  const deleteID = (id: string) => {
    const newIDs = IDs.current.filter((el) => el !== id);
    storage?.setItem(storeLocation, JSON.stringify(newIDs));
    updateRef();
    emitChange();
  };

  const returnIDs = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return {
    IDs: returnIDs,
    addID,
    deleteID,
  };
}

function useSyncInterface<T>(
  resultRef: RefObject<T>,
  serverDumbObj: T,
  get: () => T
) {
  const listeners = useRef<(() => void)[]>([]);

  const emitChange = () => listeners.current.forEach((l) => l());
  const subscribe = useCallback((listener: () => void) => {
    listeners.current.push(listener);

    return () => {
      listeners.current = listeners.current.filter((l) => l !== listener);
    };
  }, []);

  const updateRef = useCallback(() => (resultRef.current = get()), []);
  const getSnapshot = useCallback(() => resultRef.current, []);
  const getServerSnapshot = useCallback(() => serverDumbObj, []);

  return {
    emitChange,
    subscribe,
    getSnapshot,
    getServerSnapshot,
    updateRef,
    listeners,
  };
}
