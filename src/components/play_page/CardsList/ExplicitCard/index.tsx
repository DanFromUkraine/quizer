'use client';

import  {Option,
        Explanation,
        Subtitle
} from '@/src/components/play_page/CardsList/ExplicitCard/client';
import { useAtomValue } from 'jotai';
import { explicitCardStoriesAtomFamily } from '@/src/jotai/mainAtoms';

export default function ExplicitCard({ cardId }: { cardId: string }) {
        const { title, options, explanation, subtitle } = useAtomValue(
                explicitCardStoriesAtomFamily(cardId)
        );

        return (
                <li className='questionCard items-center w-full'>
                        <h3 className='heading-2'>{`'${title}'`}</h3>
                        <Subtitle subtitle={subtitle} />
                        <ul className='w-full flex flex-col gap-2'>
                                {options.map((option, i) => (
                                        <Option
                                                cardId={cardId}
                                                {...option}
                                                optionIndex={i}
                                                key={i}
                                        />
                                ))}
                        </ul>
                        <Explanation explanation={explanation} />
                </li>
        );
}
