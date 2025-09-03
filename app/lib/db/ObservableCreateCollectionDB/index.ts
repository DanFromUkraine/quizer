'use client';

import { useRouter } from 'next/navigation';
import { use, useEffect, useMemo, useState } from 'react';

import {
        useAddCard,
        useRemoveCard
} from '@/app/main/add-collection/CardsContext/provider';
import { useCollectionTitleState } from '@/app/main/add-collection/CollectionTitleContext';
import { useAddCollection } from '../MainPageDB';
import { getOrAndInit } from '../utils';
import { useObservableContext } from './context';
import { CollectionResult, CreateModeQuestionCardType } from './types';
import { deleteThisDB } from './utils';
import { useCardsContext } from '@/app/main/add-collection/CardsContext/context';

export function useGetCollectionTitle() {
        const obs = useObservableContext();
        const [loading, setLoading] = useState(true);
        const [defaultCollectionTitle, setDefaultCollectionTitle] =
                useState('');

        useEffect(() => {
                obs?.requestData('initialize page title', (db) => {
                        getOrAndInit({
                                db,
                                storeName: 'meta',
                                key: 'collectionTitle',
                                initVal: { id: 'collectionTitle', value: '' }
                        }).then((result) => {
                                if ('value' in result) {
                                        setDefaultCollectionTitle(result.value);
                                        setLoading(false);
                                }
                        });
                });
        }, []);

        return { defaultCollectionTitle, loading };
}

export function useUpdatePageTitle() {
        const obs = useObservableContext();

        const updateTitle = (newTitle: string) => {
                obs?.requestData('update page title', async (db) => {
                        await db.put('meta', {
                                id: 'collectionTitle',
                                value: newTitle
                        });
                });
        };

        return { updateTitle };
}

export function useCards() {
        const obs = useObservableContext();
        const { cards, setCardsStateOnly } = useCardsContext()!;

        useEffect(() => {
                obs?.requestData('get all cards', async (db) => {
                        const resultCards = await db.getAll('cards');
                        setCardsStateOnly(resultCards);
                });
        }, []);

        return { cards, setCardsStateOnly };
}

export function useAddEmptyCard() {
        const obs = useObservableContext();
        const { addCard } = useAddCard();

        const addEmptyCard = () => {
                const emptyCard = {
                        questionTitle: '',
                        options: [],
                        numberOfCorrectAnswers: 0
                } as {};

                obs?.requestData('add empty card', async (db) => {
                        const newCardID = await db.add(
                                'cards',
                                emptyCard as CreateModeQuestionCardType
                        );

                        const fullEmptyCard = Object.assign(
                                emptyCard as CreateModeQuestionCardType,
                                {
                                        id: newCardID as number
                                }
                        );

                        addCard(fullEmptyCard);
                });
        };

        return { addEmptyCard };
}

export function useLazyUpdateCard() {
        const obs = useObservableContext();

        const lazyUpdateCard = (newCardData: CreateModeQuestionCardType) => {
                obs?.requestData('lazy update card', async (db) => {
                        db.put('cards', newCardData);
                });
        };

        return { lazyUpdateCard };
}

export function useOnClickDeleteCard(id: number) {
        const obs = useObservableContext();
        const { removeCard } = useRemoveCard();

        const onClickDeleteCard = async () => {
                obs?.requestData('delete card', async (db) => {
                        await db.delete('cards', id);
                        removeCard(id);
                });
        };

        return { onClickDeleteCard };
}

export function useSaveCollection() {
        const { addCollection } = useAddCollection();
        const router = useRouter();
        const obs = useObservableContext();
        // const { promisedCollectionTitle } = useGetCollectionTitle();
        // const collectionTitle = use(promisedCollectionTitle);
        const { cards } = useCards();
        const collectionTitle = 'some collection title';

        const onSaveButtonClick = async () => {
                obs?.requestData('save collection', async (db) => {
                        if (
                                typeof collectionTitle !== 'string' ||
                                !Array.isArray(cards)
                        )
                                throw 'collectionTitle, or cards are wrong type (just got them right from db)';

                        const filteredCards = cards.filter(
                                (card) =>
                                        typeof card.questionTitle ===
                                                'string' &&
                                        card.questionTitle.length > 0
                        );

                        const result: CollectionResult = {
                                id: new URLSearchParams(
                                        collectionTitle
                                ).toString(),
                                timestamp: Date.now(),
                                collectionTitle,
                                cards: filteredCards
                        };

                        deleteThisDB(() => db?.close())
                                .then(async () => await addCollection(result))
                                .then(() => {
                                        router.replace('/main');
                                });
                });
        };

        return { onSaveButtonClick };
}
