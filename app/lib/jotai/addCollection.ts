"use client";

import { atom } from "jotai";
import { getAtomAddToArrayItem } from "./utils";
import { MyDB } from "../db/MainPageDB/types";
import { QuestionCardType } from "../db/ObservableCreateCollectionDB/types";
import { atomWithReset, atomWithStorage } from "jotai/utils";

// Collection title:

export const dbAtom = atom<MyDB | null>(null);
export const collectionTitleAtom = atomWithReset("");

// Question Cards:

export const cardsAtom = atomWithReset<QuestionCardType[]>([]);

export const initCardsAtom = atom(
  null,
  (_, set, initCards: QuestionCardType[]) => {
    set(cardsAtom, initCards);
  }
);

export const addCardAtom = getAtomAddToArrayItem(cardsAtom);

export const udpateCardAtom = atom(
  null,
  (_, set, newCardData: QuestionCardType) => {
    set(cardsAtom, (prev) =>
      prev.map((prevCard) =>
        prevCard.id === newCardData.id ? newCardData : prevCard
      )
    );
  }
);

export const removeCardAtom = atom(null, (_, set, deleteCardID: number) => {
  set(cardsAtom, (prevCards) =>
    prevCards.filter((card) => card.id !== deleteCardID)
  );
});

// Modal window:

export const cardsEditModalVisibilityAtom = atomWithStorage(
  "cardsEditModalVisibility",
  false
);

export const saveOptionSelectedAtom = atomWithStorage("optionSelected", false);
