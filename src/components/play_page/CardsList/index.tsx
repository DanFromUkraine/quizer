'use client';

import { useAtomValue } from 'jotai';
import { currentStoryIdAtom } from '@/src/jotai/idManagers';
import { storiesAtomFamily } from '@/src/jotai/mainAtoms';
import ExplicitCard from '@/src/components/play_page/CardsList/ExplicitCard';
import TypeInCard from '@/src/components/play_page/CardsList/TypeInCard';
import IsCorrectCard from '@/src/components/play_page/CardsList/IsCorrectCard';

export default function PlayCardsList() {
        const storyId = useAtomValue(currentStoryIdAtom);
        const {
                bookData: { cards }
        } = useAtomValue(storiesAtomFamily(storyId));

        return (
                <ul>
                        {cards.map((card, i) => {
                                if (
                                        card.type === 'play-explicit' ||
                                        card.type === 'play-normal'
                                ) {
                                        return (
                                                <ExplicitCard
                                                        cardIndex={i}
                                                        {...card}
                                                />
                                        );
                                } else if (card.type === 'play-typeIn') {
                                        return <TypeInCard />;
                                } else if (card.type === 'play-isCorrect') {
                                        return <IsCorrectCard />;
                                }
                        })}
                </ul>
        );
}
