// 'todo' - when everything will be ready, I need to create more factories, to shorten amount of code
// 'todo' - need to create adequate way to manage delete/add id lists. Because 30 async overwrites of db in a row with difference in 1 item ain't so good rn

'use client';

import { atom, WritableAtom } from 'jotai';
import { atomFamily } from 'jotai/utils';

import { Book, Card, MainDb, Option, StoreMap } from '@/src/types/mainDb';
import {
        addEmptyBookAtomHelper,
        addEmptyCardAtomHelper,
        addEmptyOptionAtomHelper,
        deleteBookAtomHelper,
        deleteCardsOnBookDeleteAtomHelper,
        deleteOptionsOnCardDeleteAtomHelper,
        getAtomFactory,
        getBookWithNewId,
        getCardsAsText,
        getCardWithNewOptionId,
        getCardWithoutDeletedOptionId,
        getDerivedAtom,
        getNewBookWithFilteredIds,
        updateBookAtomHelper,
        updateCardAtomHelper,
        updateOptionAtomHelper
} from '@/src/jotai/utils/mainDbUtils';
import getUniqueID from '@/src/utils/getUniqueID';
import {
        addEmptyBookIdb,
        addEmptyCardIdb,
        addEmptyOptionIdb,
        deleteBookIdb,
        deleteCardIdb,
        deleteOptionIdb,
        updateBookIdb,
        updateCardIdb,
        updateOptionIdb
} from '@/src/utils/idb/main/actions';
import {
        ExplicitCardDataStore,
        ExplicitOptionDataStore
} from '@/src/utils/parseTextIntoCardsArray';
import {
        addIdToBankFamilyAtom,
        withdrawAllIdsFromBankFamilyAtom
} from '@/src/jotai/utils/idsBank';
import { AtomFamily } from '@/src/types/jotai';
import {
        getListForAssert,
        getListForUpdate,
        getListWhereNoSuchIds,
        getListWithIdsForDelete,
        getListWithSuchIds
} from '@/src/utils/getLists';
import waitForAsyncList from '@/src/utils/waitForAsyncList';

export const mainDbAtom = atom<MainDb>();
export const booksFamilyAtom = atomFamily(getAtomFactory('books'));
export const cardsFamilyAtom = atomFamily(getAtomFactory('cards'));
export const optionsFamilyAtom = atomFamily(getAtomFactory('options'));
export const booksIdsAtom = atom<string[]>([]);
export const currentBookIdAtom = atom<string>('');

export const addEmptyBookAtom = getDerivedAtom(async (get, set, mainDb) => {
        const id = getUniqueID();
        await addEmptyBookIdb(mainDb, id);
        addEmptyBookAtomHelper(set, id);
});

export const deleteBookAtom = getDerivedAtom(
        async (get, set, mainDb, bookId: string) => {
                await deleteBookIdb(mainDb, bookId);
                await deleteCardsOnBookDeleteAtomHelper(get, set, bookId);
                deleteBookAtomHelper(set, bookId);
        }
);

export const updateBookAtom = getDerivedAtom(
        async (get, set, mainDb, newBook: Book) => {
                console.debug({ bookUpdate: newBook });
                await mainDb.put('books', newBook);
                updateBookAtomHelper(set, newBook);
        }
);

export const addEmptyCardAtom = getDerivedAtom(async (get, set, mainDb) => {
        const cardId = getUniqueID();
        const bookId = get(currentBookIdAtom);
        const newBook = getBookWithNewId(get, bookId, cardId);
        await updateBookIdb(mainDb, newBook);
        await addEmptyCardIdb(mainDb, cardId);
        updateBookAtomHelper(set, newBook);
        addEmptyCardAtomHelper(set, cardId);
});

export const updateCardAtom = getDerivedAtom(
        async (get, set, mainDb, newCard: Card) => {
                console.log({ newCard });

                await updateCardIdb(mainDb, newCard);
                updateCardAtomHelper(set, newCard);
        }
);

