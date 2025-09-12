'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { addEmptyBookAtom, booksIdsAtom } from '@/src/jotai/mainDbAtom';
import BookItem from '@/src/components/books_page/RenderBooks/Book';

export default function RenderBooks() {
        const booksIds = useAtomValue(booksIdsAtom);
        const addBook = useSetAtom(addEmptyBookAtom);

        return (
                <div
                        className='grid grid-cols-2 w-full h-fit gap-4 max-sm:grid-cols-1
    '
                        onClick={addBook}>
                        hello
                        {booksIds.map((id) => (
                                <BookItem id={id} key={id} />
                        ))}
                </div>
        );
}
