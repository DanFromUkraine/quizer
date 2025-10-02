import getUniqueID from '@/src/utils/getUniqueID';
import {
        getBookWithNewId,
        getDerivedAtomWithIdb,
        getNewBookWithDeletedCardId
} from '@/src/utils/jotai/mainDbUtils';
import {
        explicitCardsAtomFamily,
        shortCardsAtomFamily
} from '@/src/jotai/mainAtoms';
import {
        addEmptyExplicitCardIdb,
        addEmptyShortCardIdb,
        deleteExplicitCardIdb,
        deleteShortCardIdb,
        updateBookIdb,
        updateExplicitCardIdb,
        updateShortCardIdb
} from '@/src/utils/idb/main/actions';
import { ExplicitCard, TermDefinitionCard } from '@/src/types/mainDbGlobal';
import {
        deleteOptionsOnCardDeleteAtomHelper,
        updateBookAtomHelper
} from '@/src/utils/jotai/helpers';
import { currentBookIdAtom } from '@/src/jotai/idManagers';

export const addEmptyExplicitCardAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb) => {
                const cardId = getUniqueID();
                const bookId = get(currentBookIdAtom);
                const newBook = getBookWithNewId({
                        get,
                        bookId,
                        cardId,
                        cardType: 'explicit'
                });
                await updateBookIdb(mainDb, newBook);
                await addEmptyExplicitCardIdb(mainDb, cardId);
                updateBookAtomHelper(set, newBook);
        }
);

export const addEmptyTermShortCard = getDerivedAtomWithIdb(
        async (get, set, mainDb) => {
                const cardId = getUniqueID();
                const bookId = get(currentBookIdAtom);
                const newBook = getBookWithNewId({
                        get,
                        bookId,
                        cardId,
                        cardType: 'short'
                });
                await updateBookIdb(mainDb, newBook);
                await addEmptyShortCardIdb(mainDb, cardId);
                updateBookAtomHelper(set, newBook);
        }
);

export const updateExplicitCardAtom = getDerivedAtomWithIdb(
        async (_get, set, mainDb, newCard: ExplicitCard) => {
                await updateExplicitCardIdb(mainDb, newCard);
                set(explicitCardsAtomFamily(newCard.id), newCard);
        }
);

export const updateShortCardAtom = getDerivedAtomWithIdb(async(_get, set, mainDb, newCard: TermDefinitionCard) => {
        await updateShortCardIdb(mainDb, newCard);
        set(shortCardsAtomFamily(newCard.id), newCard);
})

export const deleteExplicitCardAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb, cardId: string) => {
                const newBook = getNewBookWithDeletedCardId(get, cardId);
                await updateBookIdb(mainDb, newBook);
                await deleteExplicitCardIdb(mainDb, cardId);
                updateBookAtomHelper(set, newBook);
                await deleteOptionsOnCardDeleteAtomHelper(get, set, cardId);
                explicitCardsAtomFamily.remove(cardId);
        }
);

export const deleteShortCardAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb, cardId: string) => {
                const newBook = getNewBookWithDeletedCardId(get, cardId);
                await updateBookIdb(mainDb, newBook);
                await deleteShortCardIdb(mainDb, cardId);
                updateBookAtomHelper(set, newBook);
                explicitCardsAtomFamily.remove(cardId);
        }
);



// export const addNewCardViaTextAtom = atom(
//         null,
//         async (
//                 get,
//                 set,
//                 {
//                         id: cardId,
//                         options,
//                         cardTitle
//                 }: FullCardFromText & { id: string }
//         ) => {
//                 await set(
//                         getSetterAtomManyItemsForInsertionViaText<FullOptionFromText>(),
//                         getSettingsForInsertOptions({ cardId, options })
//                 );
//
//                 const newIds = get(withdrawAllIdsToAddFromBankAtom(cardId));
//                 const newCard: ExplicitCard = {
//                         type: 'explicit',
//                         cardTitle,
//                         id: cardId,
//                         childrenIds: newIds
//                 };
//
//                 set(updateExplicitCardAtom, newCard);
//         }
// );

// export const updateCardViaTextAtom = atom(
//         null,
//         async (
//                 _get,
//                 set,
//                 { options, cardTitle }: FullCardFromText,
//                 cardId: string
//         ) => {
//                 set(
//                         getSetterAtomManyItemsForInsertionViaText<FullOptionFromText>(),
//                         getSettingsForInsertOptions({ cardId, options })
//                 );
//                 set(
//                         getSetterAtomManyItemsForUpdateViaText<FullOptionFromText>(),
//                         getSettingsForUpdateOptions({ cardId, options })
//                 );
//                 set(
//                         getSetterAtomManyItemsForDeletionViaText(),
//                         getSettingsForDeleteOptions({ cardId, options })
//                 );
//
//                 set(fatherUpdateLogicAtom, {
//                         fatherId: cardId,
//                         fatherFamily: cardsFamilyAtom as FatherFamilyAtom,
//                         updateFatherAtom:
//                                 updateCardAtom as FatherUpdateActionAtom,
//                         otherData: {
//                                 cardTitle
//                         }
//                 });
//         }
// );

// export const deleteCardViaTextAtom = getDerivedAtomWithIdb(
//         async (_get, _set, mainDb, cardId: string) => {
//                 await deleteExplicitCardIdb(mainDb, cardId);
//                 explicitCardsAtomFamily.remove({
//                         id: cardId,
//                         type: 'explicitCard'
//                 });
//         }
// );

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