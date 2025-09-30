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

export default function StoryItem({ storyId }: { storyId: string }) {
        const router = useRouter();
        const onClick = useAtomCallback((_get, set) => {
                set(hideDialogAtom, 'storiesForBook');
                router.replace(getDefaultPathToPlayPage(storyId));
        });
        return (
                <div
                        onClick={onClick}
                        className='flex flex-col p-6 w-full rounded-md glass hover:shadow-xl relative duration-100'>
                        <CompletionRateLikeBread storyId={storyId} />
                        <DeleteStoryButton storyId={storyId} />
                        <CompletionRate storyId={storyId} />
                        <StoryCreationDate storyId={storyId} />
                </div>
        );
}
