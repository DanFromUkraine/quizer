'use client';

import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { useEditBookProps } from '@/src/pages/edit/model/edit-book-props';
import { booksAtomFamily } from '@/src/jotai/mainAtoms';
import Card from './Card';

export function RenderCards() {
    const { bookId } = useEditBookProps();
    const bookAtom = useMemo(() => booksAtomFamily(bookId), [bookId]);
    const { cardIdsOrder, explicitCardIds, shortCardIds } =
        useAtomValue(bookAtom);

    return (
        <section>
            <div className='flex flex-col items-center gap-3'>
                {cardIdsOrder.map((cardId, cardIndex) => (
                    <Card
                        key={cardId}
                        explicitCardIds={explicitCardIds}
                        shortCardIds={shortCardIds}
                        cardId={cardId}
                        cardIndex={cardIndex}
                    />
                ))}
            </div>
        </section>
    );
}
