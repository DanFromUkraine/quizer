'use client';

import { useMemo } from 'react';
import { useEditBookProps } from '@/app/edit/page';
import { booksAtomFamily } from '@/src/jotai/mainAtoms';
import { useAtomValue } from 'jotai';
import Card from '@/src/components/edit_book_page/RenderCards/Card';

export function RenderCards() {
        const { bookId } = useEditBookProps();
        const bookAtom = useMemo(() => booksAtomFamily(bookId), [bookId]);
        const { childrenIds } = useAtomValue(bookAtom);

        return (
                <section>
                        <div className='flex flex-col items-center gap-3'>
                                {childrenIds.map((cardId) => (
                                        <Card key={cardId} cardId={cardId} />
                                ))}
                        </div>
                </section>
        );
}
