'use client';

import { finishStoryAtom } from '@/src/jotai/historyAtoms';
import { useAtomCallback } from 'jotai/utils';
import { usePlayModeProps } from '@/src/pages/play/model/play-mode-props';
import { PP_TEST_IDS } from '@/src/constants/testIds';

export default function FinishButton() {
    const { isCompleted, storyId } = usePlayModeProps();
    const onClick = useAtomCallback((_get, set) => {
        void set(finishStoryAtom, storyId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    return (
        !isCompleted && (
            <button
                data-testid={PP_TEST_IDS.submitBtb}
                onClick={onClick}
                type='button'
                className='bg-darkBlueOne hover:bg-darkerBlueOne hover:border-lightBlueOne mx-auto my-10 flex w-fit items-center gap-1 rounded-sm border-2 px-12 py-4 font-semibold text-white duration-100'>
                Finish test
            </button>
        )
    );
}
