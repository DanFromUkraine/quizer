'use client';

import Bread from '@/src/components/general/Bread';
import useStoryCompletionData from '@/src/hooks/historyRelated/useStoryCompletionData';

export default function CompletionRateLikeBread({
        storyId
}: {
        storyId: string;
}) {
        const { numOfChoices, numOfCards } = useStoryCompletionData(storyId);
        return <Bread items={[numOfChoices, numOfCards]} className='mr-auto' />;
}
