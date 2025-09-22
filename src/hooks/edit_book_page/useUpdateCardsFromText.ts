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
} from '@/src/jotai/mainDbAtom';
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
import { withdrawAllIdsFromBankFamilyAtom } from '@/src/utils/jotai/idsBank';
import { getListWithSuchIds } from '@/src/utils/getLists';

export default function useUpdateCardsFromText() {
        const [cardsText, setCardsText] = useAtom(cardsTextAtom);
        const modalVisible = useAtomValue(editCardsAsTextModalVisibilityAtom);

        const updateCards = useAtomCallback(
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

                        const prevBook = get(booksFamilyAtom(bookId));
                        const borrowedIds = get(
                                withdrawAllIdsFromBankFamilyAtom(bookId)
                        );
                        const newBookIds = getListWithSuchIds(
                                prevBook.childrenIds,
                                borrowedIds
                        );
                        const newBook = {
                                ...prevBook,
                                childrenIds: newBookIds
                        };
                        set(updateBookAtom, newBook);
                }, [])
        );

        useEffect(() => {
                if (cardsText.length === 0 || modalVisible) return;
                updateCards(cardsText);
                setCardsText('');
        }, [cardsText, modalVisible]);
}
