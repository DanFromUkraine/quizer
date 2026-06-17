'use client';

import { useBookProps } from '@/src/views/books/ui/RenderBooks/index';

export default function BookDescription() {
    const { description } = useBookProps();
    return (
        <p className='mb-3 text-sm text-gray-600'>
            {description.length === 0 ? 'No description yet' : description}
        </p>
    );
}
