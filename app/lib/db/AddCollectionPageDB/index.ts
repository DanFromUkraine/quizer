"use client";

import { IDBPDatabase } from "idb";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  addCardAtom,
  cardsAtom,
  collectionTitleAtom,
  removeCardAtom,
} from "../../jotai/addCollection";
import { setStatusBarColorAtom } from "../../jotai/userState";
import { useAddCollection } from "../MainPageDB";
import { getOrAndInit, getUniqueID } from "../utils";
import { useDB } from "./provider";
import {
  AddCollectionPageSchema,
  CollectionResult,
  QuestionCardType,
} from "./types";
import { deleteThisDB } from "./utils";

function useInitPageTitle({
  db,
  isDbClosed,
  setTitle,
}: {
  db: IDBPDatabase<AddCollectionPageSchema> | null;
  isDbClosed: boolean;
  setTitle: Dispatch<SetStateAction<string>>;
}) {
  useEffect(() => {
    if (db === null || isDbClosed) return;
    getOrAndInit({
      db,
      storeName: "meta",
      key: "collectionTitle",
      initVal: { id: "collectionTitle", value: "" },
    }).then((res) => {
      if ("value" in res) {
        setTitle(res.value);
      }
    });
  }, [db]);
}

export function usePageTitle() {
  const { db, isDbClosed, createDebounceMemo } = useDB();
  const [title, setTitle] = useAtom(collectionTitleAtom);
  const { updateCallback } = createDebounceMemo();

  useInitPageTitle({ db, isDbClosed, setTitle });

  const lazyUpdateTitle = (newTitle: string) => {
    if (db === null || isDbClosed) return;

    updateCallback(() => {
      db.put("meta", { id: "collectionTitle", value: newTitle }).then(() => {
        setTitle(newTitle);
      });
    }, 1_000);
  };

  return { title, lazyUpdateTitle };
}

function getAllCards() {}

function useInitAllCards({
  db,
  setCards,
}: {
  db: IDBPDatabase<AddCollectionPageSchema> | null;
  setCards: Dispatch<SetStateAction<QuestionCardType[]>>;
}) {
  useEffect(() => {
    if (db === null) return;

    db.getAll("cards").then((res) => {
      console.log(res);
      setCards(res);
    });
  }, [db]);
}

export function useGetAndInitAllCards() {
  const { db } = useDB();
  const [cards, setCards] = useAtom(cardsAtom);

  useInitAllCards({ db, setCards });

  return cards;
}

export function useAddEmptyCard() {
  const { db, isDbClosed } = useDB();
  const addCard = useSetAtom(addCardAtom);

  const addEmptyCard = () => {
    console.log({ db });
    if (db === null || isDbClosed) return;

    const emptyCard = {
      questionTitle: "",
      options: [],
    };

    db?.add("cards", emptyCard).then((res) => {
      const fullEmptyCard = Object.assign(emptyCard, { id: res });
      addCard(fullEmptyCard);
    });
  };

  return { addEmptyCard };
}

export function useServiceOneCard() {
  const { db, isDbClosed, createDebounceMemo } = useDB();
  const { updateCallback } = createDebounceMemo();
  const deleteCardJotai = useSetAtom(removeCardAtom);
  const updateStatusBarColor = useSetAtom(setStatusBarColorAtom);

  const lazyUpdateCard = (
    newCardData: QuestionCardType,
    resetForm: () => void
  ) => {
    if (db === null || isDbClosed) return;
    updateStatusBarColor("yellow");
    updateCallback(() => {
      db.put("cards", newCardData).then(() => {
        resetForm();
        updateStatusBarColor(undefined);
      });
    }, 1_000);
  };

  const deleteCard = (cardID: string) => {
    if (db === null) return;
    db.delete("cards", cardID).then(() => {
      console.log("this card should have been deleted", cardID);
      deleteCardJotai(cardID);
    });
  };

  return { lazyUpdateCard, deleteCard };
}

export function useSaveCollection() {
  const { addCollection } = useAddCollection();
  const { db, close } = useDB();
  const collectionTitle = useAtomValue(collectionTitleAtom);
  const cards = useAtomValue(cardsAtom);
  const router = useRouter();

  const result: CollectionResult = {
    id: getUniqueID(),
    timestamp: Date.now(),
    collectionTitle,
    cards,
  };

  const onSaveButtonClick = async () => {
    if (db === null) return;

    deleteThisDB(close)
      .then(async () => await addCollection(result))
      .then(() => {
        router.replace("/main");
      });
  };

  return { onSaveButtonClick };
}
