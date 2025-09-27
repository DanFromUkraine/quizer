import getUniqueID from '@/src/utils/getUniqueID';
import {
        getBookWithNewId,
        getDerivedAtom,
        getNewBookWithFilteredIds
} from '@/src/utils/jotai/mainDbUtils';
import { cardsFamilyAtom } from '@/src/jotai/mainAtoms';
import {
        addEmptyCardIdb,
        deleteCardIdb,
        updateBookIdb,
        updateCardIdb
} from '@/src/utils/idb/main/actions';
import { Card } from '@/src/types/mainDbGlobal';
import { atom } from 'jotai';
import {
        ExplicitCardDataStore,
        ExplicitOptionDataStore
} from '@/src/utils/parseTextIntoCardsArray';
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
import { withdrawAllIdsToAddFromBankAtom } from '@/src/utils/jotai/idsBank';
import { fatherUpdateLogicAtom } from '@/src/utils/jotai/fatherUpdateLogic';
import {
        FatherFamilyAtom,
        FatherUpdateActionAtom
} from '@/src/types/jotai/cardsTextParserFactories';
import {
        addEmptyCardAtomHelper,
        deleteOptionsOnCardDeleteAtomHelper,
        updateBookAtomHelper
} from '@/src/utils/jotai/helpers';
import { currentBookIdAtom } from '@/src/jotai/idManagers';

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
                console.log(`
                card update !!!
                ${newCard.cardTitle}
                
                `)
                await updateCardIdb(mainDb, newCard);
                set(cardsFamilyAtom(newCard.id), newCard);
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

                const newIds = get(withdrawAllIdsToAddFromBankAtom(cardId));
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
                _get,
                set,
                { options, cardTitle }: ExplicitCardDataStore,
                cardId: string
        ) => {
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

                set(fatherUpdateLogicAtom, {
                        fatherId: cardId,
                        fatherFamily: cardsFamilyAtom as FatherFamilyAtom,
                        updateFatherAtom:
                                updateCardAtom as FatherUpdateActionAtom,
                        otherData: {
                                cardTitle
                        }
                });
        }
);

export const deleteCardViaTextAtom = getDerivedAtom(
        async (_get, _set, mainDb, cardId: string) => {
                await deleteCardIdb(mainDb, cardId);
                cardsFamilyAtom.remove(cardId);
        }
);
