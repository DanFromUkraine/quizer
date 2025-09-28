'use client';

import { useAtomValue } from 'jotai';
import { currentStoryIdAtom } from '@/src/jotai/idManagers';
import { historyFamilyAtom } from '@/src/jotai/mainAtoms';
import PlayCard from '@/src/components/play_page/CardsList/Card';

export default function PlayCardsList() {
        const storyId = useAtomValue(currentStoryIdAtom);
        const {
                bookData: { cards }
        } = useAtomValue(historyFamilyAtom(storyId));
        console.debug({ cards });
        return (
                <ul>
                        {cards.map((card, i) => (
                                <PlayCard key={i} card={card} />
                        ))}
                </ul>
        );
}
