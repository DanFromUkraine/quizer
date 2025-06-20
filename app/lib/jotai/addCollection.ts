"use client";

import { atom } from "jotai";
import { QuestionCardType } from "../db/addCollectionPageDB";

export const cardsAtom = atom<QuestionCardType[]>([]);

export const initCardsAtom = atom(null, (_, set, initCards: QuestionCardType[]) => {
  set(cardsAtom, initCards);
});

export const addCardAtom = atom(null, (_, set, newCard: QuestionCardType) => {
  set(cardsAtom, (prevCards) => [...prevCards, newCard]);
});

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
