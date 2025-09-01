"use client";

import { useAtom, useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import {
//   addCardAtom,
//   cardsAtom,
//   collectionTitleAtom,
//   removeCardAtom,
// } from "../../jotai/addCollection";
import { useAddCollection } from "../MainPageDB";
import { getOrAndInit } from "../utils";
import { useObservableContext } from "./context";
import { CollectionResult, CreateModeQuestionCardType } from "./types";
import { deleteThisDB } from "./utils";
import { useCardsContext } from "@/app/main/add-collection/CardsContext/context";
import {
  useAddCard,
  useRemoveCard,
} from "@/app/main/add-collection/CardsContext/provider";
import { useCollectionTitle } from "@/app/main/add-collection/CollectionTitleContext";

export function useGetPageTitle() {
  const obs = useObservableContext();
  const { collectionTitle, setCollectionTitle } = useCollectionTitle()!;

  useEffect(() => {
    obs?.requestData("initialize page title", (db) => {
      getOrAndInit({
        db,
        storeName: "meta",
        key: "collectionTitle",
        initVal: { id: "collectionTitle", value: "" },
      }).then((res) => {
        if ("value" in res) {
          setCollectionTitle(res.value);
        }
      });
    });
  }, []);

  return { collectionTitle };
}

export function useUpdatePageTitle() {
  const obs = useObservableContext();

  const updateTitle = (newTitle: string) => {
    obs?.requestData("update page title", async (db) => {
      await db.put("meta", { id: "collectionTitle", value: newTitle });
    });
  };

  return { updateTitle };
}

export function useGetTitle() {
  const obs = useObservableContext();
  const [collectionTitle, setCollectionTitle] = useState("");

  const getTitle = () => {
    obs?.requestData("get collection title", async (db) => {
      const result = await db.get("meta", "collectionTitle");
      if (result) {
        setCollectionTitle(result.value);
      }
    });
  };

  useEffect(() => {
    obs?.requestData("get collection title", async (db) => {
      const result = await db.get("meta", "collectionTitle");
      if (result) {
        setCollectionTitle(result.value);
      }
    });
  }, []);

  return { getTitle, collectionTitle };
}

// export function useClearJotaiOnExit() {
//   const setCards = useSetAtom(cardsAtom);
//   const setTitle = useSetAtom(collectionTitleAtom);

//   useEffect(
//     () => () => {
//       setCards(RESET);
//       setTitle(RESET);
//     },
//     []
//   );
// }

function useGetAllCards() {
  const obs = useObservableContext();
  const [cards, setCards] = useState<CreateModeQuestionCardType[]>([]);

  useEffect(() => {
    obs?.requestData("get all cards", async (db) => {
      const resultCards = await db.getAll("cards");
      setCards(resultCards);
    });
  }, []);

  const getCards = () => {
    // return db.getAll("cards");
  };

  return { getCards };
}

export function useCards() {
  const obs = useObservableContext();
  const [cards, setCardsStateOnly] = useState<CreateModeQuestionCardType[]>([]);

  useEffect(() => {
    obs?.requestData("get all cards", async (db) => {
      const resultCards = await db.getAll("cards");
      setCardsStateOnly(resultCards);
    });
  }, []);

  return { cards, setCardsStateOnly };
}

// export function useInitAllCards() {
//   // const { db } = useDB();
//   const obs = useObservableContext();

//   const setCards = useSetAtom(cardsAtom);

//   useEffect(() => {
//     // if (db === null) return;

//     obs?.requestData("init all cards", async (db) => {
//       const resultCards = await db.getAll("cards");
//       setCards(resultCards);
//     });
//   }, []);
// }

export function useAddEmptyCard() {
  const obs = useObservableContext();
  const { addCard } = useAddCard();

  const addEmptyCard = () => {
    const emptyCard = {
      questionTitle: "",
      options: [],
      numberOfCorrectAnswers: 0,
    } as {};

    obs?.requestData("add empty card", async (db) => {
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
  const obs = useObservableContext();

  const lazyUpdateCard = (newCardData: CreateModeQuestionCardType) => {
    // if (db === null) return;
    obs?.requestData("lazy update card", async (db) => {
      db.put("cards", newCardData);
    });
  };

  return { lazyUpdateCard };
}

export function useOnClickDeleteCard(id: number) {
  const obs = useObservableContext();
  const { removeCard } = useRemoveCard();

  const onClickDeleteCard = async () => {
    obs?.requestData("delete card", async (db) => {
      await db.delete("cards", id);
      removeCard(id);
    });
  };

  return { onClickDeleteCard };
}

export function useSaveCollection() {
  const { addCollection } = useAddCollection();
  const router = useRouter();
  const { getCards } = useGetAllCards();
  const { getTitle } = useGetTitle();
  const obs = useObservableContext();

  const onSaveButtonClick = async () => {
    // if (db === null) return;
    obs?.requestData("save collection", async (db) => {
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
