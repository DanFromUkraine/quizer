'use client';

import { useAtomCallback } from 'jotai/utils';
import parseTextIntoCardsArray from '@/src/utils/parseTextIntoCardsArray';
import { currentBookIdAtom } from '@/src/jotai/idManagers';
import { useCallback } from 'react';
import { booksAtomFamily } from '@/src/jotai/mainAtoms';
import {
        getCardType,
        getListForInsert,
        getListForUpdate,
        getListWhereNoSuchIds,
        getListWithIdsForDelete,
        getListWithSuchIds
} from '@/src/utils/lists';
import getUniqueID from '@/src/utils/getUniqueID';
import {
        FullCardFromText,
        FullTermDefinitionCardFromText
} from '@/src/types/cardsTextParser';
import { Getter, Setter } from 'jotai';
import { updateBookAtom } from '@/src/jotai/bookAtoms';

interface InsertCardsReducerOutput {
        explicitCardIdsToInsert: string[];
        shortCardIdsToInsert: string[];
        cardIdsOrderToInsert: string[];
}

interface DeleteCardsReducerOutput {
        explicitCardIdsToDelete: string[];
        shortCardIdsToDelete: string[];
        cardIdsOrderToDelete: string[];
}

type ReducerInsertCallback = (
        _acc: InsertCardsReducerOutput,
        card: FullCardFromText | FullTermDefinitionCardFromText
) => InsertCardsReducerOutput;

type ReducerDeleteCallback = (
        _acc: DeleteCardsReducerOutput,
        cardId: string
) => DeleteCardsReducerOutput;

type CardUpdateCallback = (
        card: FullCardFromText | FullTermDefinitionCardFromText,
        index: number
) => void;

function getInsertReducerCallbackAndStartValue(): [
        callback: ReducerInsertCallback,
        InsertCardsReducerOutput
] {
        const cardIdsOrderToInsert: string[] = [];
        const explicitCardIdsToInsert: string[] = [];
        const shortCardIdsToInsert: string[] = [];

        return [
                (_acc, card) => {
                        const newCardId = getUniqueID();

                        if (card.type === 'explicit') {
                                explicitCardIdsToInsert.push(newCardId);
                                /* EXPLICIT CARD UPDATE LOGIC*/
                        } else if (card.type === 'short') {
                                shortCardIdsToInsert.push(newCardId);
                                /* SHORT CARD UPDATE LOGIC*/
                        }

                        return {
                                explicitCardIdsToInsert,
                                shortCardIdsToInsert,
                                cardIdsOrderToInsert
                        };
                },
                {
                        explicitCardIdsToInsert: [],
                        shortCardIdsToInsert: [],
                        cardIdsOrderToInsert: []
                }
        ];
}

function getDeleteReducerCallbackAndStartValue({
        shortCardIds,
        explicitCardIds
}: {
        shortCardIds: string[];
        explicitCardIds: string[];
}): [callback: ReducerDeleteCallback, startValue: DeleteCardsReducerOutput] {
        const explicitCardIdsToDelete: string[] = [];
        const shortCardIdsToDelete: string[] = [];
        const cardIdsOrderToDelete: string[] = [];

        return [
                (_acc, cardId) => {
                        const cardType = getCardType({
                                targetId: cardId,
                                shortCardIds,
                                explicitCardIds
                        });

                        cardIdsOrderToDelete.push(cardId);

                        if (cardType === 'explicit') {
                                explicitCardIdsToDelete.push(cardId);
                                /* EXPLICIT CARD DELETE LOGIC*/
                        } else if (cardType === 'short') {
                                shortCardIdsToDelete.push(cardId);
                                /* SHORT CARD DELETE LOGIC */
                        }

                        return {
                                explicitCardIdsToDelete,
                                shortCardIdsToDelete,
                                cardIdsOrderToDelete
                        };
                },
                {
                        explicitCardIdsToDelete: [],
                        shortCardIdsToDelete: [],
                        cardIdsOrderToDelete: []
                }
        ];
}

