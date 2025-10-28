'use client';
import { useAtomValue, useSetAtom } from 'jotai';
import { IoAddCircle } from 'react-icons/io5';
import { addEmptyBookAtom } from '@/src/jotai/bookAtoms';
import { BP_TEST_IDS } from '@/src/constants/testIds';
import { isInitializationFromIdbCompletedAtom } from '@/src/jotai/mainAtoms';

export default function AddBookButton() {
        const add = useSetAtom(addEmptyBookAtom);
        const isDbReady = useAtomValue(isInitializationFromIdbCompletedAtom);

        return (
                isDbReady && ( // This may look very weird, but this hack is needed for correct work of Playwright, as CLI test work just too fast
                        <button
                                data-testid={BP_TEST_IDS.addNewBookBtn}
                                onClick={add}
                                className='fixed bottom-[25px] right-5'>
                                <IoAddCircle className='text-6xl hover:rotate-45 duration-200 bg-white rounded-full shadow-xl' />
                        </button>
                )
        );
}
