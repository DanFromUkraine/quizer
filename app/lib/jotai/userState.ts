import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const sidebarWidth = atomWithStorage<number>("sidebarWidth", 64);

// Color status bar

type StatusBarColors = "green" | "yellow" | undefined;

export const statusBarColorAtom = atom<StatusBarColors>();

export const setStatusBarColorAtom = atom(
  null,
  (get, set, newVal: StatusBarColors) => {
    const prev = get(statusBarColorAtom);
    if (prev !== newVal) set(statusBarColorAtom, newVal);
  }
);
