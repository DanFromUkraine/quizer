'use client';

import { useInitFromHistory } from '@/app/lib/db/History';
import QuestionCard from '@/src/components/general/QuestionCard';
import { useCollectionContext } from '@/app/play-offline/CollectionDataContext/context';

export default function RenderQuestions() {
        useInitFromHistory();
        const collection = useCollectionContext();

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
