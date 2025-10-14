'use client';

import Bread from '@/src/components/general/Bread';
import { MouseEventHandler, useMemo } from 'react';
import { useAtomCallback } from 'jotai/utils';
import { MdDeleteOutline } from 'react-icons/md';
import {
        deleteStoryAtom,
        getStoryCompletionDataAtom
} from '@/src/jotai/historyAtoms';
import { updateBookStoriesDataAtom } from '@/src/jotai/storiesForBookDialogInfoAtoms';
import { currentBookIdForStoriesDialogAtom } from '@/src/jotai/idManagers';
import DateBread from '@/src/components/general/DateBread';
import { useAtomValue } from 'jotai';
import { storiesAtomFamily } from '@/src/jotai/mainAtoms';

export function CompletionRateLikeBread({ storyId }: { storyId: string }) {
        const stableAtom = useMemo(
                () => getStoryCompletionDataAtom(storyId),
                []
        );

        const { numOfChoices, numOfCards } = useAtomValue(stableAtom);
        return <Bread items={[numOfChoices, numOfCards]} className='mr-auto' />;
}

export function DeleteStoryButton({ storyId }: { storyId: string }) {
        const onDeleteButtonClick: MouseEventHandler<HTMLDivElement> =
                useAtomCallback(async (get, set, e) => {
                        e.stopPropagation();
                        const bookId = get(currentBookIdForStoriesDialogAtom);
                        await set(deleteStoryAtom, storyId);
                        set(updateBookStoriesDataAtom, bookId);
                });

        return (
                <div
                        className='absolute top-0 right-0 bg-red-200 hover:bg-red-500 duration-100 rounded-bl-2xl rounded-tr-md group'
                        onClick={onDeleteButtonClick}>
                        <MdDeleteOutline className='text-red-400 group-hover:text-white  text-2xl m-2' />
                </div>
        );
}

export function CompletionRate({ storyId }: { storyId: string }) {
        const stableAtom = useMemo(
                () => getStoryCompletionDataAtom(storyId),
                []
        );
        const { completionPercentage } = useAtomValue(stableAtom);
        const isPercentageGreen = completionPercentage > 49;

        return (
                <h2
                        data-isgreen={isPercentageGreen}
                        className='mx-auto heading-1 !text-red-400  data-[isgreen=true]:!text-green-400 !my-0'>
                        {`${completionPercentage}%`}
                </h2>
        );
}

export function StoryCreationDate({ storyId }: { storyId: string }) {
        const { playStartDate } = useAtomValue(storiesAtomFamily(storyId));
        return <DateBread timeMs={playStartDate} className='ml-auto mt-3' />;
}
