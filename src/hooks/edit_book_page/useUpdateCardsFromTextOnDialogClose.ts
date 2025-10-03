/* 'to-do' - this code is very unoptimized, because functionality actually ignores, whether card has been changed, or not
 */

'use client';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { dialogVisibilityFamilyAtom } from '@/src/jotai/dialogVisibilityFamily';
import {
        cardsTextAtom,
        textInModalHasBeenChangedAtom
} from '@/src/jotai/cardsAsTextAtoms';
import { updateCardsFromTextAtom } from '@/src/jotai/cardAtoms';

export default function useUpdateCardsFromTextOnDialogClose() {
        const [cardsText] = useAtom(cardsTextAtom);
        const modalVisible = useAtomValue(
                dialogVisibilityFamilyAtom('editCardsAsText')
        );
        const [areAnyChanges, setChangesFlagState] = useAtom(
                textInModalHasBeenChangedAtom
        );
        const updateCards = useSetAtom(updateCardsFromTextAtom);

        useEffect(() => {
                if (cardsText.length === 0 || modalVisible || !areAnyChanges)
                        return;
                updateCards(cardsText);
                setChangesFlagState(false);
        }, [cardsText, modalVisible]);
}
