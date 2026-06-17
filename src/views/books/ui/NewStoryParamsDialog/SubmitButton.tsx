'use client';

import { useAtomCallback } from 'jotai/utils';
import { useRouter } from 'next/navigation';
import { BP_TEST_IDS } from '@/src/constants/testIds';
import {
    addNewStoryAtom,
    newStorySettingsAtom
} from '@/src/jotai/historyAtoms';
import { closeNewStorySettingsDialogAtom } from '@/src/jotai/newStoryParamsModal';
import getDefaultPathToPlayPage from '@/src/utils/getDefPathToPlayPage';

export default function SubmitButton() {
    const router = useRouter();
    const submit = useAtomCallback((get, set) => {
        const newStorySettings = get(newStorySettingsAtom);
        set(closeNewStorySettingsDialogAtom);
        void set(addNewStoryAtom, {
            settings: newStorySettings,
            bookId: newStorySettings.bookId,
            successCallback: (newStoryId) => {
                router.push(getDefaultPathToPlayPage(newStoryId));
            }
        });
    });

    return (
        <button
            data-testid={BP_TEST_IDS.newStoryDialog.submitBtn}
            onClick={submit}
            className='heading-4 my-6 ml-auto block rounded-xl border border-blue-700 bg-blue-400 px-5 py-2 !text-white duration-100 hover:bg-blue-300'>
            Submit
        </button>
    );
}
