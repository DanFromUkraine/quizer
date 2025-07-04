"use client";

import { IDBPDatabase } from "idb";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  addCardAtom,
  cardsAtom,
  collectionTitleAtom,
  removeCardAtom,
} from "../../jotai/addCollection";
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

export function useGetTitle() {
  const { db } = useDB();

  const getTitle = () => {
    return db?.get("meta", "collectionTitle").then((res) => res?.value);
  };

  return { getTitle };
}

export function useClearJotaiOnExit() {
  const setCards = useSetAtom(cardsAtom);
  const setTitle = useSetAtom(collectionTitleAtom);

  useEffect(
    () => () => {
      setCards(RESET);
      setTitle(RESET);
    },
    []
  );
}

function useGetAllCards() {
  const { db } = useDB();

  const getCards = async () => {
    if (db === null) return;

    return db.getAll("cards");
  };

  return { getCards };
}

export function useInitAllCards() {
  const { db } = useDB();
  const setCards = useSetAtom(cardsAtom);

  useEffect(() => {
    if (db === null) return;

    db.getAll("cards").then((res) => {
      console.log(res);
      setCards(res);
    });
  }, [db]);
}

export function useAddEmptyCard() {
  const { db, isDbClosed } = useDB();
  const addCard = useSetAtom(addCardAtom);

  const addEmptyCard = () => {
    if (db === null || isDbClosed) return;

    const emptyCard = {
      questionTitle: "",
      options: [],
      numberOfCorrectAnswers: 0,
    } as {};

    db?.add("cards", emptyCard as QuestionCardType).then((res) => {
      const fullEmptyCard = Object.assign(emptyCard as QuestionCardType, {
        id: res as number,
      });
      addCard(fullEmptyCard);
    });
  };

  return { addEmptyCard };
}

export function useLazyUpdateCard() {
  const { db, isDbClosed, createDebounceMemo } = useDB();
  const { updateCallback } = createDebounceMemo();

  const lazyUpdateCard = (newCardData: QuestionCardType) => {
    if (db === null || isDbClosed) return;
    updateCallback(() => {
      return db.put("cards", newCardData);
    }, 1_000);
  };

  return { lazyUpdateCard };
}

export function useOnClickDeleteCard(id: number) {
  const { db } = useDB();
  const deleteCardJotai = useSetAtom(removeCardAtom);

  const onClickDeleteCard = () => {
    if (db === null) return;
    db.delete("cards", id).then(() => {
      deleteCardJotai(id);
    });
  };

  return { onClickDeleteCard };
}

export function useSaveCollection() {
  const { addCollection } = useAddCollection();
  const { db, close } = useDB();
  const router = useRouter();
  const { getCards } = useGetAllCards();
  const { getTitle } = useGetTitle();

  const onSaveButtonClick = async () => {
    if (db === null) return;

    const [collectionTitle, cards] = await Promise.all([
      getTitle(),
      getCards(),
    ]);

    if (typeof collectionTitle !== "string" || !Array.isArray(cards))
      throw "collectionTitle, or cards are wrong type (just got them right from db)";

    console.log({ collectionTitle, cards });

    const result: CollectionResult = {
      id: getUniqueID(),
      timestamp: Date.now(),
      collectionTitle,
      cards,
    };

    deleteThisDB(close)
      .then(async () => await addCollection(result))
      .then(() => {
        router.replace("/main");
      });
  };

  return { onSaveButtonClick };
}
