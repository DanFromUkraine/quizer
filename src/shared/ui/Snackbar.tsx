'use client';

import { SnackbarNames } from '@/src/jotai/snackbarAtoms';
import { useAtomValue } from 'jotai';
import { IoWarning } from 'react-icons/io5';
import { dialogVisibilityFamilyAtom } from '@/src/jotai/dialogVisibilityFamily';

export default function Snackbar({
    snackbarName,
    message
}: {
    snackbarName: SnackbarNames;
    message: string;
}) {
    const isVisible = useAtomValue(dialogVisibilityFamilyAtom(snackbarName));
    const state = isVisible ? 'visible' : 'hidden';

    return (
        <div
            data-state={state}
            className='fixed bottom-10 left-10 -z-50 !flex items-center gap-3 rounded-md bg-yellow-500 p-4 opacity-0 duration-200 data-[state=visible]:z-10 data-[state=visible]:opacity-100'>
            <span className='heading-4 !text-white'>{message}</span>
            <IoWarning className='text-2xl text-yellow-900' />
        </div>
    );
}
