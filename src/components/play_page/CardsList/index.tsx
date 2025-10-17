'use client';

import { useAtomValue } from 'jotai';
import { storiesAtomFamily } from '@/src/jotai/mainAtoms';
import ExplicitCard from '@/src/components/play_page/CardsList/ExplicitCard';
import TypeInCard from '@/src/components/play_page/CardsList/TypeInCard';
import IsCorrectCard from '@/src/components/play_page/CardsList/IsCorrectCard';
import { getPlayCardType } from '@/src/utils/lists';
import { usePlayModeProps } from '@/app/play/page';

export default  function PlayCardsList() {
        const { storyId } = usePlayModeProps();
        const {
                cardIdsOrder,
                explicitCardStoryIds,
                typeInCardStoryIds,
                isCorrectCardStoryIds
        } = useAtomValue(storiesAtomFamily(storyId));


        return (
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
                                } else if (cardType === 'play-isCorrect') {
                                        return (
                                                <IsCorrectCard
                                                        key={cardId}
                                                        cardId={cardId}
                                                />
                                        );
                                }
                        })}
                </ul>
        );
}
