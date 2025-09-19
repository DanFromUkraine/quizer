/* 'to-do' - this code is very unoptimized, because updates card while ignoring, whether it was actually updated, or not
 * 'to-do' - code looks like a shit. Need to split it into different functions
 * */

'use client';

import { useAtom, useAtomValue } from 'jotai';
import {
        addManyCardsViaTextAtom,
        cardsTextAtom,
        deleteManyCardsViaTextAtom,
        updateManyCardsViaTextAtom
} from '@/src/jotai/mainDbAtom';
import { useCallback, useEffect } from 'react';
import parseTextIntoCardsArray from '@/src/utils/parseTextIntoCardsArray';
import { useAtomCallback } from 'jotai/utils';
import { editCardsAsTextModalVisibilityAtom } from '@/src/jotai/statusAtoms';

export default function useUpdateCardsFromText() {
        const [cardsText, setCardsText] = useAtom(cardsTextAtom);
        const modalVisible = useAtomValue(editCardsAsTextModalVisibilityAtom);

        const updateCards = useAtomCallback(
                useCallback((get, set, cardsTextUpToDate: string) => {
                        const cardsArray =
                                parseTextIntoCardsArray(cardsTextUpToDate);

                        set(updateManyCardsViaTextAtom, cardsArray);
                        set(deleteManyCardsViaTextAtom, cardsArray);
                        set(addManyCardsViaTextAtom, cardsArray);
                }, [])
        );

        useEffect(() => {
                if (cardsText.length === 0 || modalVisible) return;
                updateCards(cardsText);
                setCardsText('');
        }, [cardsText, modalVisible]);
}
