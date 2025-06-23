// Note: this file is used only by no-ssr component, so "use client" directive is not needed
import { createDebounce } from "@/app/lib/other";
import { DBSchema, deleteDB, IDBPDatabase } from "idb";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  addCardAtom,
  cardsAtom,
  collectionTitleAtom,
  initCardsAtom,
  removeCardAtom,
  udpateCardAtom,
} from "../jotai/addCollection";
import {
  createContextDefault,
  createObjStoreDefault,
  DB_NAMES,
  getDB,
  getIsDbUndefined,
  getOrAndInit,
  getUniqueID,
  ProviderDB,
} from "./utils";
import { useAddCollection } from "./mainPageDB";

type MetaPureType = {
  collectionTitle: string;
};

export type CollectionResult = MetaPureType & {
  id: string;
  cards: QuestionCardType[];
};

export type QuestionCardType = {
  id: string;
  questionTitle: string;
  options: {
    isCorrect: boolean;
    optionText: string;
  }[];
};

interface AddCollectionPageSchema extends DBSchema {
  meta: {
    key: string;
    value: {
      id: string;
      value: string;
    };
  };
  cards: {
    key: string;
    value: QuestionCardType;
  };
}

export type MyDB = IDBPDatabase<AddCollectionPageSchema>;

const DBContext = createContextDefault<AddCollectionPageSchema>();

export function AddCollectionPageDBContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const upgrade = (database: MyDB) => {
    createObjStoreDefault<AddCollectionPageSchema>(database, "meta");
    createObjStoreDefault<AddCollectionPageSchema>(database, "cards");
  };

  return (
    <ProviderDB
      {...{
        dbName: DB_NAMES.ADD_COLLECTION_PAGE,
        upgrade,
        ContextBody: DBContext,
      }}
    >
      {children}
    </ProviderDB>
  );
}

const useDB = () => useContext(DBContext);

async function deleteThisDB(closeFn: () => void) {
  closeFn();
  console.log("намагаюся закрити ");
  await deleteDB(DB_NAMES.ADD_COLLECTION_PAGE, {
    blocked(version, event) {
      console.log({ version, event });
    },
  });
  console.log("Закрилось");
  return;
}

export function usePageTitle() {
  const { db } = useDB();
  const [title, setTitle] = useAtom(collectionTitleAtom);
  const debounce = useMemo(createDebounce, []);

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

  const lazyUpdateTitle = (newTitle: string) => {
    if (db === null) return;

    debounce(() => {
      db.put("meta", { id: "collectionTitle", value: newTitle }).then(() => {
        setTitle(newTitle);
      });
    }, 1_000);
  };

  return { title, lazyUpdateTitle };
}

export function useGetAndAddCards() {
  const { db } = useDB();
  const cards = useAtomValue(cardsAtom);
  const initCards = useSetAtom(initCardsAtom);
  const addCard = useSetAtom(addCardAtom);

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

  const addEmptyCard = () => {
    if (db === null) return;
    const emptyCard = {
      questionTitle: "",
      options: [],
      id: getUniqueID(),
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
  const { db } = useDB();
  const debounce = useMemo(createDebounce, []);
  const updateCardJotai = useSetAtom(udpateCardAtom);
  const deleteCardJotai = useSetAtom(removeCardAtom);

  const lazyUpdateCard = (newCardData: QuestionCardType) => {
    if (db === null) return;
    debounce(() => {
      db.put("cards", newCardData).then(() => {
        updateCardJotai(newCardData);
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
  const isDbUndefined = getIsDbUndefined(db);
  const collectionTitle = useAtomValue(collectionTitleAtom);
  const cards = useAtomValue(cardsAtom);
  const router = useRouter();

  const result: CollectionResult = {
    id: getUniqueID(),
    collectionTitle,
    cards,
  };

  const onSaveButtonClick = async () => {
    if (isDbUndefined) return;

    deleteThisDB(close)
      .then(async () => await addCollection(result))
      .then(() => {
        router.replace("/main");
      });
  };

  return { onSaveButtonClick };
}
