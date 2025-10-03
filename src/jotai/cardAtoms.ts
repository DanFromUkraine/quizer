/* 'todo' - This file is kinda huge. Need to divide it into small peaces
 */

import getUniqueID from '@/src/utils/getUniqueID';
import { getBookWithNewId, getDerivedAtomWithIdb, getNewBookWithDeletedCardId } from '@/src/utils/jotai/mainDbUtils';
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
import { ExplicitCard, TermDefinitionCard } from '@/src/types/mainDbGlobal';
import { deleteOptionsOnCardDeleteAtomHelper, updateBookAtomHelper } from '@/src/utils/jotai/helpers';
import { currentBookIdAtom } from '@/src/jotai/idManagers';
import { atom } from 'jotai';
import { getListForInsert, getListForUpdate, getListWithIdsForDelete } from '@/src/utils/lists';
import {
        DeleteCardsReducerOutput,
        FullCardFromText,
        InsertCardsReducerOutput,
        UpdateCardsReducerOutput,
        WithId
} from '@/src/types/updateCardsFromText';
import { parseTextIntoAnyCardsArray } from '@/src/utils/parseTextIntoCardsArray';
import {
        getDeleteAnyCardsReducerCallbackAndInitValue,
        getInsertAnyCardsReducerCallbackAndInitValue,
        getReducerForDeleteOptionsAndInitData,
        getReducerForInsertOptionsAndInitData,
        getUpdateAnyCardsReducerCallbackAndInitValue,
        getUpdateOptionCallback,
        updateBookAnyCardIdsAtomHelper,
        updateCardAtomHelper
} from '@/src/utils/jotai/updateCardsFromTextReducers';

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

export const updateExplicitCardAtom = getDerivedAtomWithIdb(
        async (_get, set, mainDb, newCard: ExplicitCard) => {
                console.debug(`
                
                Update explicit card 
                
                `);

                await updateExplicitCardIdb(mainDb, newCard);
                set(explicitCardsAtomFamily(newCard.id), newCard);
        }
);

export const updateShortCardAtom = getDerivedAtomWithIdb(
        async (_get, set, mainDb, newCard: TermDefinitionCard) => {
                console.debug(`
                
                Update short card 
                
                `);

                await updateShortCardIdb(mainDb, newCard);
                set(shortCardsAtomFamily(newCard.id), newCard);
        }
);

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

export const deleteExplicitCardViaTextAtom = getDerivedAtomWithIdb(
        async (_get, _set, mainDb, cardId: string) => {
                await deleteExplicitCardIdb(mainDb, cardId);
                explicitCardsAtomFamily.remove(cardId);
        }
);

export const deleteShortCardViaTextAtom = getDerivedAtomWithIdb(
        async (_get, _set, mainDb, cardId: string) => {
                await deleteShortCardIdb(mainDb, cardId);
                shortCardsAtomFamily.remove(cardId);
        }
);

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

export const updateCardsFromTextAtom = atom(
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
