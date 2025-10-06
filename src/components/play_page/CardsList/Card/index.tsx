'use client';

import { FullCard } from '@/src/types/mainDbGlobal';
import PlayOptionsList from '@/src/components/play_page/CardsList/Card/OptionsList';
import { useAtomValue } from 'jotai';
import { getChoiceIndexMade } from '@/src/jotai/historyAtoms';
import { currentStoryIdAtom } from '@/src/jotai/idManagers';
import { storiesAtomFamily } from '@/src/jotai/mainAtoms';

export default function PlayCard({
        card,
        cardIndex
}: {
        card: FullCard;
        cardIndex: number;
}) {

        const storyId = useAtomValue(currentStoryIdAtom);
        const { choicePointers } = useAtomValue(storiesAtomFamily(storyId))
        const choicePointer = choicePointers[cardIndex];

        return (
                <li className='questionCard items-center w-full'>
                        <h3 className='heading-2'>{`'${card.title}'`}</h3>
                        <PlayOptionsList
                                cardChoiceIndex={choicePointer}
                                cardIndex={cardIndex}
                                options={card.options}
                        />
                </li>
        );
}
