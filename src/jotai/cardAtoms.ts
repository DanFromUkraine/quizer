/* 'todo' - This file is kinda huge. Need to divide it into small peaces
 */

import { getDerivedAtomWithIdb } from '@/src/utils/jotai/getDerivedAtomWithIdb';
import getUniqueID from '@/src/utils/getUniqueID';
import { getBookWithNewId, getNewBookWithDeletedCardId } from '@/src/utils/jotai/mainDbUtils';
import { booksAtomFamily, explicitCardsAtomFamily, shortCardsAtomFamily } from '@/src/jotai/mainAtoms';
import {
        addEmptyExplicitCardIdb,
        addEmptyShortCardIdb,
        deleteExplicitCardIdb,
        deleteShortCardIdb,
        updateBookIdb,
        updateExplicitCardIdb,
        updateShortCardIdb
} from '@/src/utils/idb/main/actions';
import {
        getAtomFamilyDeleteAtom_NoFatherUpdate,
        getAtomFamilyUpdateAtom,
        updateBookAtomHelper
} from '@/src/utils/jotai/helpers';
import { currentBookIdAtom } from '@/src/jotai/idManagers';
import { atom, Getter, Setter } from 'jotai';
import { getListForInsert, getListForUpdate, getListWithIdsForDelete } from '@/src/utils/lists';
import {
        DeleteCardsReducerOutput,
        FullCardFromText,
        InsertCardsReducerOutput,
        UpdateCardsReducerOutput,
        WithId
} from '@/src/types/updateCardsFromText';
import {
        getDeleteAnyCardsReducerCallbackAndInitValue,
        getInsertAnyCardsReducerCallbackAndInitValue,
        getReducerForDeleteOptionsAndInitData,
        getReducerForInsertOptionsAndInitData,
        getShortCardOnlyDeleteReducer,
        getShortCardOnlyInsertReducer,
        getShortCardOnlyUpdateCallback,
        getUpdateAnyCardsReducerCallbackAndInitValue,
        getUpdateOptionCallback,
        updateBookAnyCardIdsAtomHelper,
        updateCardAtomHelper,
        updateShortCardsOnlyAtomHelper
} from '@/src/utils/jotai/updateCardsFromTextReducers';
import { parseTextIntoAnyCardsArray, parseTextIntoOnlyShortCardsArray } from '@/src/utils/cardsAsText/fromTextToCards';
import { atomFamily } from 'jotai/utils';
import { deleteOptionAtom } from '@/src/jotai/optionAtoms';

export const updateCardViaTextAtomFamily = atomFamily((_cardId: string) =>
        atom(0)
);

export const incrementUpdateCountAtom = atom(
        null,
        (get, set, cardId: string) => {
                set(updateCardViaTextAtomFamily(cardId), (prev) => prev + 1);
        }
);

export const addEmptyExplicitCardAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb) => {
                const cardId = getUniqueID();
                const bookId = get(currentBookIdAtom);
                const newBook = getBookWithNewId({
                        get,
                        bookId,
                        cardId,
                        cardType: 'explicit'
                });
                await updateBookIdb(mainDb, newBook);
                await addEmptyExplicitCardIdb(mainDb, cardId);
                updateBookAtomHelper(set, newBook);
        }
);

export const addEmptyTermShortCard = getDerivedAtomWithIdb(
        async (get, set, mainDb) => {
                const cardId = getUniqueID();
                const bookId = get(currentBookIdAtom);
                const newBook = getBookWithNewId({
                        get,
                        bookId,
                        cardId,
                        cardType: 'short'
                });
                await updateBookIdb(mainDb, newBook);
                await addEmptyShortCardIdb(mainDb, cardId);
                updateBookAtomHelper(set, newBook);
        }
);

export const updateExplicitCardAtom = getAtomFamilyUpdateAtom({
        atomFamily: explicitCardsAtomFamily,
        updateIdb: updateExplicitCardIdb
});

export const updateShortCardAtom = getAtomFamilyUpdateAtom({
        atomFamily: shortCardsAtomFamily,
        updateIdb: updateShortCardIdb
});

export const deleteExplicitCardAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb, cardId: string) => {
                const newBook = getNewBookWithDeletedCardId(get, cardId);
                await updateBookIdb(mainDb, newBook);
                await deleteExplicitCardIdb(mainDb, cardId);
                updateBookAtomHelper(set, newBook);
                await deleteOptionsOnCardDeleteAtomHelper(get, set, cardId);
                explicitCardsAtomFamily.remove(cardId);
        }
);

export const deleteShortCardAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb, cardId: string) => {
                const newBook = getNewBookWithDeletedCardId(get, cardId);
                await updateBookIdb(mainDb, newBook);
                await deleteShortCardIdb(mainDb, cardId);
                updateBookAtomHelper(set, newBook);
                explicitCardsAtomFamily.remove(cardId);
        }
);

