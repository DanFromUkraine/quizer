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
                <section className='container'>
                        <button
                                data-testid={
                                        EP_TEST_IDS.openDialogBtnCardsAsText
                                }
                                onClick={openDialog}
                                className='buttonV1'>
                                <span className='heading-3 text-white!'>
                                        Edit cards as a text
                                </span>
                                <FaRegEdit className='text-2xl' />
                        </button>
                </section>
        );
}
