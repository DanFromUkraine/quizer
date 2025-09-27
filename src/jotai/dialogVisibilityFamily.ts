import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { SnackbarNames } from '@/src/jotai/snackbarAtoms';

export type DialogNames = 'storiesForBook' | 'editCardsAsText' | SnackbarNames;

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
