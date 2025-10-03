import { currentBookIdAtom } from '@/src/jotai/idManagers';
import { booksAtomFamily } from '@/src/jotai/mainAtoms';
import { atom } from 'jotai';
import { MarkupModes } from '@/src/types/updateCardsFromText';
import { openDialogWithCallbackAtom } from '@/src/jotai/dialogVisibilityFamily';
import {
        getAnyCardsAsTextAtomHelper,
        getShortCardsOnlyAsTextAtomHelper
} from '@/src/utils/cardsAsText/fromCardsToText';

export const markupModeAtom = atom<MarkupModes>('mixed');
export const textInModalHasBeenChangedAtom = atom(false);

export const changeMarkupMode = atom(null, (get, set, newMode: MarkupModes) => {
        const textInModalHasBeenChanged = get(textInModalHasBeenChangedAtom);
        const prevMode = get(markupModeAtom);
        if (prevMode === newMode) return;

        const onSuccess = () => {
                set(markupModeAtom, newMode);
                set(textInModalHasBeenChangedAtom, false);
        };

        if (textInModalHasBeenChanged) {
                set(openDialogWithCallbackAtom, {
                        message: "You already made some changes in text. If you continue - new changes won't last",
                        onApprove: onSuccess
                });
        } else {
                onSuccess();
        }
});

const cardsTextLocalAtom = atom('');
export const cardsTextAtom = atom(
        (get) => {
                const markupMode = get(markupModeAtom);
                const bookId = get(currentBookIdAtom);
                const { cardIdsOrder, explicitCardIds, shortCardIds } = get(
                        booksAtomFamily(bookId)
                );
                const hasSomethingChanged = get(textInModalHasBeenChangedAtom);

                if (hasSomethingChanged) {
                        return get(cardsTextLocalAtom);
                }
                if (markupMode === 'mixed') {
                        return getAnyCardsAsTextAtomHelper({
                                cardIdsOrder,
                                explicitCardIds,
                                shortCardIds,
                                get
                        });
                }
                if (markupMode === 'short-only') {
                        return getShortCardsOnlyAsTextAtomHelper({
                                shortCardIds,
                                get
                        });
                }
                return ""
        },
        (_get, set, newVal: string) => {
                set(textInModalHasBeenChangedAtom, true);
                set(cardsTextLocalAtom, newVal);
        }
);