function getCardUpdateCallback(cardIdsOrder: string[]): CardUpdateCallback {
        return (card, index) => {
                const cardId = cardIdsOrder[index];

                if (card.type === 'explicit') {
                        /* EXPLICIT CARD UPDATE LOGIC*/
                } else if (card.type === 'short') {
                        /* SHORT CARD UPDATE LOGIC */
                }
        };
}

function updateBookAtomHelper({
        cardIdsOrder,
        explicitCardIds,
        shortCardIds,
        idsToDelete: {
                cardIdsOrderToDelete,
                shortCardIdsToDelete,
                explicitCardIdsToDelete
        },
        idsToInsert: {
                cardIdsOrderToInsert,
                shortCardIdsToInsert,
                explicitCardIdsToInsert
        },
        get,
        set,
        bookId
}: {
        cardIdsOrder: string[];
        explicitCardIds: string[];
        shortCardIds: string[];
        idsToInsert: InsertCardsReducerOutput;
        idsToDelete: DeleteCardsReducerOutput;
        bookId: string;
        get: Getter;
        set: Setter;
}) {
        const bookAtom = booksAtomFamily(bookId);
        const prevBook = get(bookAtom);

        if (cardIdsOrderToInsert.length > 0) {
                const newCardIdsOrder = getListWithSuchIds(
                        cardIdsOrder,
                        cardIdsOrderToInsert
                );
                const newExplicitCardIds = getListWithSuchIds(
                        explicitCardIds,
                        explicitCardIdsToInsert
                );
                const newShortCardIds = getListWithSuchIds(
                        shortCardIds,
                        shortCardIdsToInsert
                );
                set(updateBookAtom, {
                        ...prevBook,
                        cardIdsOrder: newCardIdsOrder,
                        explicitCardIds: newExplicitCardIds,
                        shortCardIds: newShortCardIds
                });
        } else if (cardIdsOrderToDelete.length > 0) {
                const newCardIdsOrder = getListWhereNoSuchIds(
                        cardIdsOrder,
                        cardIdsOrderToDelete
                );
                const newExplicitCardIds = getListWhereNoSuchIds(
                        explicitCardIds,
                        explicitCardIdsToDelete
                );
                const newShortCardIds = getListWhereNoSuchIds(
                        shortCardIds,
                        shortCardIdsToDelete
                );
                set(updateBookAtom, {
                        ...prevBook,
                        cardIdsOrder: newCardIdsOrder,
                        explicitCardIds: newExplicitCardIds,
                        shortCardIds: newShortCardIds
                });
        }
}

export default function useGetUpdateCardsFromText() {
        return useAtomCallback(
                useCallback((get, set, cardsTextUpToDate: string) => {
                        const cardsArray =
                                parseTextIntoCardsArray(cardsTextUpToDate);
                        const bookId = get(currentBookIdAtom);
                        const { cardIdsOrder, shortCardIds, explicitCardIds } =
                                get(booksAtomFamily(bookId));

                        const idsToInsert = getListForInsert(
                                cardsArray,
                                cardIdsOrder
                        ).reduce<InsertCardsReducerOutput>(
                                ...getInsertReducerCallbackAndStartValue()
                        );

                        const idsToDelete = getListWithIdsForDelete(
                                cardsArray,
                                cardIdsOrder
                        ).reduce<DeleteCardsReducerOutput>(
                                ...getDeleteReducerCallbackAndStartValue({
                                        shortCardIds,
                                        explicitCardIds
                                })
                        );

                        getListForUpdate(cardsArray, cardIdsOrder).forEach(
                                getCardUpdateCallback(cardIdsOrder)
                        );

                        updateBookAtomHelper({
                                cardIdsOrder,
                                shortCardIds,
                                explicitCardIds,
                                idsToDelete,
                                idsToInsert,
                                get,
                                set
                        });
                }, [])
        );
}
