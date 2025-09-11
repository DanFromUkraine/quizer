import { useAtomValue, useSetAtom } from 'jotai';
import { redirect } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { dataReadyAtom } from '../../jotai/playOffline';
import { CreateModeQuestionCardType } from '../ObservableCreateCollectionDB/types';
import { useObservableContext as useMainObservableDB } from '@/app/lib/db/Main/context';
import {
        AssessmentModeQuestionCardType,
        CollectionStoryComplete,
        CollectionStoryIncomplete,
        IncompleteAttempt
} from './types';
import { useIdContext } from '../../assessmentModeComponents/IdContext/context';
import { useObservableContext } from './context';

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
                        ...opt
                }))
        }));
}

function getAttempt(cards: CreateModeQuestionCardType[]): IncompleteAttempt {
        return {
                startTime: Date.now(),
                attemptID: crypto.randomUUID(),
                cards: getModifiedQuestionCards(cards)
        };
}

export function useInitFromHistory() {
        const collectionID = useIdContext();
        const mainObs = useMainObservableDB();
        const setDataReady = useSetAtom(dataReadyAtom);
        const obs = useObservableContext();

        useEffect(() => {
                mainObs?.requestData("", (mainDB) => {
                        obs?.requestData("", (db) => {
                                const historyCollectionInfo = db.get(
                                        'incomplete',
                                        collectionID
                                );

                                if (historyCollectionInfo) return setDataReady(true);

                                const baseCollectionInfo = await mainDB.get(
                                        'userCollections',
                                        collectionID
                                );

                                if (!baseCollectionInfo)
                                        throw `could not gain info from Main Page DB. collection id: ${collectionID}. Initiation of collection in history db is aborted`;

                                const newInfo: CollectionStoryIncomplete & {
                                        id: string;
                                } = {
                                        collectionName:
                                        baseCollectionInfo.collectionTitle,
                                        attempts: [],
                                        attempt: getAttemp(baseCollectionInfo.cards),
                                        id: collectionID
                                };

                                db.put('incomplete', newInfo).then((successInfo) => {
                                        setDataReady(true);
                                });
                        })
                })


        }, []);
}

export function useGetCollection() {
        const isDbReady = useAtomValue(dataReadyAtom);
        const collectionID = useIdContext();

        const { db } = useDB();
        const [collection, setCollection] =
                useState<CollectionStoryIncomplete | null>(null);

        useEffect(() => {
                if (!isDbReady || !db || !collectionID) return;

                db.get('incomplete', collectionID).then((res) => {
                        if (!res)
                                throw `did not find collection in History db by id ${collectionID} even though it's said db has latest data`;

                        setCollection(res);
                });
        }, [db, isDbReady, collectionID]);

        return { collection };
}

export function useTickOption() {
        const collectionID = useIdContext();

        const { db } = useDB();
        const isDbReady = useAtomValue(dataReadyAtom);

        const tickOption = useCallback(
                async ({
                        questionIndex,
                        optionIndex
                }: {
                        questionIndex: number;
                        optionIndex: number;
                }) => {
                        if (!db || !collectionID || !isDbReady) return;

                        const prevData = await db.get(
                                'incomplete',
                                collectionID
                        );
                        if (!prevData)
                                throw `for some reason could not find collection, but was asked to tick option of question of this collection`;
                        const thatQuestionCard = prevData.attemp.cards.find(
                                (_, i) => i === questionIndex
                        );
                        if (!thatQuestionCard)
                                throw `could not find question in ${collectionID} with index ${questionIndex}`;
                        thatQuestionCard.anyOptionChosen = true;
                        const thatOption = thatQuestionCard.options.find(
                                (_, i) => optionIndex === i
                        );
                        if (!thatOption)
                                throw `Could not find option with index ${optionIndex} within question card with index ${questionIndex} within collection ${collectionID}`;
                        thatOption.optionChosen = true;

                        db.put('incomplete', prevData);
                },
                [db, isDbReady]
        );

        return { tickOption };
}

export function useSubmit() {
        const collectionID = useIdContext();

        const { db } = useDB();

        const submit = async () => {
                if (!db || !collectionID) return;
                const completetionResult = await db.get(
                        'incomplete',
                        collectionID
                );

                if (!completetionResult)
                        throw `While submitting and trying to retrieve collection result from incomplete object store didn't find the collection. `;

                const numberOfCorrectAnswers =
                        completetionResult.attemp.cards.reduce(
                                (acc, testCard) => {
                                        const someCorrect =
                                                testCard.options.some(
                                                        (opt) =>
                                                                opt.isCorrect &&
                                                                opt.optionChosen
                                                );
                                        return acc + Number(someCorrect);
                                },
                                0
                        );

                const completeAttemp: CompleteAttemp & {
                        id: string;
                } = {
                        id: collectionID,
                        attempID: collectionID,
                        cards: completetionResult.attemp.cards,
                        numberOfCorrectAnswers,
                        numberOfQuestions:
                                completetionResult.attemp.cards.length,
                        endTime: Date.now(),
                        duration:
                                Date.now() - completetionResult.attemp.startTime
                };

                const result = {
                        id: collectionID,
                        collectionName: completetionResult.collectionName,
                        attemps: [completeAttemp],
                        attemp: completeAttemp
                };

                await db.put('complete', result);

                await db.delete('incomplete', collectionID);

                db.close();
                redirect(`/main/history/view?id=${collectionID}`);
        };

        return { submit };
}

export function useGetResultInfo() {
        const collectionID = useIdContext();

        const { db } = useDB();
        const [data, setData] = useState<CollectionStoryComplete | null>(null);

        useEffect(() => {
                (async () => {
                        if (!db || !collectionID) return;

                        const result =
                                (await db.get('complete', collectionID)) ||
                                null;
                        setData(result);
                })();
        }, [db]);

        return data;
}
