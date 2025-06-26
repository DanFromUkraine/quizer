import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const sidebarWidth = atomWithStorage<number>("sidebarWidth", 64);

// Color status bar

type StatusBarColors = "green" | "yellow" | undefined;

export const statusBarColorAtom = atom<StatusBarColors>();
