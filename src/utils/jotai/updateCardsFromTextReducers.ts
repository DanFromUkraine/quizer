import getUniqueID from '@/src/utils/getUniqueID';
import {
        deleteExplicitCardAtom,
        deleteExplicitCardViaTextAtom,
        deleteShortCardAtom,
        deleteShortCardViaTextAtom,
        updateExplicitCardAtom,
        updateExplicitCardViaText,
        updateShortCardAtom
} from '@/src/jotai/cardAtoms';
import {
        getCardType,
        getListWhereNoSuchIds,
        getListWithSuchIds
} from '@/src/utils/lists';
import { booksAtomFamily } from '@/src/jotai/mainAtoms';
import { updateBookAtom } from '@/src/jotai/bookAtoms';
import { Getter, Setter } from 'jotai';
import {
        CardUpdateReducer,
        DeleteCardsReducerOutput,
        DeleteOptionReducer,
        FullCardFromText,
        FullTermDefinitionCardFromText,
        InsertCardsReducerOutput,
        InsertOptionReducer,
        ReducerDeleteCallback,
        ReducerInsertCallback,
        ShortCardOnlyDeleteReducer,
        ShortCardOnlyInsertReducer,
        UpdateCardsReducerOutput,
        UpdateOptionCallback,
        WithId
} from '@/src/types/updateCardsFromText';
import {
        deleteOptionViaTextAtom,
        updateOptionAtom
} from '@/src/jotai/optionAtoms';

export function getInsertAnyCardsReducerCallbackAndInitValue(
        set: Setter
): [callback: ReducerInsertCallback, Promise<InsertCardsReducerOutput>] {
        const cardIdsOrderToInsert: string[] = [];
        const explicitCardIdsToInsert: string[] = [];
        const shortCardIdsToInsert: string[] = [];

        const reducer: ReducerInsertCallback = async (_acc, card) => {
                const newCardId = getUniqueID();

                cardIdsOrderToInsert.push(newCardId);
                if (card.type === 'explicit') {
                        explicitCardIdsToInsert.push(newCardId);
                        await set(updateExplicitCardViaText, {
                                ...card,
                                id: newCardId
                        });
                } else if (card.type === 'short') {
                        shortCardIdsToInsert.push(newCardId);
                        await set(updateShortCardAtom, {
                                ...card,
                                id: newCardId
                        });
                }

                return {
                        explicitCardIdsToInsert,
                        shortCardIdsToInsert,
                        cardIdsOrderToInsert
                };
        };

        return [
                reducer,
                Promise.resolve({
                        explicitCardIdsToInsert: [],
                        shortCardIdsToInsert: [],
                        cardIdsOrderToInsert: []
                })
        ];
}

export function getDeleteAnyCardsReducerCallbackAndInitValue({
        shortCardIds,
        explicitCardIds,
        set
}: {
        shortCardIds: string[];
        explicitCardIds: string[];
        set: Setter;
}): [
        callback: ReducerDeleteCallback,
        startValue: Promise<DeleteCardsReducerOutput>
] {
        const explicitCardIdsToDelete: string[] = [];
        const shortCardIdsToDelete: string[] = [];
        const cardIdsOrderToDelete: string[] = [];

        const reducer: ReducerDeleteCallback = async (_acc, cardId) => {
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
        };

        return [
                reducer,
                Promise.resolve({
                        explicitCardIdsToDelete: [],
                        shortCardIdsToDelete: [],
                        cardIdsOrderToDelete: []
                })
        ];
}

export function getUpdateAnyCardsReducerCallbackAndInitValue({
        set,
        cardIdsOrder,
        explicitCardIds,
        shortCardIds
}: {
        set: Setter;
        cardIdsOrder: string[];
        explicitCardIds: string[];
        shortCardIds: string[];
}): [CardUpdateReducer, Promise<UpdateCardsReducerOutput>] {
        const result: UpdateCardsReducerOutput = {
                explicitCardIdsToInsertAfterTypeChange: [],
                explicitCardIdsToDeleteAfterTypeChange: [],
                shortCardIdsToDeleteAfterTypeChange: [],
                shortCardIdsToInsertAfterTypeChange: []
        };

        const reducer: CardUpdateReducer = async (_acc, card, index) => {
                const cardId = cardIdsOrder[index];
                const prevCardType = getCardType({
                        targetId: cardIdsOrder[index],
                        explicitCardIds,
                        shortCardIds
                });

                const updateCard = async () => {
                        if (card.type === 'explicit') {
                                await set(updateExplicitCardViaText, {
                                        ...(card as FullCardFromText),
                                        id: cardId
                                });
                        } else {
                                await set(updateShortCardAtom, {
                                        ...(card as FullTermDefinitionCardFromText),
                                        id: cardId
                                });
                        }
                };

                if (card.type === prevCardType) {
                        await updateCard();
                        return result;
                }

                if (card.type === 'explicit') {
                        set(deleteShortCardViaTextAtom, cardId);
                        await updateCard();
                        result.shortCardIdsToDeleteAfterTypeChange.push(cardId);
                        result.explicitCardIdsToInsertAfterTypeChange.push(
                                cardId
                        );
                } else if (card.type === 'short') {
                        set(deleteExplicitCardViaTextAtom, cardId);
                        await updateCard();
                        result.explicitCardIdsToDeleteAfterTypeChange.push(
                                cardId
                        );
                        result.shortCardIdsToInsertAfterTypeChange.push(cardId);
                }

                return result;
        };

        return [
                reducer,
                Promise.resolve({
                        explicitCardIdsToInsertAfterTypeChange: [],
                        explicitCardIdsToDeleteAfterTypeChange: [],
                        shortCardIdsToDeleteAfterTypeChange: [],
                        shortCardIdsToInsertAfterTypeChange: []
                })
        ];
}

