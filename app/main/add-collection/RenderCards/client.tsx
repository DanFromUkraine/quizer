"use client";

import { useAddEmptyCard } from "@/app/lib/db/AddCollectionPageDB";
import { useEffect, useRef, useState } from "react";

export function useAddCardOnShortcut() {
  const { addEmptyCard } = useAddEmptyCard();
  const triggered = useRef(false);
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      if (triggered.current) return;

      triggered.current = true;
      setPressedKeys((prev) => [...prev, event.key]);
      console.log("down");
    };

    const keyupListener = (event: KeyboardEvent) => {
      triggered.current = false;
      setPressedKeys((prev) => prev.filter((key) => key !== event.key));
      console.log("up");
    };

    document.addEventListener("keydown", keydownListener);
    document.addEventListener("keyup", keyupListener);

    return () => {
      document.removeEventListener("keydown", keydownListener);
      document.removeEventListener("keyup", keyupListener);
    };
  }, []);

  useEffect(() => {
    console.log({ pressedKeys });
  }, [pressedKeys]);
}
