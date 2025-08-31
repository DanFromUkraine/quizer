"use client";

import PouchDB from "pouchdb";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createDebounce } from "../utils/debounce";

type PageTitleDocPure = {
  pageTitle: string;
};

type OptionType = {
  isCorrect: boolean;
  optionText: string;
};

export type QuestionCardTypePure = {
  questionTitle: string;
  options: OptionType[];
};

export type QuestionCardType = {
  _id: string;
  _rev?: string;
} & QuestionCardTypePure;

type PageTitleDoc = {
  _id: "pageTitle";
  _rev?: string;
} & PageTitleDocPure;

export type AddCollectionPageDoc = PageTitleDoc | QuestionCardType;

type SetCardsHookType = Dispatch<SetStateAction<QuestionCardType[]>>;
type CardsDB = PouchDB.Database<AddCollectionPageDoc> | undefined;

export type CardMethodsType = {
  lazyUpdateCard: (newCardData: QuestionCardType) => void;
  deleteCard: (id: string, _rev: string) => void;
};

const db = new PouchDB<AddCollectionPageDoc>("add-collection-page");

export function useSaveCollection() {
  useEffect(() => {
    saveCollection();
  }, []);
}

export async function saveCollection() {
  const pageTitle = await getAndDeleteTitle();
  const cards = await getCards();
  const result = {
    cards,
    pageTitle,
  };

  console.log({ result });
  db.close();
}

async function getAndDeleteTitle() {
  const returnAndClearTitle = ({
    _id,
    _rev,
    pageTitle,
  }: {
    _id: string;
    _rev: string;
    pageTitle: string;
  }) => {
    db.remove({ _id, _rev }).then(({ ok }) => {
      if (ok) {
        return pageTitle;
      } else {
        throw "Error: could not delete pageTitle";
      }
    });
  };

  return db
    .get<PageTitleDoc>("collectionName")
    .then(returnAndClearTitle) as Promise<string>;
}

async function getCards() {
  return db
    .allDocs<QuestionCardType>({ include_docs: true })
    .then(({ rows }) => {
      rows.map(({ doc }) => {
        if (doc) {
          const { questionTitle, options } = doc;
          return {
            questionTitle,
            options,
          };
        }
      });
    }) as Promise<QuestionCardTypePure[]>;
}

export function usePageInpTitle() {
  const [title, setTitle] = useState("");
  const _revRef = useRef<string>("");

  useEffect(() => {
    db?.get("pageTitle").then((data) => {
      if ("pageTitle" in data) {
        setTitle(data.pageTitle);
        _revRef.current = data._rev;
      } else {
        db.put({ _id: "pageTitle", pageTitle: "" }).then(
          ({ rev }) => (_revRef.current = rev)
        );
      }
    });
  }, []);

  const useLazyUpdateTitle = useCallback((newVal: string) => {
    const { updateCallback } = createDebounce();
    const callback = () =>
      db?.post({
        _id: "pageTitle",
        _rev: _revRef.current,
        pageTitle: newVal,
      });
    updateCallback(callback, 1_000);
  }, []);

  return { title, useLazyUpdateTitle };
}

export function useQuestionCards() {
  const [cards, setCards] = useState<QuestionCardType[]>([]);

  useEffect(() => getAllCardsState({ setCards, db }), [db]);

  const addEmptyCard = () => {
    db?.put({
      _id: crypto.randomUUID(),
      questionTitle: "",
      options: [],
    }).then(getCallbackToAddEmptyCard(setCards));
  };

  const lazyUpdateCard = (newCardData: QuestionCardType) => {
    db?.put({ ...newCardData }).then(
      getCallbackToUpdateOneCard({ setCards, newCardData })
    );
  };

  const deleteCard = (id: string, _rev: string) => {
    db?.remove({ _id: id, _rev }).then(getCallbackToDeleteCard(setCards));
  };

  return {
    cards,
    addEmptyCard,
    cardMethods: {
      lazyUpdateCard,
      deleteCard,
    },
  };
}

function filterCardsFromAllDocs(
  docs: PouchDB.Core.AllDocsResponse<AddCollectionPageDoc>
) {
  const cards = docs.rows
    .filter(({ key }) => key !== "pageTitle")
    .map((doc) => doc.doc) as QuestionCardType[];

  return cards;
}

function getCallbackToAddEmptyCard(setCards: SetCardsHookType) {
  return ({ ok, id, rev }: PouchDB.Core.Response) => {
    if (ok) {
      setCards((prev) => [
        ...prev,
        { _id: id, _rev: rev, questionTitle: "", options: [] },
      ]);
    } else {
      console.error("something went wrong");
    }
  };
}

function getCallbackToUpdateOneCard({
  setCards,
  newCardData,
}: {
  setCards: SetCardsHookType;
  newCardData: QuestionCardType;
}) {
  return ({ id: updatedCardID, rev, ok }: PouchDB.Core.Response) => {
    if (ok) {
      setCards((prev) =>
        prev.map((card) =>
          card._id === updatedCardID ? { ...newCardData, _rev: rev } : card
        )
      );
    }
  };
}

function getCallbackToDeleteCard(setCards: SetCardsHookType) {
  return ({ id, ok }: PouchDB.Core.Response) => {
    if (ok) {
      setCards((prev) => prev.filter((card) => card._id !== id));
    }
  };
}

function getAllCardsState({
  setCards,
  db,
}: {
  setCards: SetCardsHookType;
  db: CardsDB;
}) {
  db?.allDocs({ include_docs: true })
    .then(filterCardsFromAllDocs)
    .then((cardsOnly) => {
      setCards(cardsOnly);
    });
}
