import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

export type DialogNames = 'storiesForBook' | 'editCardsAsText';

export const dialogVisibilityFamilyAtom = atomFamily((_id: DialogNames) =>
        atom(false)
);
export const openDialogAtom = atom(
        null,
        (_get, set, dialogName: DialogNames) => {
                set(dialogVisibilityFamilyAtom(dialogName), true);
        }
);
export const hideDialogAtom = atom(
        null,
        (_get, set, dialogName: DialogNames) => {
                set(dialogVisibilityFamilyAtom(dialogName), false);
        }
);
