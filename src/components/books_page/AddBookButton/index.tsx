'use client';
import { useAtomValue, useSetAtom } from 'jotai';
import { IoAddCircle } from 'react-icons/io5';
import { addEmptyBookAtom } from '@/src/jotai/bookAtoms';
import { BP_TEST_IDS } from '@/src/constants/testIds';
import { isInitializationFromIdbCompletedAtom } from '@/src/jotai/mainAtoms';

export default function AddBookButton() {
    const add = useSetAtom(addEmptyBookAtom) as () => void;
    const isDbReady = useAtomValue(isInitializationFromIdbCompletedAtom);

    return (
        isDbReady && (
            <button
                data-testid={BP_TEST_IDS.addNewBookBtn}
                onClick={add}
                className='fixed right-2 bottom-[25px] shadow-xl rounded-full sm:right-5'>
                <IoAddCircle className='rounded-full bg-white text-6xl duration-200 hover:rotate-45' />
            </button>
        )
    );
}
