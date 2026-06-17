'use client';
import Dialog from '@/src/components/general/Dialog';
import { useAtomValue, useSetAtom } from 'jotai';
import {
    actionNeededDataAtom,
    closeActionNeededDialogAtom
} from '@/src/jotai/dialogVisibilityFamily';
import { EP_TEST_IDS } from '@/src/constants/testIds';

export default function WarningDialogWithAction() {
    const { message, onApprove } = useAtomValue(actionNeededDataAtom);
    const closeAndReset = useSetAtom(closeActionNeededDialogAtom);

    const onApproveButtonClick = () => {
        onApprove();
        closeAndReset();
    };

    return (
        <Dialog
            testId={EP_TEST_IDS.actionNeededDialog.me} // 'todo' - move this to a constant
            dialogName='actionNeeded'
            className='max-w-xl bg-white p-6'>
            <section className='flex flex-col items-center gap-6'>
                <h3 className='heading-3'>{message}</h3>
                <section className='flex gap-2'>
                    <button
                        onClick={onApproveButtonClick}
                        className='heading-3 rounded-md border border-blue-700 bg-blue-200 px-4 py-3 duration-100 hover:bg-blue-300'>
                        Accept
                    </button>
                    <button
                        onClick={closeAndReset}
                        autoFocus={true}
                        tabIndex={0}
                        className='heading-3 rounded-md border-red-950 bg-red-300 px-4 py-3 duration-100 hover:bg-red-400'>
                        Decline
                    </button>
                </section>
            </section>
        </Dialog>
    );
}
