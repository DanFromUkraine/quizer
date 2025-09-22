/* 'to-do' - this code is very unoptimized, because updates card while ignoring, whether it was actually updated, or not
 * 'to-do' - code looks like a shit. Need to split it into different functions
 * */

'use client';

import { useAtom, useAtomValue } from 'jotai';
import {
        booksFamilyAtom,
        cardsTextAtom,
        currentBookIdAtom,
        updateBookAtom
} from '@/src/jotai/mainAtoms';
import { useCallback, useEffect } from 'react';
import parseTextIntoCardsArray, {
        ExplicitCardDataStore
} from '@/src/utils/parseTextIntoCardsArray';
import { useAtomCallback } from 'jotai/utils';
import { editCardsAsTextModalVisibilityAtom } from '@/src/jotai/statusAtoms';
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

export default function useUpdateCardsFromText() {
        const [cardsText, setCardsText] = useAtom(cardsTextAtom);
        const modalVisible = useAtomValue(editCardsAsTextModalVisibilityAtom);

        const updateCards = useAtomCallback(
                useCallback((get, set, cardsTextUpToDate: string) => {
                        const cardsArray =
                                parseTextIntoCardsArray(cardsTextUpToDate);
                        const bookId = get(currentBookIdAtom);

                        console.debug(
                                `cards array:
                        
                        `,
                                { cardsArray }
                        );

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
                                        updateBookAtom as FatherUpdateActionAtom,
                        });
                }, [])
        );

        useEffect(() => {
                if (cardsText.length === 0 || modalVisible) return;
                updateCards(cardsText);
                setCardsText('');
        }, [cardsText, modalVisible]);
}
