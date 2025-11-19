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
                isDbReady && ( // This may look very weird, but this hack is needed for correct work of Playwright, as CLI test work just too fast
                        <button
                                data-testid={BP_TEST_IDS.addNewBookBtn}
                                onClick={add}
                                className='fixed right-5 bottom-[25px]'>
                                <IoAddCircle className='rounded-full bg-white text-6xl shadow-xl duration-200 hover:rotate-45' />
                        </button>
                )
        );
}
