/* 'to-do' - this code is very unoptimized, because updates card while ignoring, whether it was actually updated, or not
 * 'to-do' - code looks like a shit. Need to split it into different functions
 * */

'use client';

import { useAtom, useAtomValue } from 'jotai';
import { booksFamilyAtom, cardsTextAtom } from '@/src/jotai/mainAtoms';
import { useCallback, useEffect } from 'react';
import parseTextIntoCardsArray, {
        ExplicitCardDataStore
} from '@/src/utils/parseTextIntoCardsArray';
import { useAtomCallback } from 'jotai/utils';
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
import {
        FatherFamilyAtom,
        FatherUpdateActionAtom
} from '@/src/types/jotai/cardsTextParserFactories';
import { updateBookAtom } from '@/src/jotai/bookAtoms';
import { dialogVisibilityFamilyAtom } from '@/src/jotai/dialogVisibilityFamily';
import { currentBookIdAtom } from '@/src/jotai/idManagers';

export default function useUpdateCardsFromTextOnDialogClose() {
        const [cardsText, setCardsText] = useAtom(cardsTextAtom);
        const modalVisible = useAtomValue(
                dialogVisibilityFamilyAtom('editCardsAsText')
        );

        const updateCards = useAtomCallback(
                useCallback((get, set, cardsTextUpToDate: string) => {
                        const cardsArray =
                                parseTextIntoCardsArray(cardsTextUpToDate);
                        const bookId = get(currentBookIdAtom);

                        console.debug({cardsArray})

                        set(
                                getSetterAtomManyItemsForUpdateViaText<ExplicitCardDataStore>(),
                                getSettingsForUpdateCard({ bookId, cardsArray })
                        );
                        set(
                                getSetterAtomManyItemsForInsertionViaText<ExplicitCardDataStore>(),
                                getSettingsForInsertCard({ bookId, cardsArray })
                        );

                        set(
                                getSetterAtomManyItemsForDeletionViaText<ExplicitCardDataStore>(),
                                getSettingsForDeleteCard({ bookId, cardsArray })
                        );

                        set(fatherUpdateLogicAtom, {
                                fatherId: bookId,
                                fatherFamily:
                                        booksFamilyAtom as FatherFamilyAtom,
                                updateFatherAtom:
                                        updateBookAtom as FatherUpdateActionAtom
                        });
                }, [])
        );

        useEffect(() => {
                if (cardsText.length === 0 || modalVisible) return;
                updateCards(cardsText);
                setCardsText('');
        }, [cardsText, modalVisible]);
}
