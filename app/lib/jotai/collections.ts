import { atom } from "jotai";
import { withImmer } from "jotai-immer";
import { atomWithStorage } from "jotai/utils";

type Collection = {
  title: string;
  cards: Card[];
};

export type Card = {
  questionTitle: string;
  options: string[];
  id: string;
};

export const collectionTitleAtom = atomWithStorage<string>(
  "collectionTitle",
  ""
);

export const cardsIDsAtom = atomWithStorage<string[]>("IDs", []);

export const addIDAtom = atom(null, (get, set, newVal: string) => {
  const newIDs = [...get(cardsIDsAtom), newVal];
  set(cardsIDsAtom, newIDs);
});
