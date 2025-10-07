'use client';
import Dialog from '@/src/components/general/Dialog';
import { useAtomValue, useSetAtom } from 'jotai';
import {
        actionNeededDataAtom,
        closeActionNeededDialogAtom
} from '@/src/jotai/dialogVisibilityFamily';

export default function WarningDialogWithAction() {
        const { message, onApprove } = useAtomValue(actionNeededDataAtom);
        const closeAndReset = useSetAtom(closeActionNeededDialogAtom);

        const onApproveButtonClick = () => {
                onApprove();
                closeAndReset();
        }

        return (
                <Dialog
                        dialogName='actionNeeded'
                        className='bg-white p-6 max-w-xl'>
                        <section className='flex flex-col items-center gap-6'>
                                <h3 className='heading-3'>
                                        {message}
                                </h3>
                                <section className='flex gap-2'>
                                        <button
                                                onClick={onApproveButtonClick}
                                                className='bg-blue-200 px-4 py-3 border border-blue-700 rounded-md hover:bg-blue-300 duration-100 heading-3 '>
                                                Accept
                                        </button>
                                        <button
                                                onClick={closeAndReset}
                                                autoFocus={true}
                                                tabIndex={0}
                                                className='bg-red-300 px-4 py-3 border-red-950 rounded-md hover:bg-red-400 duration-100 heading-3 '>
                                                Decline
                                        </button>
                                </section>
                        </section>
                </Dialog>
        );
}
