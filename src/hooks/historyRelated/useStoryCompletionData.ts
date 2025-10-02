'use client';

import { useAtomValue } from 'jotai';
import { storiesAtomFamily } from '@/src/jotai/mainAtoms';

export default function useStoryCompletionData(storyId: string) {
        const { choicePointers, bookData } = useAtomValue(
                storiesAtomFamily(storyId)
        );
        const numOfChoices = choicePointers.length,
                numOfCards = bookData.cards.length;
        const completionPercentage = Math.round(numOfChoices / numOfCards) * 100;

        return {
                completionPercentage,
                numOfChoices,
                numOfCards
        };
}
