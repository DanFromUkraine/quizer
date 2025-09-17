'use client';

import { MdEdit } from 'react-icons/md';
import { useBookProps } from '@/src/components/books_page/RenderBooks/Book';
import Link from 'next/link';

export default function EditButton() {
        const { id } = useBookProps();
        return (
                <Link
                        href={`/edit?bookId=${id}`}
                        className='flex gap-1 items-center bg-amber-500 rounded-md p-1 hover:bg-amber-300 text-xs tracking-widest font-semibold duration-100 text-white'>
                        <span>EDIT</span>
                        <MdEdit className='text-white' />
                </Link>
        );
}