export const deleteCardAtom = getDerivedAtom(
        async (get, set, mainDb, cardId: string) => {
                const newBook = getNewBookWithFilteredIds(get, cardId);
                await updateBookIdb(mainDb, newBook);
                await deleteCardIdb(mainDb, cardId);
                updateBookAtomHelper(set, newBook);
                await deleteOptionsOnCardDeleteAtomHelper(get, set, cardId);
                cardsFamilyAtom.remove(cardId);
        }
);

export const updateOptionAtom = getDerivedAtom(
        async (get, set, mainDb, newOption: Option) => {
                await updateOptionIdb(mainDb, newOption).then(() =>
                        console.debug('success option')
                );
                updateOptionAtomHelper(set, newOption);
        }
);

export const addEmptyOptionAtom = getDerivedAtom(
        async (get, set, mainDb, cardId: string) => {
                const newId = getUniqueID();
                const newCard = getCardWithNewOptionId(get, cardId, newId);
                await updateCardIdb(mainDb, newCard);
                await addEmptyOptionIdb(mainDb, newId);
                updateCardAtomHelper(set, newCard);
                addEmptyOptionAtomHelper(set, newId);
        }
);

export const deleteOptionAtom = getDerivedAtom(
        async (get, set, mainDb, cardId: string, optionId: string) => {
                const newCard = getCardWithoutDeletedOptionId(
                        get,
                        cardId,
                        optionId
                );
                await deleteOptionIdb(mainDb, optionId);
                set(updateCardAtom, newCard);
                optionsFamilyAtom.remove(optionId);
        }
);

export const getBookCardsAsTextAtom = atom((get) => {
        const bookId = get(currentBookIdAtom);
        const { childrenIds } = get(booksFamilyAtom(bookId));

        return getCardsAsText(childrenIds, get).join('');
});

export const cardsTextAtom = atom('');

/*













 */

export const addNewCardViaTextAtom = atom(
        null,
        (get, set, newCard: ExplicitCardDataStore) => {
                const newCardId = getUniqueID();
                const optionsIds = newCard.options.map(() => getUniqueID());
                const newCardData: Card = {
                        cardTitle: newCard.cardTitle,
                        id: newCardId,
                        childrenIds: optionsIds
                };

                console.debug({ newCard });

                const newCardAtom = cardsFamilyAtom(newCardId);
                set(newCardAtom, newCardData);
        }
);

export const updateOptionViaTextAtom = atom(
        null,
        (
                get,
                set,
                {
                        optionId,
                        optionTitle,
                        isCorrect
                }: { optionTitle: string; isCorrect: boolean; optionId: string }
        ) => {
                const optionAtom = optionsFamilyAtom(optionId);
                const prevOption = get(optionAtom);

                set(updateOptionAtom, {
                        ...prevOption,
                        optionTitle,
                        isCorrect
                });
        }
);

export const updateManyOptionsViaTextAtom = atom(
        null,
        (get, set, cardId: string, options: ExplicitOptionDataStore[]) => {
                const { childrenIds } = get(cardsFamilyAtom(cardId));
                const optionsToUpdate = options.slice(0, childrenIds.length);
                console.debug({ optionsToUpdate });
                optionsToUpdate.forEach((option, i) => {
                        set(updateOptionViaTextAtom, {
                                ...option,
                                optionId: childrenIds[i]
                        });
                });
        }
);

export const deleteManyOptionsViaTextAtom = atom(
        null,
        (get, set, cardId: string, options: ExplicitOptionDataStore[]) => {
                const { childrenIds } = get(cardsFamilyAtom(cardId));
                const optionIdsToDelete = childrenIds.slice(options.length - 1);
                optionIdsToDelete.forEach((optionIdToDelete) => {
                        set(deleteOptionAtom, cardId, optionIdToDelete);
                });
        }
);

export const addManyOptionsViaTextAtom = atom(
        null,
        (get, set, cardId: string, options: ExplicitOptionDataStore[]) => {
                const { childrenIds } = get(cardsFamilyAtom(cardId));
                const optionsToAdd = options.slice(childrenIds.length);

                optionsToAdd.forEach((option) => {
                        const newOptionId = getUniqueID();
                        set(addIdToBankFamilyAtom(cardId), newOptionId);
                        set(updateOptionAtom, {
                                ...option,
                                id: newOptionId
                        });
                });
        }
);

