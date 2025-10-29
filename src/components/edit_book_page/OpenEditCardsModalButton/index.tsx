'use client';

import { useSetAtom } from 'jotai';
import { FaRegEdit } from 'react-icons/fa';
import { openDialogAtom } from '@/src/jotai/dialogVisibilityFamily';
import { EP_TEST_IDS } from '@/src/constants/testIds';

export default function OpenEditCardsModalButton() {
        const openDialog = useSetAtom(openDialogAtom);
        const onClick = () => openDialog('editCardsAsText');

        return (
                <section className='container'>
                        <button
                                data-testid={
                                        EP_TEST_IDS.openDialogBtnCardsAsText
                                }
                                onClick={onClick}
                                className='buttonV1'>
                                <span className='heading-3 !text-white'>
                                        Edit cards as a text
                                </span>
                                <FaRegEdit className='text-2xl' />
                        </button>
                </section>
        );
}
