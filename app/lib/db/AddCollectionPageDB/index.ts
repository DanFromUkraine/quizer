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

  setTitle,
}: {
  db: IDBPDatabase<AddCollectionPageSchema> | null;
  setTitle: Dispatch<SetStateAction<string>>;
}) {
  useEffect(() => {
    if (db === null) return;
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

export function useGetPageTitle() {
  const { db } = useDB();
  const [title, setTitle] = useAtom(collectionTitleAtom);

  useInitPageTitle({ db, setTitle });

  return { title };
}

export function useUpdatePageTitle() {
  const { db } = useDB();

  const updateTitle = async (newTitle: string) => {
    if (db === null) return;

    await db.put("meta", { id: "collectionTitle", value: newTitle });
  };

  return { updateTitle };
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
  const { db } = useDB();
  const addCard = useSetAtom(addCardAtom);

  const addEmptyCard = () => {
    console.log({ db }, "click on btn");

    if (db === null) return;

    const emptyCard = {
      questionTitle: "",
      options: [],
      numberOfCorrectAnswers: 0,
    } as {};

    db.add("cards", emptyCard as QuestionCardType).then((res) => {
      const fullEmptyCard = Object.assign(emptyCard as QuestionCardType, {
        id: res as number,
      });
      addCard(fullEmptyCard);
    });
  };

  return { addEmptyCard };
}

export function useLazyUpdateCard() {
  const { db } = useDB();

  const lazyUpdateCard = async (newCardData: QuestionCardType) => {
    if (db === null) return;
    return await db.put("cards", newCardData);
  };

  return { lazyUpdateCard };
}

export function useOnClickDeleteCard(id: number) {
  const { db } = useDB();
  const deleteCardJotai = useSetAtom(removeCardAtom);

  const onClickDeleteCard = async () => {
    if (db === null) return;
    await db.delete("cards", id).then(() => {
      deleteCardJotai(id);
    });
  };

  return { onClickDeleteCard };
}

export function useSaveCollection() {
  const { addCollection } = useAddCollection();
  const { db } = useDB(); /// here I need to implement my own close implementation #closeDB
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

    const filteredCards = cards.filter(
      (card) =>
        typeof card.questionTitle === "string" && card.questionTitle.length > 0
    );

    const result: CollectionResult = {
      id: new URLSearchParams(collectionTitle).toString(),
      timestamp: Date.now(),
      collectionTitle,
      cards: filteredCards,
    };

    deleteThisDB(() => db?.close())
      .then(async () => await addCollection(result))
      .then(() => {
        router.replace("/main");
      });
  };

  return { onSaveButtonClick };
}
