import { atomWithStorage } from "jotai/utils";

export const sidebarWidth = atomWithStorage<number>("sidebarWidth", 64);
