'use client';

import { useAtomValue } from 'jotai';
import { storiesAtomFamily } from '@/src/jotai/mainAtoms';
import { getPlayCardType } from '@/src/utils/lists';
import { usePlayModeProps } from '@/src/views/play/model/play-mode-props';
import { PP_TEST_IDS } from '@/src/constants/testIds';
import ExplicitCard from './ExplicitCard';
import IsCorrectCard from './IsCorrectCard';
import TypeInCard from './TypeInCard';

export default function PlayCardsList() {
    const { storyId } = usePlayModeProps();
    const {
        cardIdsOrder,
        explicitCardStoryIds,
        typeInCardStoryIds,
        isCorrectCardStoryIds
    } = useAtomValue(storiesAtomFamily(storyId));

    return (
        <ul data-testid={PP_TEST_IDS.cardsCont} className='flex flex-col gap-4'>
            {cardIdsOrder.map((cardId) => {
                const cardType = getPlayCardType({
                    targetId: cardId,
                    explicitCardStoryIds,
                    typeInCardStoryIds,
                    isCorrectCardStoryIds
                });

                if (cardType === 'play-explicit') {
                    return <ExplicitCard key={cardId} cardId={cardId} />;
                } else if (cardType === 'play-typeIn') {
                    return <TypeInCard key={cardId} cardId={cardId} />;
                } else if (cardType === 'play-isCorrect') {
                    return <IsCorrectCard key={cardId} cardId={cardId} />;
                }
            })}
        </ul>
    );
}
