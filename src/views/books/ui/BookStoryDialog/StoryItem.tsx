'use client';

import Bread from '@/src/shared/ui/Bread';
import DateBread from '@/src/shared/ui/DateBread';
import { BP_TEST_IDS } from '@/src/constants/testIds';
import { hideDialogAtom } from '@/src/jotai/dialogVisibilityFamily';
import {
    deleteStoryAtom,
    getStoryCompletionDataAtom
} from '@/src/jotai/historyAtoms';
import { storiesAtomFamily } from '@/src/jotai/mainAtoms';
import getDefaultPathToPlayPage from '@/src/utils/getDefPathToPlayPage';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { MouseEventHandler, useMemo } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { useRouter } from 'next/navigation';

export default function StoryItem({ storyId }: { storyId: string }) {
    const router = useRouter();
    const onClick = useAtomCallback((_get, set) => {
        set(hideDialogAtom, 'storiesForBook');
        router.replace(getDefaultPathToPlayPage(storyId));
    });

    return (
        <div
            data-testid={BP_TEST_IDS.bookStoriesDialog.storyCard}
            onClick={onClick}
            className='glass relative flex w-full flex-col rounded-md p-6 duration-100 hover:shadow-xl'>
            <CompletionRateLikeBread storyId={storyId} />
            <DeleteStoryButton storyId={storyId} />
            <CompletionRate storyId={storyId} />
            <StoryCreationDate storyId={storyId} />
        </div>
    );
}


function CompletionRateLikeBread({ storyId }: { storyId: string }) {
    const stableAtom = useMemo(() => getStoryCompletionDataAtom(storyId), []);

    const { numOfChoices, numOfCards } = useAtomValue(stableAtom);
    return <Bread items={[numOfChoices, numOfCards]} className='mr-auto' />;
}

function DeleteStoryButton({ storyId }: { storyId: string }) {
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

function CompletionRate({ storyId }: { storyId: string }) {
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

function StoryCreationDate({ storyId }: { storyId: string }) {
    const { playStartDate } = useAtomValue(storiesAtomFamily(storyId));
    return <DateBread timeMs={playStartDate} className='mt-3 ml-auto' />;
}