export const updateCardViaTextAtom = atom(
        null,
        (get, set, newCard: ExplicitCardDataStore, cardIndex: number) => {
                const bookId = get(currentBookIdAtom);
                const { childrenIds } = get(booksFamilyAtom(bookId));
                const cardAtom = cardsFamilyAtom(childrenIds[cardIndex]);
                const prevCard = get(cardAtom);

                set(updateManyOptionsViaTextAtom, prevCard.id, newCard.options);
                set(deleteManyOptionsViaTextAtom, prevCard.id, newCard.options);
                set(addManyOptionsViaTextAtom, prevCard.id, newCard.options);

                const optionIds = get(
                        withdrawAllIdsFromBankFamilyAtom(prevCard.id)
                );

                set(updateCardAtom, {
                        ...prevCard,
                        cardTitle: newCard.cardTitle,
                        optionsIds: [...prevCard.childrenIds, ...optionIds]
                });
        }
);

export const updateManyCardsViaTextAtom = atom(
        null,
        (get, set, cards: ExplicitCardDataStore[]) => {
                const bookId = get(currentBookIdAtom);
                const { childrenIds } = get(booksFamilyAtom(bookId));
                const cardsToUpdate = cards.slice(0, childrenIds.length);

                console.debug({ cardsToUpdate });

                cardsToUpdate.forEach((card, i) => {
                        set(updateCardViaTextAtom, card, i);
                });
        }
);

export const deleteManyCardsViaTextAtom = atom(
        null,
        (get, set, cards: ExplicitCardDataStore[]) => {
                const bookId = get(currentBookIdAtom);
                const { childrenIds } = get(booksFamilyAtom(bookId));
                const cardIdsToDelete =
                        cards.length < childrenIds.length
                                ? childrenIds.slice(cards.length - 1)
                                : [];
                console.debug({ cardIdsToDelete });

                cardIdsToDelete.forEach((cardId) => {
                        set(deleteCardAtom, cardId);
                });
        }
);

export const addManyCardsViaTextAtom = atom(
        null,
        (get, set, cards: ExplicitCardDataStore[]) => {
                const bookId = get(currentBookIdAtom);
                const { childrenIds } = get(booksFamilyAtom(bookId));
                const cardsToAdd = cards.slice(childrenIds.length);

                cardsToAdd.forEach((card) => {
                        set(addNewCardViaTextAtom, card);
                });

                const borrowedCardIds = get(
                        withdrawAllIdsFromBankFamilyAtom(bookId)
                );

                console.debug({ borrowedCardIds });

                const bookAtom = booksFamilyAtom(bookId);
                const prevBook = get(bookAtom);
                set(updateBookAtom, {
                        ...prevBook,
                        cardsIds: [...prevBook.childrenIds, ...borrowedCardIds]
                });
        }
);

export interface SetterAtomForViaTextProps<Item> {
        fatherId: string;
        items: Item[];
        fatherFamily: AtomFamily<
                WritableAtom<
                        StoreMap['cards' | 'books'],
                        [StoreMap['cards' | 'books']],
                        unknown
                >
        >;
}

export interface InsertOrDeleteActionAdditionalProps<> {
        fatherUpdateActionAtom: WritableAtom<
                null,
                [updatedRecord: Card | Book],
                void
        >;
}

export interface SetterAtomForUpdateViaTextProps<Item>
        extends SetterAtomForViaTextProps<Item>,
                InsertOrDeleteActionAdditionalProps {
        updateActionAtom: WritableAtom<
                null,
                [item: Item, iterIndex: number],
                void
        >;
}

export interface SetterAtomForDeleteViaTextProps<Item>
        extends SetterAtomForViaTextProps<Item>,
                InsertOrDeleteActionAdditionalProps {
        deleteActionAtom: WritableAtom<null, [itemIdToDelete: string], void>;
}

