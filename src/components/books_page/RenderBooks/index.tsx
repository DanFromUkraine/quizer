'use client';

import { useAtomValue } from 'jotai';
import BookItem from '@/src/components/books_page/RenderBooks/Book';
import { Suspense } from 'react';
import { booksIdsAtom } from '@/src/jotai/idManagers';

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
