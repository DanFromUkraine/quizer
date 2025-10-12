import { booksAtomFamily, explicitCardsAtomFamily } from '@/src/jotai/mainAtoms';
import { getTemplate } from '@/src/utils/idb/main/templates';
import { Book, DeleteAction, UpdateAction } from '@/src/types/mainDbGlobal';
import { deleteExplicitCardAtom, deleteShortCardAtom } from '@/src/jotai/cardAtoms';
import { deleteOptionAtom } from '@/src/jotai/optionAtoms';
import { Getter, PrimitiveAtom, Setter } from 'jotai';
import { booksIdsAtom } from '@/src/jotai/idManagers';
import { getDerivedAtomWithIdb } from '@/src/utils/jotai/mainDbUtils';
import { AtomFamily, WithInitialValue } from '@/src/types/jotaiGlobal';
import { ObjWithId } from '@/src/types/globals';

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

export function getAtomFamilyUpdateAtom<T extends ObjWithId>({
        atomFamily,
        updateIdb
}: {
        atomFamily: AtomFamily<string, PrimitiveAtom<T> & WithInitialValue<T>>;
        updateIdb: UpdateAction<T>;
}) {
        return getDerivedAtomWithIdb(async (get, set, mainDb, newItem: T) => {
                await updateIdb(mainDb, newItem);
                set(atomFamily(newItem.id), newItem);
        });
}

export function getAtomFamilyDeleteAtom_NoFatherUpdate<T extends ObjWithId>({
        atomFamily,
        deleteIdb
}: {
        atomFamily: AtomFamily<string, PrimitiveAtom<T> & WithInitialValue<T>>;
        deleteIdb: DeleteAction;
}) {
        return getDerivedAtomWithIdb(
                async (get, set, mainDb, deleteId: string) => {
                        await deleteIdb(mainDb, deleteId);
                        atomFamily.remove(deleteId);
                }
        );
}

/*
* you also can create such factories for
*
* add empty with father ids update
*
* delete item with father ids update
*
* */