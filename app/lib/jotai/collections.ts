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

export const cardsAtom = atomWithStorage<Card[]>("collectionCards", []);

export const collectionTitleAtom = atomWithStorage<string>(
  "collectionTitle",
  ""
);
