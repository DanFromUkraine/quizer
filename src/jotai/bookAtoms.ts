import { getDerivedAtomWithIdb } from '@/src/utils/jotai/getDerivedAtomWithIdb';
import getUniqueID from '@/src/utils/getUniqueID';
import {
        addEmptyBookIdb,
        deleteBookIdb,
        updateBookIdb
} from '@/src/utils/idb/main/actions';
import {
        addEmptyBookAtomHelper,
        deleteBookAtomHelper,
        getAtomFamilyUpdateAtom
} from '@/src/utils/jotai/helpers';
import { booksAtomFamily } from '@/src/jotai/mainAtoms';
import {
        deleteExplicitCardAtom,
        deleteShortCardAtom
} from '@/src/jotai/cardAtoms';
import { Getter, Setter } from 'jotai';

export const addEmptyBookAtom = getDerivedAtomWithIdb(
        async (_get, set, mainDb) => {
                const id = getUniqueID();
                await addEmptyBookIdb(mainDb, id);
                addEmptyBookAtomHelper(set, id);
        }
);

async function deleteCardsOnBookDeleteAtomHelper(
        get: Getter,
        set: Setter,
        bookId: string
) {
        const { explicitCardIds, shortCardIds } = get(booksAtomFamily(bookId));
        for (const cardId of explicitCardIds) {
                await set(deleteExplicitCardAtom, cardId);
        }
        for (const cardId of shortCardIds) {
                await set(deleteShortCardAtom, cardId);
        }
}

export const deleteBookAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb, bookId: string) => {
                await deleteBookIdb(mainDb, bookId);
                await deleteCardsOnBookDeleteAtomHelper(get, set, bookId);
                deleteBookAtomHelper(set, bookId);
        }
);

export const updateBookAtom = getAtomFamilyUpdateAtom({
        atomFamily: booksAtomFamily,
        updateIdb: updateBookIdb
});
