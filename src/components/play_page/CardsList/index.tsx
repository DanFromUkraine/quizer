'use client';

import { useAtomValue } from 'jotai';
import { currentStoryIdAtom } from '@/src/jotai/idManagers';
import { historyFamilyAtom } from '@/src/jotai/mainAtoms';
import Card from '@/src/components/play_page/CardsList/Card';

export default function CardsList() {
        const storyId = useAtomValue(currentStoryIdAtom);
        const {
                bookData: { cards }
        } = useAtomValue(historyFamilyAtom(storyId));
        console.debug({ cards });
        return (
                <ul>
                        {cards.map((card, i) => (
                                <Card key={i} card={card} />
                        ))}
                </ul>
        );
}
