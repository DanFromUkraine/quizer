import { getDerivedAtomWithIdb } from '@/src/utils/jotai/mainDbUtils';
import getUniqueID from '@/src/utils/getUniqueID';
import {
        addEmptyBookIdb,
        deleteBookIdb,
        updateBookIdb
} from '@/src/utils/idb/main/actions';
import {
        addEmptyBookAtomHelper,
        deleteBookAtomHelper,
        deleteCardsOnBookDeleteAtomHelper,
        getAtomFamilyUpdateAtom
} from '@/src/utils/jotai/helpers';
import { booksAtomFamily } from '@/src/jotai/mainAtoms';

export const addEmptyBookAtom = getDerivedAtomWithIdb(
        async (_get, set, mainDb) => {
                const id = getUniqueID();
                await addEmptyBookIdb(mainDb, id);
                addEmptyBookAtomHelper(set, id);
        }
);

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
