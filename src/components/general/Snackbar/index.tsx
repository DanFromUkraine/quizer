"use client"

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
        const isVisible = useAtomValue(
                dialogVisibilityFamilyAtom(snackbarName)
        );
        const state = isVisible ? 'visible' : 'hidden';

        return (
                <div
                        data-state={state}
                        className='fixed bottom-10 left-10 !flex p-4 gap-3 rounded-md bg-yellow-500 opacity-0 items-center -z-50 data-[state=visible]:z-10 data-[state=visible]:opacity-100 duration-200'>
                        <span className='heading-4 !text-white'>{message}</span>
                        <IoWarning className='text-yellow-900 text-2xl' />
                </div>
        );
}
