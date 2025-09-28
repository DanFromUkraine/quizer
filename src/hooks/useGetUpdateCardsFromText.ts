'use client';

import { useAtomCallback } from 'jotai/utils';
import parseTextIntoCardsArray, {
        ExplicitCardDataStore
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
import { booksFamilyAtom } from '@/src/jotai/mainAtoms';
import {
        FatherFamilyAtom,
        FatherUpdateActionAtom
} from '@/src/types/jotai/cardsTextParserFactories';
import { updateBookAtom } from '@/src/jotai/bookAtoms';

export default function useGetUpdateCardsFromText() {
        return useAtomCallback(
                useCallback((get, set, cardsTextUpToDate: string) => {
                        const cardsArray =
                                parseTextIntoCardsArray(cardsTextUpToDate);
                        const bookId = get(currentBookIdAtom);

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
}
