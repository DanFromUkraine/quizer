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
                isCorrectCardStoryIds
        } = useAtomValue(storiesAtomFamily(storyId));

        return (
                <PlayCardsListProvider
                        showAnswersImmediately={showAnswersImmediately}>
                        <ul>
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
                                                                cardId={cardId}
                                                        />
                                                );
                                        } else if (cardType === 'play-typeIn') {
                                                return (
                                                        <TypeInCard
                                                                cardId={cardId}
                                                        />
                                                );
                                        } else if (
                                                cardType === 'play-isCorrect'
                                        ) {
                                                return <IsCorrectCard />;
                                        }
                                })}
                        </ul>
                </PlayCardsListProvider>
        );
}
