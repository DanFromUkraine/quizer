"use client";

import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { createDebounce } from "./debounce";
import { useChangeStatusBarColor } from "./jotai/userState";

export function debounceInput(
  earlyCallback: () => void,
  laterCallback: () => void
) {
  const { updateCallback } = createDebounce();

  return (externalChangeState: (e: ChangeEvent) => void) => {
    return (e: ChangeEvent) => {
      console.log({ externalChangeState });

      earlyCallback();
      updateCallback(() => {
        laterCallback();
        externalChangeState(e);
      }, 1000);
    };
  };
}

export type OnDebounceChange = (
  onChange: (e: ChangeEvent) => void
) => (e: ChangeEvent) => void;

export function useDebounceInputAndUpdateStatusBar(): OnDebounceChange {
  const { changeColor, setDefaultColor } = useChangeStatusBarColor("yellow");

  return debounceInput(
    () => {
      changeColor();
    },
    () => {
      setDefaultColor();
    }
  );
}
