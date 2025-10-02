'use client';

/* todo Currently I have few problems:
 *  1. You can't actually change type of cards on the fly.
 */

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
import { FullCardFromText, FullTermDefinitionCardFromText } from '@/src/types/cardsTextParser';
import { Getter, Setter } from 'jotai';
import {
        deleteExplicitCardAtom,
        deleteExplicitCardViaTextAtom,
        deleteShortCardAtom,
        deleteShortCardViaTextAtom,
        updateExplicitCardViaText,
        updateShortCardAtom
} from '@/src/jotai/cardAtoms';
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

interface UpdateCardsReducerOutput {
        explicitCardIdsToInsertAfterTypeChange: string[];
        explicitCardIdsToDeleteAfterTypeChange: string[];
        shortCardIdsToInsertAfterTypeChange: string[];
        shortCardIdsToDeleteAfterTypeChange: string[];
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

type CardUpdateReducer = (
        _acc: UpdateCardsReducerOutput,
        card: FullCardFromText | FullTermDefinitionCardFromText,
        index: number
) => UpdateCardsReducerOutput;

function getInsertReducerCallbackAndStartValue(
        set: Setter
): [callback: ReducerInsertCallback, InsertCardsReducerOutput] {
        const cardIdsOrderToInsert: string[] = [];
        const explicitCardIdsToInsert: string[] = [];
        const shortCardIdsToInsert: string[] = [];

        return [
                (_acc, card) => {
                        const newCardId = getUniqueID();

                        cardIdsOrderToInsert.push(newCardId);
                        if (card.type === 'explicit') {
                                explicitCardIdsToInsert.push(newCardId);
                                set(updateExplicitCardViaText, {
                                        ...card,
                                        id: newCardId
                                });
                        } else if (card.type === 'short') {
                                shortCardIdsToInsert.push(newCardId);
                                set(updateShortCardAtom, {
                                        ...card,
                                        id: newCardId
                                });
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
        explicitCardIds,
        set
}: {
        shortCardIds: string[];
        explicitCardIds: string[];
        set: Setter;
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
                                set(deleteExplicitCardAtom, cardId);
                        } else if (cardType === 'short') {
                                shortCardIdsToDelete.push(cardId);
                                set(deleteShortCardAtom, cardId);
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

function getUpdateCardsReducerCallbackAndInitValue({
        set,
        cardIdsOrder,
        explicitCardIds,
        shortCardIds
}: {
        set: Setter;
        cardIdsOrder: string[];
        explicitCardIds: string[];
        shortCardIds: string[];
}): [CardUpdateReducer, UpdateCardsReducerOutput] {
        const result: UpdateCardsReducerOutput = {
                explicitCardIdsToInsertAfterTypeChange: [],
                explicitCardIdsToDeleteAfterTypeChange: [],
                shortCardIdsToDeleteAfterTypeChange: [],
                shortCardIdsToInsertAfterTypeChange: []
        };

        const reducer: CardUpdateReducer = (_acc, card, index) => {
                const cardId = cardIdsOrder[index];
                const prevCardType = getCardType({
                        targetId: cardIdsOrder[index],
                        explicitCardIds,
                        shortCardIds
                });

                const updateCard = () => {
                        if (card.type === 'explicit') {
                                set(updateExplicitCardViaText, {
                                        ...(card as FullCardFromText),
                                        id: cardId
                                });
                        } else {
                                set(updateShortCardAtom, {
                                        ...(card as FullTermDefinitionCardFromText),
                                        id: cardId
                                });
                        }
                };

                if (card.type === prevCardType) {
                        updateCard();
                        return result;
                }

                if (card.type === 'explicit') {
                        set(deleteShortCardViaTextAtom, cardId);
                        updateCard();
                        result.shortCardIdsToDeleteAfterTypeChange.push(cardId);
                        result.explicitCardIdsToInsertAfterTypeChange.push(
                                cardId
                        );
                } else if (card.type === "short") {
                        set(deleteExplicitCardViaTextAtom, cardId);
                        updateCard();
                        result.explicitCardIdsToDeleteAfterTypeChange.push(
                                cardId
                        );
                        result.shortCardIdsToInsertAfterTypeChange.push(cardId);
                }

                return result;
        };

        return [
                reducer,
                {
                        explicitCardIdsToInsertAfterTypeChange: [],
                        explicitCardIdsToDeleteAfterTypeChange: [],
                        shortCardIdsToDeleteAfterTypeChange: [],
                        shortCardIdsToInsertAfterTypeChange: []
                }
        ];
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
        idsToUpdate: {
                explicitCardIdsToInsertAfterTypeChange,
                explicitCardIdsToDeleteAfterTypeChange,
                shortCardIdsToInsertAfterTypeChange,
                shortCardIdsToDeleteAfterTypeChange
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
        idsToUpdate: UpdateCardsReducerOutput;
        bookId: string;
        get: Getter;
        set: Setter;
}) {
        const bookAtom = booksAtomFamily(bookId);
        const prevBook = get(bookAtom);

        let newCardIdsOrder: string[] = cardIdsOrder;
        let newExplicitCardIds: string[] = explicitCardIds;
        let newShortCardIds: string[] = shortCardIds;

        if (cardIdsOrderToInsert.length > 0) {
                // Handle new cards (cards that didn't exist before)
                newCardIdsOrder = getListWithSuchIds(
                        cardIdsOrder,
                        cardIdsOrderToInsert
                );
                newExplicitCardIds = getListWithSuchIds(
                        explicitCardIds,
                        explicitCardIdsToInsert
                );
                newShortCardIds = getListWithSuchIds(
                        shortCardIds,
                        shortCardIdsToInsert
                );
        }
        if (cardIdsOrderToDelete.length > 0) {
                // Handle cards to delete (These cards ones existed, but now they will be deleted)
                newCardIdsOrder = getListWhereNoSuchIds(
                        cardIdsOrder,
                        cardIdsOrderToDelete
                );
                newExplicitCardIds = getListWhereNoSuchIds(
                        explicitCardIds,
                        explicitCardIdsToDelete
                );
                newShortCardIds = getListWhereNoSuchIds(
                        shortCardIds,
                        shortCardIdsToDelete
                );
        }

        if (explicitCardIdsToInsertAfterTypeChange.length > 0) {
                // Previously card at this index was of type term-definition, but now at this index card of type explicit
                newExplicitCardIds = getListWithSuchIds(
                        newExplicitCardIds,
                        explicitCardIdsToInsertAfterTypeChange
                );
                newShortCardIds = getListWhereNoSuchIds(
                        newShortCardIds,
                        shortCardIdsToDeleteAfterTypeChange
                );
        }
        if (shortCardIdsToInsertAfterTypeChange.length > 0) {
                // Previously card at this index was of type explicit, but now at this index card of type term-definition
                newExplicitCardIds = getListWhereNoSuchIds(
                        newExplicitCardIds,
                        explicitCardIdsToDeleteAfterTypeChange
                );
                newShortCardIds = getListWithSuchIds(
                        newShortCardIds,
                        shortCardIdsToInsertAfterTypeChange
                );
        }

        console.debug({
                newCardIdsOrder,
                newExplicitCardIds,
                newShortCardIds
        });

        set(updateBookAtom, {
                ...prevBook,
                cardIdsOrder: newCardIdsOrder,
                explicitCardIds: newExplicitCardIds,
                shortCardIds: newShortCardIds
        });
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
                                ...getInsertReducerCallbackAndStartValue(set)
                        );

                        const idsToDelete = getListWithIdsForDelete(
                                cardsArray,
                                cardIdsOrder
                        ).reduce<DeleteCardsReducerOutput>(
                                ...getDeleteReducerCallbackAndStartValue({
                                        shortCardIds,
                                        explicitCardIds,
                                        set
                                })
                        );

                        const idsToUpdate = getListForUpdate(
                                cardsArray,
                                cardIdsOrder
                        ).reduce<UpdateCardsReducerOutput>(
                                ...getUpdateCardsReducerCallbackAndInitValue({
                                        set,
                                        cardIdsOrder,
                                        shortCardIds,
                                        explicitCardIds
                                })
                        );

                        console.debug({ idsToUpdate });

                        updateBookAtomHelper({
                                cardIdsOrder,
                                shortCardIds,
                                explicitCardIds,
                                idsToDelete,
                                idsToInsert,
                                bookId,
                                get,
                                set,
                                idsToUpdate
                        });
                }, [])
        );
}
