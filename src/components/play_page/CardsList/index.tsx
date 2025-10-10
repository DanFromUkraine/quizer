'use client';

import { Provider, useAtomValue } from 'jotai';
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
                        <Provider>
                                {cards.map((card) => {
                                        if (
                                                card.type === 'play-explicit' ||
                                                card.type === 'play-normal'
                                        ) {
                                                return (
                                                        <ExplicitCard
                                                                {...card}
                                                        />
                                                );
                                        } else if (card.type === "play-typeIn") {
                                                return <TypeInCard />
                                        } else if (card.type === "play-isCorrect") {
                                                return <IsCorrectCard />
                                        }
                                })}
                        </Provider>
                </ul>
        );
}
