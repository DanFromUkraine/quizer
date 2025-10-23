'use client';
import { useSetAtom } from 'jotai';
import { IoAddCircle } from 'react-icons/io5';
import { addEmptyBookAtom } from '@/src/jotai/bookAtoms';
import { BP_TEST_IDS } from '@/src/constants/testIds';

export default function AddBookButton() {
        const add = useSetAtom(addEmptyBookAtom);
        return (
                <button
                        data-testid={BP_TEST_IDS.addNewBookBtn}
                        onClick={add}
                        className='fixed bottom-[25px] right-5'>
                        <IoAddCircle className='text-6xl hover:rotate-45 duration-200 bg-white rounded-full shadow-xl' />
                </button>
        );
}
