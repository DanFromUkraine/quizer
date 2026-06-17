'use client';

import { FaRegEdit } from 'react-icons/fa';
import { openDialogAtom } from '@/src/jotai/dialogVisibilityFamily';
import { EP_TEST_IDS } from '@/src/constants/testIds';
import { useAtomCallback } from 'jotai/utils';

export default function OpenEditCardsModalButton() {
    const openDialog = useAtomCallback((_get, set) =>
        set(openDialogAtom, 'editCardsAsText')
    );

    return (
        <section className='flex w-full justify-end'>
            <button
                data-testid={EP_TEST_IDS.openDialogBtnCardsAsText}
                onClick={openDialog}
                className='bg-editCardsTextButton hover:bg-editCardsTextButtonHover flex w-fit items-center gap-5 rounded-lg px-9 py-4 font-semibold text-white duration-100'>
                <span className='heading-3 text-white!'>
                    Edit cards as a text
                </span>
                <FaRegEdit className='text-2xl' />
            </button>
        </section>
    );
}