export interface SetterAtomForAssertionViaTextProps<Item>
        extends SetterAtomForViaTextProps<Item>,
                InsertOrDeleteActionAdditionalProps {
        insertActionAtom: WritableAtom<
                null,
                [newItemData: Card | Option],
                void
        >;
}

export const getSetterAtomManyItemsForUpdateViaText = <Item>() =>
        atom(
                null,
                (
                        get,
                        set,
                        {
                                fatherId,
                                items,
                                fatherFamily,
                                updateActionAtom
                        }: SetterAtomForUpdateViaTextProps<Item>
                ) => {
                        console.debug({
                                fatherId,
                                fatherFamily,
                                items,
                                updateAtom: updateActionAtom
                        });

                        const { childrenIds } = get(fatherFamily(fatherId));
                        const itemsToUpdate = getListForUpdate(
                                items,
                                childrenIds
                        );

                        itemsToUpdate.forEach((item, i) => {
                                set(updateActionAtom, item, i);
                        });
                }
        );

export const deleteOptionViaTextAtom = getDerivedAtom(
        async (get, set, mainDb, optionIdToDelete: string) => {
                await deleteOptionIdb(mainDb, optionIdToDelete);
                optionsFamilyAtom.remove(optionIdToDelete);
        }
);

export const deleteCardViaTextAtom = getDerivedAtom(
        async (get, set, mainDb, cardIdToDelete: string) => {
                await deleteCardIdb(mainDb, cardIdToDelete);
                cardsFamilyAtom.remove(cardIdToDelete);
        }
);

export const getSetterAtomManyItemsForDeletionViaText = <Item>() =>
        atom(
                null,
                async (
                        get,
                        set,
                        {
                                fatherId,
                                items,
                                fatherFamily,
                                deleteActionAtom,
                                fatherUpdateActionAtom
                        }: SetterAtomForDeleteViaTextProps<Item>
                ) => {
                        const { childrenIds, ...prevFatherValues } = get(
                                fatherFamily(fatherId)
                        );
                        const itemIdsToDelete = getListWithIdsForDelete(
                                items,
                                childrenIds
                        );

                        await waitForAsyncList(
                                itemIdsToDelete.map((itemId) => {
                                        set(
                                                addIdToBankFamilyAtom(fatherId),
                                                itemId
                                        );
                                        return Promise.resolve(
                                                set(deleteActionAtom, itemId)
                                        );
                                })
                        );

                        const idsToDelete = get(
                                withdrawAllIdsFromBankFamilyAtom(fatherId)
                        );
                        const newChildrenIdsListForFather =
                                getListWhereNoSuchIds(childrenIds, idsToDelete);
                        set(fatherUpdateActionAtom, {
                                childrenIds: newChildrenIdsListForFather,
                                ...prevFatherValues
                        });
                }
        );

export const getSetterAtomManyItemsForAssertionViaText = <Item>() =>
        atom(
                null,
                async (
                        get,
                        set,
                        {
                                fatherId,
                                fatherFamily,
                                items,
                                fatherUpdateActionAtom,
                                insertActionAtom
                        }: SetterAtomForAssertionViaTextProps<Item>
                ) => {
                        const { childrenIds, ...prevFatherValues } = get(
                                fatherFamily(fatherId)
                        );

                        const itemsToAssert = getListForAssert(
                                items,
                                childrenIds
                        );

                        await waitForAsyncList(
                                itemsToAssert.map((item) => {
                                        const newItemId = getUniqueID();
                                        set(
                                                addIdToBankFamilyAtom(fatherId),
                                                newItemId
                                        );



                                        return Promise.resolve(
                                                set(insertActionAtom, {
                                                        ...(item as
                                                                | ExplicitCardDataStore
                                                                | ExplicitOptionDataStore),
                                                        id: newItemId
                                                })
                                        );
                                })
                        );

                        const newIds = get(
                                withdrawAllIdsFromBankFamilyAtom(fatherId)
                        );

                        const newChildrenIdsListForFather = getListWithSuchIds(
                                childrenIds,
                                newIds
                        );

                        set(fatherUpdateActionAtom, {
                                childrenIds: newChildrenIdsListForFather,
                                ...prevFatherValues
                        });
                }
        );
