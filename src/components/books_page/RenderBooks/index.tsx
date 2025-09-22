'use client';

import { useAtomValue } from 'jotai';
import { booksIdsAtom } from '@/src/jotai/mainAtoms';
import BookItem from '@/src/components/books_page/RenderBooks/Book';
import { Suspense } from 'react';

export default function RenderBooks() {
        const booksIds = useAtomValue(booksIdsAtom);

        return (
                <div className='grid grid-cols-3 w-full h-fit gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1'>
                        {booksIds.map((id) => (
                                <Suspense
                                        key={id}
                                        fallback={<div>loading...</div>}>
                                        <BookItem id={id} />
                                </Suspense>
                        ))}
                </div>
        );
}
