'use client';

import { MdEdit } from 'react-icons/md';
import { useBookProps } from '@/src/components/books_page/RenderBooks/Book';
import Link from 'next/link';
import { BP_TEST_IDS } from '@/src/constants/testIds';

export default function EditButton() {
    const { id } = useBookProps();
    return (
        <Link
            data-testid={BP_TEST_IDS.bookCard.editBookBtn}
            href={`/edit?bookId=${id}`}
            className='flex items-center gap-1 rounded-md bg-amber-500 p-1 text-xs font-semibold tracking-widest text-white duration-100 hover:bg-amber-300'>
            <span>EDIT</span>
            <MdEdit className='text-white' />
        </Link>
    );
}
