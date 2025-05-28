import { atomWithStorage } from "jotai/utils";

type Collection = {
  collectionName: string;
  cards: Card[];
};

type Card = {
  questionText: string;
  options: string[];
};

export const collectionDataAtom = atomWithStorage<Collection | undefined>(
  "createCollection",
  undefined
);
