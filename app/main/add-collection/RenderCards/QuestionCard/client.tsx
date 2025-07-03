"use client";

import { useAddEmptyCard } from "@/app/lib/db/AddCollectionPageDB";
import {
  useEffect,
  useRef
} from "react";

export function useAddCardOnShortcut() {
  const { addEmptyCard } = useAddEmptyCard();
  const triggered = useRef(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "m" && !triggered.current) {
        triggered.current = true;
        addEmptyCard();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "m" || e.key === "Control") {
        triggered.current = false;
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [addEmptyCard]);
}
