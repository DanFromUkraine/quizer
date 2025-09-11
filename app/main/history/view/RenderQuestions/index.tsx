'use client';

import { useInitFromHistory } from '@/app/lib/db/History';
import QuestionCard from '@/app/lib/components/QuestionCard';
import { useCollectionContextComplete } from '../CollectionDataContext/context';

export default function RenderQuestions() {
        useInitFromHistory();
        const collection = useCollectionContextComplete();

        console.log({ collection });

        return (
                <div className='flex flex-col w-full items-center gap-2.5'>
                        {collection?.attemp.cards.map((card, i) => (
                                <QuestionCard
                                        key={i}
                                        mode='assessment-mode'
                                        cardIndex={i}
                                        {...card}
                                />
                        ))}
                </div>
        );
}
