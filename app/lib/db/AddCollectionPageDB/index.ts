"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useDB } from "./provider";
import {
  addCardAtom,
  cardsAtom,
  collectionTitleAtom,
  initCardsAtom,
  removeCardAtom,
  udpateCardAtom,
} from "../../jotai/addCollection";
import { useEffect, useMemo } from "react";
import { createDebounce } from "../../other";
import { getOrAndInit, getUniqueID } from "../utils";
import { CollectionResult, QuestionCardType } from "./types";
import { useRouter } from "next/navigation";
import { deleteThisDB } from "./utils";
import { useAddCollection } from "../MainPageDB";
import { statusBarColorAtom } from "../../jotai/userState";

export function usePageTitle() {
  const { db, isDbClosed, onFlushAdd, onRemoveFlush } = useDB();
  const [title, setTitle] = useAtom(collectionTitleAtom);
  const { updateCallback } = useMemo(
    () =>
      createDebounce({
        onDebounceUpdated: onFlushAdd,
        onDebounceFinished: onRemoveFlush,
      }),
    [onFlushAdd, onRemoveFlush]
  );

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

export function useInitAllCardsFromDB() {
  const { db } = useDB();
  const initCards = useSetAtom(cardsAtom);


  const getAllCards = () => {
    if (db === null) return;
    db.getAll("cards").then((resCards) => {
      console.log({ resCards });
      initCards(resCards);
    });
  };

  useEffect(() => {
    if (db === null) return;
    getAllCards();
  }, [db]);
}

export function useAddEmtyCard() {
  const { db, isDbClosed } = useDB();
  const addCard = useSetAtom(addCardAtom);

  const addEmptyCard = () => {
    if (db === null || isDbClosed) return;
    const emptyCard = {
      questionTitle: "",
      options: [],
      id: getUniqueID(),
    };

    db?.add("cards", emptyCard);
    addCard(emptyCard);
  };

  return { addEmptyCard };
}

export function useServiceOneCard() {
  const { db, onFlushAdd, onRemoveFlush, isDbClosed } = useDB();
  const { updateCallback } = useMemo(
    () =>
      createDebounce({
        onDebounceUpdated: onFlushAdd,
        onDebounceFinished: onRemoveFlush,
      }),
    [onFlushAdd, onRemoveFlush]
  );
  const updateCardJotai = useSetAtom(udpateCardAtom);
  const deleteCardJotai = useSetAtom(removeCardAtom);
  const updateStatusBarColor = useSetAtom(statusBarColorAtom);

  const lazyUpdateCard = (
    newCardData: QuestionCardType,
    resetForm: () => void
  ) => {
    if (db === null || isDbClosed) return;
    updateStatusBarColor("yellow");
    updateCallback(() => {
      db.put("cards", newCardData).then(() => {
        updateCardJotai(newCardData);
        resetForm();
        updateStatusBarColor(undefined);
      });
    }, 1_000);
  };

  const deleteCard = (cardID: string) => {
    if (db === null) return;
    db.delete("cards", cardID).then(() => {
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
