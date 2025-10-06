'use client';

import { useAtomValue } from 'jotai';
import { currentStoryIdAtom } from '@/src/jotai/idManagers';
import { storiesAtomFamily } from '@/src/jotai/mainAtoms';
import PlayCard from '@/src/components/play_page/CardsList/Card';

export default function PlayCardsList() {
        const storyId = useAtomValue(currentStoryIdAtom);
        const {
                bookData: { cards }
        } = useAtomValue(storiesAtomFamily(storyId));
        return (
                <ul>
                        {cards.map((card, i) => (
                                <PlayCard key={i} cardIndex={i} card={card} />
                        ))}
                </ul>
        );
}
