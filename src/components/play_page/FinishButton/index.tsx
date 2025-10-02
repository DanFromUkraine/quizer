'use client';

import { finishStoryAtom } from '@/src/jotai/historyAtoms';
import { useAtomCallback } from 'jotai/utils';
import { currentStoryIdAtom } from '@/src/jotai/idManagers';
import { useRouter } from 'next/navigation';

export default function FinishButton() {
        const router = useRouter();
        const onClick = useAtomCallback(async (get, set) => {
                const storyId = get(currentStoryIdAtom);
                await set(finishStoryAtom, storyId);
                router.push('/history');
        });

        return (
                <button
                        onClick={onClick}
                        type='button'
                        className='mx-auto my-10 buttonV1'>
                        Finish test
                </button>
        );
}
