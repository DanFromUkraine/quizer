'use client';

import { useBookProps } from '@/src/components/books_page/RenderBooks/Book';

export default function BookTitle() {
        const { bookTitle } = useBookProps();
        return (
                <h3 className='h3'>
                        {bookTitle.length === 0 ? 'Untitled book' : bookTitle}
                </h3>
        );
}
