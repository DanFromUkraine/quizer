'use client';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import { useAtomValue } from 'jotai';
import { explicitCardsAtomFamily } from '@/src/jotai/mainAtoms';
import QuestionTitle from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/QuestionTitle';
import RenderOptions from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions';

export default function ShortOrExplicitCardSegregator() {
        const { cardId } = useCardProps();
        const { type } = useAtomValue(explicitCardsAtomFamily(cardId));

        if (type === 'short') {
                return
        } else {
                return (
                        <div className='w-11/12 flex flex-col gap-4'>
                                <QuestionTitle />
                                <RenderOptions />
                        </div>
                );
        }
}
