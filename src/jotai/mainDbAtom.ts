'use client';

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

import { getEmptyBookTemplate } from '@/src/idb/main/templates';
import { Card, MainDb, Option } from '@/src/types/mainDb';
import {
        addEmptyBookAtomHelper,
        addEmptyCardAtomHelper,
        deleteBookAtomHelper,
        getBookAtom,
        getBookWithNewId,
        getBookWithUpdatedTitle,
        getCardAtom,
        getCardWithUpdatedTitleHelper,
        getNewBookWithFilteredIds,
        getOptionAtom,
        updateBookAtomHelper,
        updateCardAtomHelper,
        updateOptionAtomHelper
} from '@/src/jotai/utils/mainDbUtils';
import getUniqueID from '@/src/utils/getUniqueID';
import {
        addEmptyCardIdb,
        deleteBookIdb,
        deleteCardIdb,
        updateBookIdb,
        updateCardIdb,
        updateOptionIdb
} from '@/src/idb/main/getters';

export const mainDbAtom = atom<MainDb>();
export const booksFamilyAtom = atomFamily((id: string) => getBookAtom(id));
export const cardsFamilyAtom = atomFamily((id: string) => getCardAtom(id));
export const optionsFamilyAtom = atomFamily((id: string) => getOptionAtom(id));
export const booksIdsAtom = atom<string[]>([]);

export const addEmptyBookAtom = atom(null, async (get, set) => {
        const mainDb = get(mainDbAtom);
        if (typeof mainDb === 'undefined') return;

        const id = getUniqueID();
        const bookTemplate = getEmptyBookTemplate(id);

        try {
                await mainDb.add('books', bookTemplate);
                addEmptyBookAtomHelper(set, id);
        } catch (e) {
                console.error(e);
        }
});

export const deleteBookAtom = atom(null, async (get, set, id: string) => {
        const mainDb = get(mainDbAtom);
        if (typeof mainDb === 'undefined') return;

        try {
                await deleteBookIdb(mainDb, id);
                deleteBookAtomHelper(set, id);
        } catch (e) {
                console.error(e);
        }
});

export const updateBookTitleAtom = atom(
        null,
        async (get, set, bookId: string, newTitle: string) => {
                const mainDb = get(mainDbAtom);
                if (typeof mainDb === 'undefined') return;

                try {
                        const newBook = getBookWithUpdatedTitle(
                                get,
                                bookId,
                                newTitle
                        );
                        await mainDb.put('books', newBook);
                        updateBookAtomHelper(set, newBook);
                } catch (e) {
                        console.error(e);
                }
        }
);

export const addEmptyCardAtom = atom(null, async (get, set, bookId: string) => {
        const mainDb = get(mainDbAtom);
        if (typeof mainDb === 'undefined') return;
        const cardId = getUniqueID();

        try {
                const newBook = getBookWithNewId(get, bookId, cardId);
                await updateBookIdb(mainDb, newBook);
                await addEmptyCardIdb(mainDb, cardId);
                updateBookAtomHelper(set, newBook);
                addEmptyCardAtomHelper(set, cardId);
        } catch (e) {
                console.error(e);
        }
});

export const updateCardAtom = atom(null, async (get, set, newCard: Card) => {
        const mainDb = get(mainDbAtom);
        if (typeof mainDb === 'undefined') return;

        try {
                await updateCardIdb(mainDb, newCard);
                updateCardAtomHelper(set, newCard);
        } catch (e) {
                console.error(e);
        }
});

export const deleteCardAtom = atom(
        null,
        async (get, set, bookId: string, cardId: string) => {
                const mainDb = get(mainDbAtom);
                if (typeof mainDb === 'undefined') return;

                try {
                        const newBook = getNewBookWithFilteredIds(
                                get,
                                bookId,
                                cardId
                        );
                        await updateBookIdb(mainDb, newBook);
                        await deleteCardIdb(mainDb, cardId);
                        updateBookAtomHelper(set, newBook);
                        cardsFamilyAtom.remove(cardId);
                } catch (e) {
                        console.error(e);
                }
        }
);

export const updateOptionAtom = atom(
        null,
        async (get, set, newOption: Option) => {
                const mainDb = get(mainDbAtom);
                if (typeof mainDb === 'undefined') return;

                try {
                        await updateOptionIdb(mainDb, newOption);
                        updateOptionAtomHelper(set, newOption);
                } catch (e) {
                        console.error(e);
                }
        }
);

export const addEmptyOptionAtom = atom(null, async (get, set) => {});

export const deleteOptionAtom = atom(null, async (get, set) => {});
