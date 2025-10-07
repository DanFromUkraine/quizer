import { atom, Getter, Setter } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { SnackbarNames } from '@/src/jotai/snackbarAtoms';

export type DialogNames =
        | 'storiesForBook'
        | 'editCardsAsText'
        | 'notAllAnswersWarning'
        | SnackbarNames
        | 'actionNeeded'
        | 'newStoryParams';

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

export const [
        actionNeededDataAtom,
        openActionNeededDialogAtom,
        closeActionNeededDialogAtom
] = createDialogWithInfoPair<ActionNeededInfo, [ActionNeededInfo]>({
        dialogName: 'actionNeeded',
        initData: {
                message: '',
                onApprove: () => {}
        },
        getDialogData(_get, _set, actionInfo: ActionNeededInfo) {
                return actionInfo;
        }
});

export function createDialogWithInfoPair<Info, Params extends unknown[]>({
        dialogName,
        initData,
        getDialogData
}: {
        dialogName: DialogNames;
        initData: Info;
        getDialogData: (get: Getter, set: Setter, ...args: Params) => Info;
}) {
        const dialogDataAtom = atom<Info>(initData);
        const showDataReachDialogAtom = atom(null, (get, set, ...args) => {
                set(
                        dialogDataAtom,
                        getDialogData(get, set, ...(args as Params))
                );
                set(openDialogAtom, dialogName);
        });
        const hideDataReachDialogAtom = atom(null, (_get, set) => {
                set(hideDialogAtom, dialogName);
                set(dialogDataAtom, initData);
        });

        return [
                dialogDataAtom,
                showDataReachDialogAtom,
                hideDataReachDialogAtom
        ] as const;
}


