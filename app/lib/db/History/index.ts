/*
This is very shitty code, and I could segragate all the functionality by increasing abstraction, but now I'm trying just to finish user actions cycle


So it will be done later. Also even if I make the code look better, it won't solve the fundamental problems in perfomance. What problems? I use global context that are used in most of the components, and their state is inevitably changed (like most basic db context). This is why UI can be changed much more often, without such necessity. Memo could imporove situation, but this is a makeshift
*/

import { useAtomValue, useSetAtom } from "jotai";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { dataReadyAtom } from "../../jotai/playOffline";
import { CreateModeQuestionCardType } from "../AddCollectionPageDB/types";
import { useDB as useMainDB } from "../MainPageDB/provider";
import { useDB } from "./provider";
import {
  AssessmentModeQuestionCardType,
  CollectionStoryIncomplete,
  CompleteAttemp,
  IncompleteAttemp,
} from "./types";

function getModifiedQuestionCards(
  cards: CreateModeQuestionCardType[]
): AssessmentModeQuestionCardType[] {
  return cards.map((card) => ({
    ...card,
    anyOptionChosen: false,
    numberOfCorrectAnswers: card.options.reduce(
      (acc, { isCorrect }) => acc + Number(isCorrect),
      0
    ),
    options: card.options.map((opt) => ({
      optionChosen: false,
      ...opt,
    })),
  }));
}

function getAttemp(cards: CreateModeQuestionCardType[]): IncompleteAttemp {
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
      if (!forwardInfo || !db || !mainDB) return;

      const historyCollectionInfo = await db.get(
        "incomplete",
        forwardInfo.collectionID
      );

      if (historyCollectionInfo) return setDataReady(true);

      const baseCollectionInfo = await mainDB.get(
        "userCollections",
        forwardInfo.collectionID
      );

      console.dir({ info: forwardInfo });

      if (!baseCollectionInfo)
        throw `could not gain info from Main Page DB. collection id: ${forwardInfo.collectionID}. Initiation of collection in history db is aborted`;

      const newInfo: CollectionStoryIncomplete & {
        id: string;
      } = {
        collectionName: baseCollectionInfo.collectionTitle,
        attemps: [],
        attemp: getAttemp(baseCollectionInfo.cards),
        id: forwardInfo.collectionID,
      };

      db.put("incomplete", newInfo).then((successInfo) => {
        console.log("success!", { successInfo });
        setDataReady(true);
      });
    })();
  }, [db, mainDB]);
}

export function useGetCollection() {
  const isDbReady = useAtomValue(dataReadyAtom);
  const { db, forwardInfo } = useDB();
  const [collection, setCollection] =
    useState<CollectionStoryIncomplete | null>(null);

  useEffect(() => {
    console.log("useEffect useGetCollection ", { isDbReady, db, forwardInfo });

    if (!isDbReady || !db || !forwardInfo) return;

    console.log(isDbReady ? "DB is ready!!!" : "DB is not ready!!!");

    db.get("incomplete", forwardInfo.collectionID).then((res) => {
      if (!res)
        throw `did not find collection in History db by id ${forwardInfo.collectionID} even though it's said db has latest data`;

      console.log({ res });

      setCollection(res);
    });
  }, [db, isDbReady, forwardInfo]);

  return { collection };
}

export function useTickOption() {
  const { db, forwardInfo } = useDB();
  const isDbReady = useAtomValue(dataReadyAtom);

  const tickOption = useCallback(
    async ({
      questionIndex,
      optionIndex,
    }: {
      questionIndex: number;
      optionIndex: number;
    }) => {
      if (!db || !forwardInfo || !isDbReady) return;

      const prevData = await db.get("incomplete", forwardInfo.collectionID);
      if (!prevData)
        throw `for some reason could not find collection, but was asked to tick option of question of this collection`;
      const thatQuestionCard = prevData.attemp.cards.find(
        (_, i) => i === questionIndex
      );
      if (!thatQuestionCard)
        throw `could not find question in ${forwardInfo.collectionID} with index ${questionIndex}`;
      thatQuestionCard.anyOptionChosen = true;
      const thatOption = thatQuestionCard.options.find(
        (_, i) => optionIndex === i
      );
      if (!thatOption)
        throw `Could not find option with index ${optionIndex} within question card with index ${questionIndex} within collection ${forwardInfo.collectionID}`;
      thatOption.optionChosen = true;

      db.put("incomplete", prevData);
    },
    [db, isDbReady]
  );

  return { tickOption };
}

export function useSubmit() {
  const { db, forwardInfo } = useDB();

  const submit = async () => {
    if (!db || !forwardInfo?.collectionID) return;
    const completetionResult = await db.get(
      "incomplete",
      forwardInfo.collectionID
    );

    if (!completetionResult)
      throw `While submitting and trying to retrieve collection result from incomplete object store didn't find the collection. `;

    const numberOfCorrectAnswers = completetionResult.attemp.cards.reduce(
      (acc, testCard) => {
        const someCorrect = testCard.options.some(
          (opt) => opt.isCorrect && opt.optionChosen
        );
        return acc + Number(someCorrect);
      },
      0
    );

    console.log({ numberOfCorrectAnswers });

    const completeAttemp: CompleteAttemp & {
      id: string;
    } = {
      id: forwardInfo.collectionID,
      attempID: forwardInfo.collectionID,
      cards: completetionResult.attemp.cards,
      numberOfCorrectAnswers,
      numberOfQuestions: completetionResult.attemp.cards.length,
      endTime: Date.now(),
      duration: Date.now() - completetionResult.attemp.startTime,
    };

    const result = {
      id: forwardInfo.collectionID,
      collectionName: completetionResult.collectionName,
      attemps: [completeAttemp],
      attemp: completeAttemp,
    };

    await db.put("complete", result);

    await db.delete("incomplete", forwardInfo.collectionID);

    db.close();
    redirect(`/main/history/view?id=${forwardInfo.collectionID}`);
  };

  return { submit };
}

export function useGetResultInfo() {}
