'use client';

import { finishStoryAtom } from '@/src/jotai/historyAtoms';
import { useAtomCallback } from 'jotai/utils';
import { usePlayModeProps } from '@/app/play/page';

export default function FinishButton() {
        const { isCompleted, storyId } = usePlayModeProps();
        const onClick = useAtomCallback(async (get, set) => {
                await set(finishStoryAtom, storyId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        return (
                !isCompleted && (
                        <button
                                onClick={onClick}
                                type='button'
                                className='mx-auto my-10 buttonV1'>
                                Finish test
                        </button>
                )
        );
}
