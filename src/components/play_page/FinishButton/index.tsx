'use client';

import { finishStoryAtom } from '@/src/jotai/historyAtoms';
import { useAtomCallback } from 'jotai/utils';
import { usePlayModeProps } from '@/app/play/page';
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
                                className='mx-auto my-10 buttonV1'>
                                Finish test
                        </button>
                )
        );
}
