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
// import { useDB } from "./provider";
import {
  AddCollectionPageSchema,
  CollectionResult,
  CreateModeQuestionCardType,
} from "./types";
import { deleteThisDB } from "./utils";
import { useObservableContext } from "./context";

export function useGetPageTitle() {
  const { requestData } = useObservableContext()!;
  const [title, setTitle] = useAtom(collectionTitleAtom);

  useEffect(() => {
    requestData("initialize page title", (db) => {
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
    });
  }, []);

  return { title };
}

export function useUpdatePageTitle() {
  const { requestData } = useObservableContext()!;

  const updateTitle = (newTitle: string) => {
    requestData("update page title", async (db) => {
      await db.put("meta", { id: "collectionTitle", value: newTitle });
    });
  };

  return { updateTitle };
}

export function useGetTitle() {
  const { requestData } = useObservableContext()!;
  const [collectionTitle, setCollectionTitle] = useState("");

  const getTitle = () => {
    requestData("get collection title", async (db) => {
      const result = await db.get("meta", "collectionTitle");
      if (result) {
        setCollectionTitle(result.value);
      }
    });
  };

  useEffect(() => {
    requestData("get collection title", async (db) => {
      const result = await db.get("meta", "collectionTitle");
      if (result) {
        setCollectionTitle(result.value);
      }
    });
  }, []);

  return { getTitle, collectionTitle };
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
  // const { db } = useDB();
  const { requestData } = useObservableContext()!;
  const [cards, setCards] = useState<CreateModeQuestionCardType[]>([]);

  useEffect(() => {
    requestData("get all cards", async (db) => {
      const resultCards = await db.getAll("cards");
      setCards(resultCards);
    });
  }, []);

  const getCards = () => {
    // return db.getAll("cards");
  };

  return { getCards };
}

export function useInitAllCards() {
  // const { db } = useDB();
  const { requestData } = useObservableContext()!;

  const setCards = useSetAtom(cardsAtom);

  useEffect(() => {
    // if (db === null) return;

    requestData("init all cards", async (db) => {
      const resultCards = await db.getAll("cards");
      setCards(resultCards);
    });
  }, []);
}

export function useAddEmptyCard() {
  // const { db } = useDB();
  const { requestData } = useObservableContext()!;
  const addCard = useSetAtom(addCardAtom);

  const addEmptyCard = () => {
    // console.log({ db }, "click on btn");

    // if (db === null) return;

    const emptyCard = {
      questionTitle: "",
      options: [],
      numberOfCorrectAnswers: 0,
    } as {};

    requestData("add empty card", async (db) => {
      const newCardID = await db.add(
        "cards",
        emptyCard as CreateModeQuestionCardType
      );

      const fullEmptyCard = Object.assign(
        emptyCard as CreateModeQuestionCardType,
        {
          id: newCardID as number,
        }
      );
      addCard(fullEmptyCard);
    });
  };

  return { addEmptyCard };
}

export function useLazyUpdateCard() {
  // const { db } = useDB();
  const { requestData } = useObservableContext()!;

  const lazyUpdateCard = (newCardData: CreateModeQuestionCardType) => {
    // if (db === null) return;
    requestData("lazy update card", async (db) => {
      db.put("cards", newCardData);
    });
  };

  return { lazyUpdateCard };
}

export function useOnClickDeleteCard(id: number) {
  // const { db } = useDB();
  const { requestData } = useObservableContext()!;
  const deleteCardJotai = useSetAtom(removeCardAtom);

  const onClickDeleteCard = async () => {
    // if (db === null) return;
    requestData("delete card", async (db) => {
      await db.delete("cards", id);
      deleteCardJotai(id);
    });
  };

  return { onClickDeleteCard };
}

export function useSaveCollection() {
  const { addCollection } = useAddCollection();
  // const { db } = useDB(); /// here I need to implement my own close implementation #closeDB
  const router = useRouter();
  const { getCards } = useGetAllCards();
  const { getTitle } = useGetTitle();
  const { requestData } = useObservableContext()!;

  const onSaveButtonClick = async () => {
    // if (db === null) return;
    requestData("save collection", async (db) => {
      const [collectionTitle, cards] = await Promise.all([
        getTitle(),
        getCards(),
      ]);

      if (typeof collectionTitle !== "string" || !Array.isArray(cards))
        throw "collectionTitle, or cards are wrong type (just got them right from db)";

      console.log({ collectionTitle, cards });

      const filteredCards = cards.filter(
        (card) =>
          typeof card.questionTitle === "string" &&
          card.questionTitle.length > 0
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
    });
  };

  return { onSaveButtonClick };
}
