

import {atom} from "jotai"

export const storyIdsAtom = atom<string[]>([]);
export const booksIdsAtom = atom<string[]>([]);
export const currentBookIdAtom = atom<string>('');

