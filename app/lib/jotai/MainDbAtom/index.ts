'use client';

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import {
        getBookAtom,
        getCardAtom,
        getOptionAtom
} from '@/app/lib/jotai/MainDbAtom/utils';
import { MainDb } from '@/app/lib/types/mainDb';
import { getEmptyBookTemplate } from '@/app/lib/utils/database/getEmptyTemplates';
import getUniqueID from '@/app/lib/utils/getUniqueID';

export const mainDbAtom = atom<MainDb>();
export const booksFamilyAtom = atomFamily((id: string) => getBookAtom(id));
export const cardsFamilyAtom = atomFamily((id: string) => getCardAtom(id));
export const optionFamilyAtom = atomFamily((id: string) => getOptionAtom(id));
export const booksIdsAtom = atom<string[]>([]);
export const addNewBookIdAtom = atom(null, (_get, set, newId: string) => {
        set(booksIdsAtom, (prev) => [...prev, newId]);
});
export const deleteBookIdAtom = atom(null, (_get, set, id: string) => {
        set(booksIdsAtom, (prev) => prev.filter((lastId) => lastId !== id));
});

export const addEmptyBookAtom = atom(null, async (get, set) => {
        const mainDb = get(mainDbAtom);
        if (typeof mainDb === 'undefined') return;

        const id = getUniqueID();
        const bookTemplate = getEmptyBookTemplate(id);
        const newBookAtom = booksFamilyAtom(id);

        set(addNewBookIdAtom, id);
        set(newBookAtom, bookTemplate);

        try {
                mainDb.add('books', bookTemplate);
        } catch (e) {
                set(deleteBookIdAtom, id);
                booksFamilyAtom.remove(id);
        }
});