export const deleteExplicitCardViaTextAtom =
        getAtomFamilyDeleteAtom_NoFatherUpdate({
                atomFamily: explicitCardsAtomFamily,
                deleteIdb: deleteExplicitCardIdb
        });

export const deleteShortCardViaTextAtom =
        getAtomFamilyDeleteAtom_NoFatherUpdate({
                atomFamily: shortCardsAtomFamily,
                deleteIdb: deleteShortCardIdb
        });

export const updateExplicitCardViaText = atom(
        null,
        async (get, set, newCard: FullCardFromText & WithId) => {
                const { childrenIds } = get(
                        explicitCardsAtomFamily(newCard.id)
                );
                const options = newCard.options;

                const asyncOptionIdsToInsert = getListForInsert(
                        options,
                        childrenIds
                ).reduce<Promise<string[]>>(
                        ...getReducerForInsertOptionsAndInitData(set)
                );
                const asyncOptionIdsToDelete = getListWithIdsForDelete(
                        options,
                        childrenIds
                ).reduce<Promise<string[]>>(
                        ...getReducerForDeleteOptionsAndInitData(set)
                );

                const asyncVoidListToUpdate = getListForUpdate(
                        options,
                        childrenIds
                ).map(
                        getUpdateOptionCallback({
                                optionIds: childrenIds,
                                set
                        })
                );

                const [optionIdsToInsert, optionIdsToDelete] =
                        await Promise.all([
                                asyncOptionIdsToInsert,
                                asyncOptionIdsToDelete,
                                asyncVoidListToUpdate
                        ]);

                await updateCardAtomHelper({
                        optionIds: childrenIds,
                        optionIdsToInsert,
                        optionIdsToDelete,
                        card: newCard,
                        set
                });
        }
);




export const updateAnyCardsFromTextAtom = atom(
        null,
        async (get, set, cardsText: string) => {
                const cardsArray = parseTextIntoAnyCardsArray(cardsText);
                const bookId = get(currentBookIdAtom);

                const { cardIdsOrder, shortCardIds, explicitCardIds } = get(
                        booksAtomFamily(bookId)
                );

                const asyncIdsToInsert = getListForInsert(
                        cardsArray,
                        cardIdsOrder
                ).reduce<Promise<InsertCardsReducerOutput>>(
                        ...getInsertAnyCardsReducerCallbackAndInitValue(set)
                );

                const asyncIdsToDelete = getListWithIdsForDelete(
                        cardsArray,
                        cardIdsOrder
                ).reduce<Promise<DeleteCardsReducerOutput>>(
                        ...getDeleteAnyCardsReducerCallbackAndInitValue({
                                shortCardIds,
                                explicitCardIds,
                                set
                        })
                );

                const asyncIdsToUpdate = getListForUpdate(
                        cardsArray,
                        cardIdsOrder
                ).reduce<Promise<UpdateCardsReducerOutput>>(
                        ...getUpdateAnyCardsReducerCallbackAndInitValue({
                                set,
                                cardIdsOrder,
                                shortCardIds,
                                explicitCardIds
                        })
                );

                const [idsToInsert, idsToDelete, idsToUpdate] =
                        await Promise.all([
                                asyncIdsToInsert,
                                asyncIdsToDelete,
                                asyncIdsToUpdate
                        ]);

                await updateBookAnyCardIdsAtomHelper({
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
        }
);

export const updateOnlyShortCardsFromTextAtom = atom(
        null,
        async (get, set, cardsText: string) => {
                const cardsArray = parseTextIntoOnlyShortCardsArray(cardsText);
                const bookId = get(currentBookIdAtom);
                const { shortCardIds } = get(booksAtomFamily(bookId));

                const asyncVoidListToUpdate = getListForUpdate(
                        cardsArray,
                        shortCardIds
                ).map(getShortCardOnlyUpdateCallback({ set, shortCardIds }));
                const asyncIdsToInsert = getListForInsert(
                        cardsArray,
                        shortCardIds
                ).reduce<Promise<string[]>>(
                        ...getShortCardOnlyInsertReducer(set)
                );

                const asyncIdsToDelete = getListWithIdsForDelete(
                        cardsArray,
                        shortCardIds
                ).reduce(...getShortCardOnlyDeleteReducer(set));

                const [cardIdsToInsert, cardIdsToDelete] = await Promise.all([
                        asyncIdsToInsert,
                        asyncIdsToDelete,
                        asyncVoidListToUpdate
                ]);

                await updateShortCardsOnlyAtomHelper({
                        cardIdsToDelete,
                        cardIdsToInsert,
                        get,
                        set,
                        bookId
                });
        }
);

async function deleteOptionsOnCardDeleteAtomHelper(
        get: Getter,
        set: Setter,
        cardId: string
) {
        const { childrenIds } = get(explicitCardsAtomFamily(cardId));
        for await (const optionId of childrenIds) {
                await set(deleteOptionAtom, cardId, optionId);
        }
}
