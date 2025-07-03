"use client";

import { atom } from "jotai";
import { getAtomAddToArrayItem } from "./utils";
import { MyDB } from "../db/MainPageDB/types";
import { QuestionCardType } from "../db/AddCollectionPageDB/types";

// Change status bar 



// Collection title 

export const dbAtom = atom<MyDB | null>(null);
export const collectionTitleAtom = atom("");

// Question Cards 

export const cardsAtom = atom<QuestionCardType[]>([]);

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

export const removeCardAtom = atom(null, (_, set, deleteCardID: string) => {
  set(cardsAtom, (prevCards) =>
    prevCards.filter((card) => card.id !== deleteCardID)
  );
});

// improved perfomance 

