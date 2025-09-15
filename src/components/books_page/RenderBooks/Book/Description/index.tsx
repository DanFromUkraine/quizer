'use client';

import { useBookProps } from '@/src/components/books_page/RenderBooks/Book';

export default function BookDescription() {
        const { description } = useBookProps();
        return (
                <p className='p'>
                        {description.length === 0
                                ? 'No description yet'
                                : description}
                </p>
        );
}
