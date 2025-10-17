'use client';

import { finishStoryAtom } from '@/src/jotai/historyAtoms';
import { useAtomCallback } from 'jotai/utils';
import { useRouter } from 'next/navigation';
import { usePlayModeProps } from '@/app/play/page';

export default function FinishButton() {
        const router = useRouter();
        const { isCompleted, storyId } = usePlayModeProps();
        const onClick = useAtomCallback(async (get, set) => {
                await set(finishStoryAtom, storyId);
                router.push('/history');
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
