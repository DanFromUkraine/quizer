'use client';

import { useBookProps } from '@/src/views/books/ui/RenderBooks/index';

export default function BookTitle() {
    const { bookTitle } = useBookProps();
    return (
        <h3 className='h3'>
            {bookTitle.length === 0 ? 'Untitled book' : bookTitle}
        </h3>
    );
}
