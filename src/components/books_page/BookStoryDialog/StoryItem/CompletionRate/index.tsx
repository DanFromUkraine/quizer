"use client"

import useStoryCompletionPercentage from '@/src/hooks/historyRelated/useStoryCompletionData';

export default function CompletionRate({ storyId }: { storyId: string }) {
        const { completionPercentage } = useStoryCompletionPercentage(storyId);
        const isPercentageGreen = completionPercentage > 49;

        return (
                <h2
                        data-isgreen={isPercentageGreen}
                        className='mx-auto heading-1 !text-red-400  data-[isgreen=true]:!text-green-400 !my-0'>
                        {`${completionPercentage}%`}
                </h2>
        );
}
