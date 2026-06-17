'use client';

import getDefaultPathToPlayPage from '@/src/utils/getDefPathToPlayPage';
import { useAtomCallback } from 'jotai/utils';
import { hideDialogAtom } from '@/src/jotai/dialogVisibilityFamily';
import { useRouter } from 'next/navigation';
import {
    CompletionRate,
    CompletionRateLikeBread,
    DeleteStoryButton,
    StoryCreationDate
} from '@/src/components/general/StoryItem/client';
import { BP_TEST_IDS } from '@/src/constants/testIds';

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
