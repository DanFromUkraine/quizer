import { atom } from 'jotai';
import {
        dialogVisibilityFamilyAtom,
        hideDialogAtom,
        openDialogAtom
} from '@/src/jotai/dialogVisibilityFamily';

export type SnackbarNames = 'noCardsErrorSnackbar';

export const showSnackbarAtom = atom(
        null,
        (
                get,
                set,
                {
                        snackbarName,
                        timeMS
                }: { snackbarName: SnackbarNames; timeMS: number }
        ) => {
                const isSnackbarAlreadyShown = get(
                        dialogVisibilityFamilyAtom(snackbarName)
                );
                if (isSnackbarAlreadyShown) return;
                set(openDialogAtom, snackbarName);
                setTimeout(() => {
                        set(hideDialogAtom, snackbarName);
                }, timeMS);
        }
);
