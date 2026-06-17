'use client';

import Bread from '@/src/components/general/Bread';
import { MouseEventHandler, useMemo } from 'react';
import { useAtomCallback } from 'jotai/utils';
import { MdDeleteOutline } from 'react-icons/md';
import {
    deleteStoryAtom,
    getStoryCompletionDataAtom
} from '@/src/jotai/historyAtoms';
import DateBread from '@/src/components/general/DateBread';
import { useAtomValue } from 'jotai';
import { storiesAtomFamily } from '@/src/jotai/mainAtoms';

export function CompletionRateLikeBread({ storyId }: { storyId: string }) {
    const stableAtom = useMemo(() => getStoryCompletionDataAtom(storyId), []);

    const { numOfChoices, numOfCards } = useAtomValue(stableAtom);
    return <Bread items={[numOfChoices, numOfCards]} className='mr-auto' />;
}

export function DeleteStoryButton({ storyId }: { storyId: string }) {
    const onDeleteButtonClick: MouseEventHandler<HTMLDivElement> =
        useAtomCallback((_get, set, e) => {
            e.stopPropagation();
            void set(deleteStoryAtom, storyId);
        });

    return (
        <div
            className='group absolute top-0 right-0 rounded-tr-md rounded-bl-2xl bg-red-200 duration-100 hover:bg-red-500'
            onClick={onDeleteButtonClick}>
            <MdDeleteOutline className='m-2 text-2xl text-red-400 group-hover:text-white' />
        </div>
    );
}

export function CompletionRate({ storyId }: { storyId: string }) {
    const stableAtom = useMemo(() => getStoryCompletionDataAtom(storyId), []);
    const { completionPercentage } = useAtomValue(stableAtom);
    const isPercentageGreen = completionPercentage > 49;

    return (
        <h2
            data-isgreen={isPercentageGreen}
            className='heading-1 mx-auto my-0 text-red-400 data-[isgreen=true]:text-green-400'>
            {`${completionPercentage}%`}
        </h2>
    );
}

export function StoryCreationDate({ storyId }: { storyId: string }) {
    const { playStartDate } = useAtomValue(storiesAtomFamily(storyId));
    return <DateBread timeMs={playStartDate} className='mt-3 ml-auto' />;
}
