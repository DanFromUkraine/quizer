// this file is used only by no-ssr component, so "use client" directive is not needed
import { DBSchema, IDBPDatabase, openDB } from "idb";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { addCardAtom, cardsAtom, initCardsAtom } from "../jotai/addCollection";

type CollectionNameDoc = {
  collectionName: string;
};

export type QuestionCardType = {
  id: string;
  questionTitle: string;
  options: {
    isCorrect: boolean;
    optionText: string;
  }[];
};

type QuestionCardsDoc = QuestionCardType[];

type AddCollectionDoc = CollectionNameDoc | QuestionCardsDoc;

interface AddCollectionPageSchema extends DBSchema {
  meta: {
    key: string;
    value: {
      id: string;
      value: string;
    };
  };
  cards: {
    key: number;
    value: QuestionCardType;
  };
}

type MyDB = IDBPDatabase<AddCollectionPageSchema>;

let storedDB: Promise<MyDB> | undefined;

function getDB() {
  if (storedDB) {
    return storedDB;
  } else {
    const db = openDB<AddCollectionPageSchema>("addCollectionPage", 1, {
      upgrade(database) {
        if (!database.objectStoreNames.contains("meta")) {
          database.createObjectStore("meta", { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains("cards")) {
          database.createObjectStore("cards", {
            keyPath: "id",
          });
        }
      },
    });
    return db;
  }
}

function useDB() {
  const [db, setDB] = useState<MyDB>();

  useEffect(() => {
    getDB().then((res) => setDB(res));
  }, []);

  return db;
}

export function useGetAndAddCards() {
  const db = useDB();
  const isDbUndefined = typeof db === "undefined";

  const cards = useAtomValue(cardsAtom);
  const initCards = useSetAtom(initCardsAtom);
  const addCard = useSetAtom(addCardAtom);

  const getAllCards = () => {
    if (isDbUndefined) return;
    db.getAll("cards").then((resCards) => {
      console.log({ resCards });
      initCards(resCards);
    });
  };

  useEffect(() => {
    getAllCards();
  }, [db]);

  const addEmptyCard = () => {
    if (isDbUndefined) return;
    const emptyCard = {
      questionTitle: "",
      options: [],
      id: crypto.randomUUID(),
    };

    db?.add("cards", emptyCard);
    addCard(emptyCard);
  };

  return {
    cards,
    addEmptyCard,
  };
}

export function useServiceOneCard() {
  const db = useDB();
  const isDbUndefined = typeof db === "undefined";
    

  const lazyUpdateCard = (newCardData: QuestionCardType) => {

  };
}
