"use client";

import { useAddEmptyCard } from "@/app/lib/db/AddCollectionPageDB";
import { useEffect, useRef, useState } from "react";

export function useAddCardOnShortcut() {
  const { addEmptyCard } = useAddEmptyCard();
  const lastPressedKeys = useRef<string[]>([]);

  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      if (lastPressedKeys.current.includes(event.code)) return;
      lastPressedKeys.current.push(event.code);

      if (
        lastPressedKeys.current.includes("ControlLeft") &&
        lastPressedKeys.current.includes("KeyM")
      ) {
        addEmptyCard();
      }
      console.log(lastPressedKeys.current, event);
      console.log("down");
    };

    const keyupListener = (event: KeyboardEvent) => {
      lastPressedKeys.current = lastPressedKeys.current.filter(
        (key) => key !== event.code
      );

      console.log("up");
    };

    document.addEventListener("keydown", keydownListener);
    document.addEventListener("keyup", keyupListener);

    return () => {
      document.removeEventListener("keydown", keydownListener);
      document.removeEventListener("keyup", keyupListener);
    };
  }, [addEmptyCard]);
}
