import { atom } from 'jotai';
import {
        SetterAtomForDeleteViaTextProps,
        SetterAtomForInsertionViaTextProps,
        SetterAtomForUpdateViaTextProps
} from '@/src/types/jotai/cardsTextParserFactories';
import {
        getListForInsert,
        getListForUpdate,
        getListWithIdsForDelete
} from '@/src/utils/lists';
import waitForAsyncList from '@/src/utils/waitForAsyncList';
import {
        addIdToAddToBankAtom,
        addIdToRemoveToBankAtom
} from '@/src/utils/jotai/idsBank';
import getUniqueID from '@/src/utils/getUniqueID';

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
                                deleteActionAtom
                        }: SetterAtomForDeleteViaTextProps<Item>
                ) => {
                        const { childrenIds } = get(fatherFamily(fatherId));
                        const itemIdsToDelete = getListWithIdsForDelete(
                                items,
                                childrenIds
                        );

                        console.debug(`Delete data:
                        
                        `, { itemIdsToDelete, items, childrenIds });

                        await waitForAsyncList(
                                itemIdsToDelete.map((itemId) => {
                                        set(
                                                addIdToRemoveToBankAtom,
                                                fatherId,
                                                itemId
                                        );
                                        return Promise.resolve(
                                                set(deleteActionAtom, itemId)
                                        );
                                })
                        );
                }
        );

export const getSetterAtomManyItemsForInsertionViaText = <Item>() =>
        atom(
                null,
                async (
                        get,
                        set,
                        {
                                fatherId,
                                fatherFamily,
                                items,
                                insertActionAtom
                        }: SetterAtomForInsertionViaTextProps<Item>
                ) => {
                        const { childrenIds } = get(fatherFamily(fatherId));

                        const itemsToInsert = getListForInsert(
                                items,
                                childrenIds
                        );

                        console.debug({ items, itemsToAssert: itemsToInsert });

                        await waitForAsyncList(
                                itemsToInsert.map((item) => {
                                        const newItemId = getUniqueID();
                                        set(
                                                addIdToAddToBankAtom,
                                                fatherId,
                                                newItemId
                                        );

                                        return Promise.resolve(
                                                set(insertActionAtom, {
                                                        ...item,
                                                        id: newItemId
                                                })
                                        );
                                })
                        );
                }
        );
