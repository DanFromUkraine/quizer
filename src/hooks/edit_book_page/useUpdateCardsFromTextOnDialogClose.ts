/* 'to-do' - this code is very unoptimized, because functionality actually ignores, whether card has been changed, or not
 */

'use client';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { dialogVisibilityFamilyAtom } from '@/src/jotai/dialogVisibilityFamily';
import {
        cardsTextAtom,
        markupModeAtom,
        textInModalHasBeenChangedAtom
} from '@/src/jotai/cardsAsTextAtoms';
import {
        updateAnyCardsFromTextAtom,
        updateOnlyShortCardsFromTextAtom
} from '@/src/jotai/cardAtoms';

export default function useUpdateCardsFromTextOnDialogClose() {
        const [cardsText] = useAtom(cardsTextAtom);
        const markupMode = useAtomValue(markupModeAtom);
        const modalVisible = useAtomValue(
                dialogVisibilityFamilyAtom('editCardsAsText')
        );
        const [areAnyChanges, setChangesFlagState] = useAtom(
                textInModalHasBeenChangedAtom
        );
        const updateAnyCards = useSetAtom(updateAnyCardsFromTextAtom);
        const updateOnlyShortCards = useSetAtom(
                updateOnlyShortCardsFromTextAtom
        );

        useEffect(() => {
                if (modalVisible || !areAnyChanges)
                        return;
                if (markupMode === 'mixed') {
                        updateAnyCards(cardsText);
                } else if (markupMode === 'short-only') {
                        updateOnlyShortCards(cardsText);
                }
                setChangesFlagState(false);
        }, [cardsText, modalVisible, markupMode]);
}