export async function updateBookAnyCardIdsAtomHelper({
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

        await set(updateBookAtom, {
                ...prevBook,
                cardIdsOrder: newCardIdsOrder,
                explicitCardIds: newExplicitCardIds,
                shortCardIds: newShortCardIds
        });
}

export function getReducerForInsertOptionsAndInitData(
        set: Setter
): [InsertOptionReducer, Promise<string[]>] {
        const newOptionIds: string[] = [];
        return [
                async (_acc, { optionTitle, isCorrect }) => {
                        const newOptionId = getUniqueID();
                        newOptionIds.push(newOptionId);
                        await set(updateOptionAtom, {
                                id: newOptionId,
                                optionTitle,
                                isCorrect
                        });
                        return newOptionIds;
                },
                Promise.resolve([])
        ];
}

export function getReducerForDeleteOptionsAndInitData(
        set: Setter
): [DeleteOptionReducer, Promise<string[]>] {
        const optionIdsToDelete: string[] = [];

        return [
                async (_acc, optionId) => {
                        optionIdsToDelete.push(optionId);
                        await set(deleteOptionViaTextAtom, optionId);
                        return optionIdsToDelete;
                },
                Promise.resolve([])
        ];
}

export function getUpdateOptionCallback({
        optionIds,
        set
}: {
        optionIds: string[];
        set: Setter;
}): UpdateOptionCallback {
        return async (option, index) => {
                const optionId = optionIds[index];
                await set(updateOptionAtom, {
                        id: optionId,
                        ...option
                });
        };
}

export async function updateCardAtomHelper({
        optionIdsToInsert,
        optionIdsToDelete,
        optionIds,
        set,
        card: { options: _options, ...usefulCardData }
}: {
        optionIdsToInsert: string[];
        optionIdsToDelete: string[];
        optionIds: string[];
        card: FullCardFromText & WithId;
        set: Setter;
}) {
        let newOptionIds: string[] = optionIds;

        if (optionIdsToInsert.length > 0) {
                newOptionIds = getListWithSuchIds(optionIds, optionIdsToInsert);
        } else if (optionIdsToDelete.length > 0) {
                newOptionIds = getListWhereNoSuchIds(
                        optionIds,
                        optionIdsToDelete
                );
        }

        await set(updateExplicitCardAtom, {
                ...usefulCardData,
                childrenIds: newOptionIds
        });
}

export function getShortCardOnlyUpdateCallback({
        set,
        shortCardIds
}: {
        set: Setter;
        shortCardIds: string[];
}) {
        return async (card: FullTermDefinitionCardFromText, i: number) => {
                const cardId = shortCardIds[i];
                await set(updateShortCardAtom, { ...card, id: cardId });
        };
}

export function getShortCardOnlyInsertReducer(
        set: Setter
): [ShortCardOnlyInsertReducer, Promise<string[]>] {
        const newIdsToInsert: string[] = [];

        const reducer: ShortCardOnlyInsertReducer = async (_acc, card) => {
                const newId = getUniqueID();
                newIdsToInsert.push(newId);
                await set(updateShortCardAtom, { ...card, id: newId });
                return newIdsToInsert;
        };

        return [reducer, Promise.resolve([])];
}

export function getShortCardOnlyDeleteReducer(set: Setter): [ShortCardOnlyDeleteReducer, Promise<string[]>] {
        const idsToDelete: string[] = [];
        const reducer: ShortCardOnlyDeleteReducer = async (
                _acc,
                cardIdToDelete
        ) => {
                idsToDelete.push(cardIdToDelete)
                await set(deleteShortCardViaTextAtom, cardIdToDelete);
                return idsToDelete;
        };
        return [reducer, Promise.resolve([])];
}

export async function updateShortCardsOnlyAtomHelper({
        cardIdsToInsert,
        cardIdsToDelete,
        get,
        set,
        bookId
}: {
        cardIdsToInsert: string[];
        cardIdsToDelete: string[];
        get: Getter;
        set: Setter;
        bookId: string;
}) {
        const bookAtom = booksAtomFamily(bookId);
        const { cardIdsOrder, shortCardIds, ...other } = get(bookAtom);
        let newCardIdsOrder = cardIdsOrder;
        let newShortCardIds = shortCardIds;
        const areAnyNew = cardIdsToInsert.length > 0;
        const areAnyDeleted = cardIdsToDelete.length > 0;

        console.debug({
                cardIdsToInsert,
                cardIdsToDelete
        })

        const updateBook = async () => {
                await set(updateBookAtom, {
                        ...other,
                        cardIdsOrder: newCardIdsOrder,
                        shortCardIds: newShortCardIds
                });
        };

        if (areAnyNew) {
                newCardIdsOrder = getListWithSuchIds(
                        cardIdsOrder,
                        cardIdsToInsert
                );
                newShortCardIds = getListWithSuchIds(
                        shortCardIds,
                        cardIdsToInsert
                );
        }

        if (areAnyDeleted) {
                newCardIdsOrder = getListWhereNoSuchIds(
                        cardIdsOrder,
                        cardIdsToDelete
                );
                newShortCardIds = getListWhereNoSuchIds(
                        shortCardIds,
                        cardIdsToDelete
                );
        }

        if (areAnyNew || areAnyDeleted) {
                await updateBook();
        }
}
