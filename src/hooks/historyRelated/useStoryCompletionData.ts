'use client';

import { useAtomValue } from 'jotai';
import { historyFamilyAtom } from '@/src/jotai/mainAtoms';

export default function useStoryCompletionData(storyId: string) {
        const { choicePointers, bookData } = useAtomValue(
                historyFamilyAtom(storyId)
        );
        const numOfChoices = choicePointers.length,
                numOfCards = bookData.cards.length;
        const completionPercentage = Math.round(numOfChoices / numOfCards);

        return {
                completionPercentage,
                numOfChoices,
                numOfCards
        };
}
