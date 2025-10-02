'use client';

import { useAtomCallback } from 'jotai/utils';
import parseTextIntoCardsArray, {
        FullCardFromText
} from '@/src/utils/parseTextIntoCardsArray';
import { currentBookIdAtom } from '@/src/jotai/idManagers';
import { useCallback } from 'react';
import {
        getSetterAtomManyItemsForDeletionViaText,
        getSetterAtomManyItemsForInsertionViaText,
        getSetterAtomManyItemsForUpdateViaText
} from '@/src/utils/jotai/cardsTextParserFactories';
import {
        getSettingsForDeleteCard,
        getSettingsForInsertCard,
        getSettingsForUpdateCard
} from '@/src/utils/jotai/atomSettingGetters';
import { fatherUpdateLogicAtom } from '@/src/utils/jotai/fatherUpdateLogic';
import { booksAtomFamily } from '@/src/jotai/mainAtoms';
import {
        FatherFamilyAtom,
        FatherUpdateActionAtom
} from '@/src/types/jotai/cardsTextParserFactories';
import { updateBookAtom } from '@/src/jotai/bookAtoms';
import {
        getListForInsert,
        getListForUpdate,
        getListWithIdsForDelete
} from '@/src/utils/lists';
import getUniqueID from '@/src/utils/getUniqueID';

export default function useGetUpdateCardsFromText() {
        return useAtomCallback(
                useCallback((get, set, cardsTextUpToDate: string) => {
                        const cardsArray =
                                parseTextIntoCardsArray(cardsTextUpToDate);
                        const bookId = get(currentBookIdAtom);

                        set(
                                getSetterAtomManyItemsForUpdateViaText<FullCardFromText>(),
                                getSettingsForUpdateCard({ bookId, cardsArray })
                        );
                        set(
                                getSetterAtomManyItemsForInsertionViaText<FullCardFromText>(),
                                getSettingsForInsertCard({ bookId, cardsArray })
                        );

                        set(
                                getSetterAtomManyItemsForDeletionViaText<FullCardFromText>(),
                                getSettingsForDeleteCard({ bookId, cardsArray })
                        );

                        set(fatherUpdateLogicAtom, {
                                fatherId: bookId,
                                fatherFamily:
                                        booksAtomFamily as FatherFamilyAtom,
                                updateFatherAtom:
                                        updateBookAtom as FatherUpdateActionAtom
                        });
                }, [])
        );
}

export function useGetUpdateCardsFromTextV2() {
        return useAtomCallback(
                useCallback((get, set, cardsTextUpToDate: string) => {
                        const cardsArray =
                                parseTextIntoCardsArray(cardsTextUpToDate);
                        const bookId = get(currentBookIdAtom);
                        const { childrenIds } = get(booksAtomFamily(bookId));
                        const idsToInsert = [];
                        const idsToDelete = [];

                        getListForInsert(
                                cardsArray,
                                childrenIds
                        ).forEach(card => {
                                const newCardId = getUniqueID();
                                idsToInsert.push(newcardId)
                                if (card.type === "explicit") {

                                }
                        })
                        const cardsListForDelete = getListWithIdsForDelete(
                                cardsArray,
                                childrenIds
                        );
                        const cardsListForUpdate = getListForUpdate(
                                cardsArray,
                                childrenIds
                        );


                }, [])
        );
}
