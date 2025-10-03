import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { SnackbarNames } from '@/src/jotai/snackbarAtoms';

export type DialogNames =
        | 'storiesForBook'
        | 'editCardsAsText'
        | 'notAllAnswersWarning'
        | SnackbarNames
        | 'actionNeeded';

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
        (get, set, dialogName: DialogNames) => {
                const prevVisibility = get(
                        dialogVisibilityFamilyAtom(dialogName)
                );
                if (prevVisibility !== false)
                        set(dialogVisibilityFamilyAtom(dialogName), false);
        }
);

interface ActionNeededInfo {
        message: string;
        onApprove: () => void;
}

const DUMB_ACTION_NEEDED_VAL: ActionNeededInfo = {
        message: '',
        onApprove: () => {}
};

export const actionNeededInfoAtom = atom<ActionNeededInfo>(
        DUMB_ACTION_NEEDED_VAL
);

export const openDialogWithCallbackAtom = atom(
        null,
        (get, set, actionInfo: ActionNeededInfo) => {
                set(actionNeededInfoAtom, actionInfo);
                set(openDialogAtom, 'actionNeeded');
        }
);

export const declineAction = atom(null, (_get, set) => {
        set(actionNeededInfoAtom, DUMB_ACTION_NEEDED_VAL);
        set(hideDialogAtom, 'actionNeeded');
});

export const approveAction = atom(null, (get, set) => {
        const { onApprove } = get(actionNeededInfoAtom);
        onApprove();
        set(hideDialogAtom, 'actionNeeded');
        set(actionNeededInfoAtom, DUMB_ACTION_NEEDED_VAL);
});
