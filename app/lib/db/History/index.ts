import { useDB } from "./provider";
import { useDB as useMainDB } from "../MainPageDB/provider";
import { useCallback, useEffect, useState } from "react";
import { CollectionStoryIncomplete, IncompleteAttemp, TestCard } from "./types";
import { QuestionCardType } from "../AddCollectionPageDB/types";
import { useAtomValue, useSetAtom } from "jotai";
import { dataReadyAtom } from "../../jotai/playOffline";

function getModifiedQuestionCards(cards: QuestionCardType[]): TestCard[] {
  return cards.map((card) => ({
    ...card,

    options: card.options.map((opt) => ({
      optionChosen: false,
      ...opt,
    })),
  }));
}

function getAttemp(cards: QuestionCardType[]): IncompleteAttemp {
  return {
    startTime: Date.now(),
    attempID: crypto.randomUUID(),
    cards: getModifiedQuestionCards(cards),
  };
}

export function useInitFromHistory() {
  const { db: mainDB } = useMainDB();
  const { db, forwardInfo } = useDB();
  const setDataReady = useSetAtom(dataReadyAtom);

  useEffect(() => {
    (async function initiateDbOrNothing() {
      console.log("call before");

      if (!forwardInfo || !db || !mainDB) return;

      console.log("callMicrotask");

      const historyCollectionInfo = await db.get(
        "incomplete",
        forwardInfo.collectionID
      );

      if (historyCollectionInfo) return setDataReady(true);

      const baseCollectionInfo = await mainDB.get(
        "userCollections",
        forwardInfo.collectionID
      );

      if (!baseCollectionInfo)
        throw `could not gain info from Main Page DB. collection id: ${forwardInfo.collectionID}. Initiation of collection in history db is aborted`;

      const newInfo: CollectionStoryIncomplete = {
        collectionName: baseCollectionInfo.collectionTitle,
        attemps: [],
        attemp: getAttemp(baseCollectionInfo.cards),
      };

      db.put("incomplete", newInfo, forwardInfo.collectionID).then(
        (successInfo) => {
          console.log("success!", { successInfo });
          setDataReady(true);
        }
      );
    })();
  }, [db, mainDB]);
}

export function useGetCollection() {
  const isDbReady = useAtomValue(dataReadyAtom);
  const { db, forwardInfo } = useDB();
  const [collection, setCollection] =
    useState<CollectionStoryIncomplete | null>(null);

  useEffect(() => {
    if (!isDbReady || !db || !forwardInfo) return;

    console.log("call");

    db.get("incomplete", forwardInfo.collectionID).then((res) => {
      if (!res)
        throw `did not find collection in History db by id ${forwardInfo.collectionID} even though it's said db has latest data`;

      console.log({ res });

      setCollection(res);
    });
  }, [db, isDbReady, forwardInfo]);

  return { collection };
}
