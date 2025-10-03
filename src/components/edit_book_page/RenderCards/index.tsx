'use client';

import { useMemo } from 'react';
import { useEditBookProps } from '@/app/edit/page';
import { booksAtomFamily } from '@/src/jotai/mainAtoms';
import { useAtomValue } from 'jotai';
import Card from '@/src/components/edit_book_page/RenderCards/Card';
import { getCardType } from '@/src/utils/lists';

export function RenderCards() {
        const { bookId } = useEditBookProps();
        const bookAtom = useMemo(() => booksAtomFamily(bookId), []);
        const { cardIdsOrder, explicitCardIds, shortCardIds } =
                useAtomValue(bookAtom);

        console.debug('Render cards update', {
                cardIdsOrder,
                explicitCardIds,
                shortCardIds
        });


        return (
                <section>
                        <div className='flex flex-col items-center gap-3'>
                                {cardIdsOrder.map((cardId, i) => (
                                        <Card
                                                key={cardId}
                                                {...{
                                                        explicitCardIds,
                                                        shortCardIds,
                                                        cardId,
                                                        cardIndex: i
                                                }}
                                        />
                                ))}
                        </div>
                </section>
        );
}
