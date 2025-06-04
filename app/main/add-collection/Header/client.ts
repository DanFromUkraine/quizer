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

export function useSyncQuestionCard(id: string) {
  const dumbObjQC: QuestionCard = {
    questionTitle: "",
    options: [],
  };

  const storage = typeof window !== "undefined" ? sessionStorage : null;
  const getQC = (): QuestionCard => {
    const rawQC = storage?.getItem(id);
    return rawQC ? JSON.parse(rawQC) : dumbObjQC;
  };
  const questionCard = useRef<QuestionCard>(dumbObjQC);

  const { updateRef, emitChange, getSnapshot, getServerSnapshot, subscribe } =
    useSyncInterface<QuestionCard>(questionCard, dumbObjQC, getQC);

  const setQuestionCardNewValue = (newVal: QuestionCard) => {
    storage?.setItem(id, JSON.stringify(newVal));
    updateRef();
    emitChange();
  };

  const deleteQuestionCard = () => {
    storage?.removeItem(id);
  };

  const resultQC = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return {
    questionCard: resultQC,
    setQuestionCardNewValue,
    deleteQuestionCard,
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
      listeners.current.filter((l) => l !== listener);
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
  };
}
