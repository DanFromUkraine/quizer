import {
        getDerivedAtomWithIdb
} from '@/src/utils/jotai/mainDbUtils';
import getUniqueID from '@/src/utils/getUniqueID';
import { addEmptyBookIdb, deleteBookIdb } from '@/src/utils/idb/main/actions';
import { Book } from '@/src/types/mainDbGlobal';
import {
        addEmptyBookAtomHelper,
        deleteBookAtomHelper,
        deleteCardsOnBookDeleteAtomHelper,
        updateBookAtomHelper
} from '@/src/utils/jotai/helpers';

export const addEmptyBookAtom = getDerivedAtomWithIdb(async (_get, set, mainDb) => {
        const id = getUniqueID();
        await addEmptyBookIdb(mainDb, id);
        addEmptyBookAtomHelper(set, id);
});

export const deleteBookAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb, bookId: string) => {
                await deleteBookIdb(mainDb, bookId);
                await deleteCardsOnBookDeleteAtomHelper(get, set, bookId);
                deleteBookAtomHelper(set, bookId);
        }
);

export const updateBookAtom = getDerivedAtomWithIdb(
        async (_get, set, mainDb, newBook: Book) => {
                console.debug({ bookUpdate: newBook });
                await mainDb.put('books', newBook);
                updateBookAtomHelper(set, newBook);
        }
);






/*


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

                        console.debug({itemsToUpdate})

                        itemsToUpdate.forEach((item, i) => {
                                set(updateActionAtom, item, childrenIds[i]);
                        });
                }
        );

 */