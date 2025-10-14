'use client';

import { useAtomValue } from 'jotai';
import { currentStoryIdAtom } from '@/src/jotai/idManagers';
import { storiesAtomFamily } from '@/src/jotai/mainAtoms';
import ExplicitCard from '@/src/components/play_page/CardsList/ExplicitCard';
import TypeInCard from '@/src/components/play_page/CardsList/TypeInCard';
import IsCorrectCard from '@/src/components/play_page/CardsList/IsCorrectCard';
import { createPropsProvider } from '@/src/utils/createPropsProvider';
import { getPlayCardType } from '@/src/utils/lists';

interface PlayModeProps {
        showAnswersImmediately: boolean;
        isCompleted: boolean;
}
export const {
        Provider: PlayCardsListProvider,
        usePropsContext: usePlayModeProps
} = createPropsProvider<PlayModeProps>('play cards list');

export default function PlayCardsList() {
        const storyId = useAtomValue(currentStoryIdAtom);
        const {
                showAnswersImmediately,
                cardIdsOrder,
                explicitCardStoryIds,
                typeInCardStoryIds,
                isCorrectCardStoryIds,
                isCompleted
        } = useAtomValue(storiesAtomFamily(storyId));

        console.debug({ cardIdsOrder });

        return (
                <PlayCardsListProvider
                        {...{ showAnswersImmediately, isCompleted }}>
                        <ul className='flex flex-col gap-4'>
                                {cardIdsOrder.map((cardId, i) => {
                                        const cardType = getPlayCardType({
                                                targetId: cardId,
                                                explicitCardStoryIds,
                                                typeInCardStoryIds,
                                                isCorrectCardStoryIds
                                        });

                                        if (cardType === 'play-explicit') {
                                                return (
                                                        <ExplicitCard
                                                                key={cardId}
                                                                cardId={cardId}
                                                        />
                                                );
                                        } else if (cardType === 'play-typeIn') {
                                                return (
                                                        <TypeInCard
                                                                key={cardId}
                                                                cardId={cardId}
                                                        />
                                                );
                                        } else if (
                                                cardType === 'play-isCorrect'
                                        ) {
                                                return (
                                                        <IsCorrectCard
                                                                key={cardId}
                                                                cardId={cardId}
                                                        />
                                                );
                                        }
                                })}
                        </ul>
                </PlayCardsListProvider>
        );
}
