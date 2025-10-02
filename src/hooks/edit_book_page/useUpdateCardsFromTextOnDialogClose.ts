/* 'to-do' - this code is very unoptimized, because functionality actually ignores, whether card has been changed, or not
 */

'use client';

import { useAtom, useAtomValue } from 'jotai';
import {
        cardsTextAtom,
        textInModalHasBeenChanged
} from '@/src/jotai/mainAtoms';
import { useEffect } from 'react';
import { dialogVisibilityFamilyAtom } from '@/src/jotai/dialogVisibilityFamily';
import useGetUpdateCardsFromText from '@/src/hooks/useGetUpdateCardsFromText';
import parseTextIntoCardsArray from '@/src/utils/parseTextIntoCardsArray';

export default function useUpdateCardsFromTextOnDialogClose() {
        const [cardsText] = useAtom(cardsTextAtom);
        const modalVisible = useAtomValue(
                dialogVisibilityFamilyAtom('editCardsAsText')
        );
        const [areAnyChanges, setChangesFlagState] = useAtom(
                textInModalHasBeenChanged
        );
        // const updateCards = useGetUpdateCardsFromText();

        useEffect(() => {
                if (cardsText.length === 0 || modalVisible || !areAnyChanges)
                        return;
                console.log(parseTextIntoCardsArray(cardsText))
                // updateCards(cardsText);
                setChangesFlagState(false);
        }, [cardsText, modalVisible]);
}
