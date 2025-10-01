import {
        booksAtomFamily,
        explicitCardsAtomFamily,
        optionsAtomFamily
} from '@/src/jotai/mainAtoms';
import { getTemplate } from '@/src/utils/idb/main/templates';
import { Book } from '@/src/types/mainDbGlobal';
import {
        deleteExplicitCardAtom,
        deleteShortCardAtom
} from '@/src/jotai/cardAtoms';
import { deleteOptionAtom } from '@/src/jotai/optionAtoms';
import { Getter, Setter } from 'jotai';
import { booksIdsAtom } from '@/src/jotai/idManagers';

export function addEmptyBookAtomHelper(set: Setter, id: string) {
        const newBookAtom = booksAtomFamily(id);
        const bookTemplate = getTemplate('books', id);
        set(booksIdsAtom, (prev) => [...prev, id]);
        set(newBookAtom, bookTemplate);
}

export function deleteBookAtomHelper(set: Setter, id: string) {
        set(booksIdsAtom, (prev) => prev.filter((lastId) => lastId !== id));
        booksAtomFamily.remove(id);
}

export function updateBookAtomHelper(set: Setter, newBook: Book) {
        const bookAtom = booksAtomFamily(newBook.id);
        set(bookAtom, newBook);
}

export async function deleteCardsOnBookDeleteAtomHelper(
        get: Getter,
        set: Setter,
        bookId: string
) {
        const { explicitCardIds, shortCardIds } = get(booksAtomFamily(bookId));
        for await (const cardId of explicitCardIds) {
                await set(deleteExplicitCardAtom, cardId);
        }
        for await (const cardId of shortCardIds) {
                await set(deleteShortCardAtom, cardId);
        }
}

export async function deleteOptionsOnCardDeleteAtomHelper(
        get: Getter,
        set: Setter,
        cardId: string
) {
        const { childrenIds } = get(explicitCardsAtomFamily(cardId));
        for await (const optionId of childrenIds) {
                await set(deleteOptionAtom, cardId, optionId);
        }
}

