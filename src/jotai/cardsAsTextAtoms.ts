import { currentBookIdAtom } from '@/src/jotai/idManagers';
import { getCardsAsText } from '@/src/utils/jotai/mainDbUtils';
import { booksAtomFamily } from '@/src/jotai/mainAtoms';
import { atom } from 'jotai';
import { MarkupModes } from '@/src/types/updateCardsFromText';

export const markupModeAtom = atom<MarkupModes>('mixed');
export const textInModalHasBeenChangedAtom = atom(false);

export const changeMarkupMode = atom(null, (get, set, newMode: MarkupModes) => {
        const textInModalHasBeenChanged = get(textInModalHasBeenChangedAtom);
        const prevMode = get(markupModeAtom);
        if (prevMode === newMode) return;

        if (textInModalHasBeenChanged) {
                console.debug("text in modal has been changed")
                /* LOGIC TO SHOW SOME MODAL TO BE SURE*/
        } else {
                console.debug("text in modal hasn't been changed")
                set(markupModeAtom, newMode);
        }
});

const cardsTextLocalAtom = atom('');
export const cardsTextAtom = atom(
        (get) => {
                const bookId = get(currentBookIdAtom);
                const { cardIdsOrder, explicitCardIds, shortCardIds } = get(
                        booksAtomFamily(bookId)
                );
                const hasSomethingChanged = get(textInModalHasBeenChangedAtom);

                return hasSomethingChanged
                        ? get(cardsTextLocalAtom)
                        : getCardsAsText({
                                  cardIdsOrder,
                                  explicitCardIds,
                                  shortCardIds,
                                  get
                          });
        },
        (_get, set, newVal: string) => {
                set(textInModalHasBeenChangedAtom, true);
                set(cardsTextLocalAtom, newVal);
        }
);
