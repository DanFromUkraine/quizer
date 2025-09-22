// 'todo' - when everything will be ready, I need to create more factories, to shorten amount of code
// 'todo' - need to create adequate way to manage delete/add id lists. Because 30 async overwrites of db in a row with difference in 1 item ain't so good rn

'use client';

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

import { Book, Card, MainDbGlobal, Option } from '@/src/types/mainDbGlobal';
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
} from '@/src/utils/jotai/mainDbUtils';
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
import { withdrawAllIdsFromBankFamilyAtom } from '@/src/utils/jotai/idsBank';
import { getListWithSuchIds } from '@/src/utils/getLists';
import {
        getSetterAtomManyItemsForDeletionViaText,
        getSetterAtomManyItemsForInsertionViaText,
        getSetterAtomManyItemsForUpdateViaText
} from '@/src/utils/jotai/cardsTextParserFactories';
import {
        getSettingsForDeleteOptions,
        getSettingsForInsertOptions,
        getSettingsForUpdateOptions
} from '@/src/utils/jotai/atomSettingGetters';

export const mainDbAtom = atom<MainDbGlobal>();
export const booksFamilyAtom = atomFamily(getAtomFactory('books'));
export const cardsFamilyAtom = atomFamily(getAtomFactory('cards'));
export const optionsFamilyAtom = atomFamily(getAtomFactory('options'));
export const booksIdsAtom = atom<string[]>([]);
export const currentBookIdAtom = atom<string>('');

export const addEmptyBookAtom = getDerivedAtom(async (_get, set, mainDb) => {
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
        async (_get, set, mainDb, newBook: Book) => {
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
        async (_get, set, mainDb, newCard: Card) => {
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
        async (_get, set, mainDb, newOption: Option) => {
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

export const addNewOptionViaTextAtom = getDerivedAtom(
        async (_get, set, mainDb, newOption: Option) => {
                await updateOptionIdb(mainDb, newOption);
                return (await set(
                        optionsFamilyAtom(newOption.id),
                        newOption
                )) as void;
        }
);

export const deleteOptionViaTextAtom = getDerivedAtom(
        async (_get, _set, mainDb, optionIdToDelete: string) => {
                await deleteOptionIdb(mainDb, optionIdToDelete);
                optionsFamilyAtom.remove(optionIdToDelete);
        }
);

export const updateOptionViaTextAtom = getDerivedAtom(
        async (
                _get,
                set,
                mainDb,
                newOptionData: ExplicitOptionDataStore,
                optionId: string
        ) => {
                const newOption = {
                        ...newOptionData,
                        id: optionId
                };
                await updateOptionIdb(mainDb, newOption);
                return set(optionsFamilyAtom(optionId), newOption) as void;
        }
);

export const addNewCardViaTextAtom = atom(
        null,
        async (
                get,
                set,
                {
                        id: cardId,
                        options,
                        cardTitle
                }: ExplicitCardDataStore & { id: string }
        ) => {
                await set(
                        getSetterAtomManyItemsForInsertionViaText<ExplicitOptionDataStore>(),
                        getSettingsForInsertOptions({ cardId, options })
                );

                const newIds = get(withdrawAllIdsFromBankFamilyAtom(cardId));
                const newCard: Card = {
                        cardTitle,
                        id: cardId,
                        childrenIds: newIds
                };

                set(updateCardAtom, newCard);
        }
);

export const updateCardViaTextAtom = atom(
        null,
        async (
                get,
                set,
                { options, cardTitle }: ExplicitCardDataStore,
                cardId: string
        ) => {
                const cardAtom = cardsFamilyAtom(cardId);
                const prevCard = get(cardAtom);

                set(
                        getSetterAtomManyItemsForInsertionViaText<ExplicitOptionDataStore>(),
                        getSettingsForInsertOptions({ cardId, options })
                );
                set(
                        getSetterAtomManyItemsForUpdateViaText<ExplicitOptionDataStore>(),
                        getSettingsForUpdateOptions({ cardId, options })
                );
                set(
                        getSetterAtomManyItemsForDeletionViaText(),
                        getSettingsForDeleteOptions({ cardId, options })
                );

                const newIds = get(withdrawAllIdsFromBankFamilyAtom(cardId));
                const newCard = {
                        ...prevCard,
                        cardTitle,
                        childrenIds: getListWithSuchIds(
                                prevCard.childrenIds,
                                newIds
                        )
                };
                return set(updateCardAtom, newCard) as Promise<void>;
        }
);
