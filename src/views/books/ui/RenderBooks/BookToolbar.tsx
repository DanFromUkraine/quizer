'use client';

import { useSetAtom } from 'jotai/react';
import Link from 'next/link';
import { MdDelete, MdEdit } from 'react-icons/md';
import { BP_TEST_IDS } from '@/src/constants/testIds';
import { deleteBookAtom } from '@/src/jotai/bookAtoms';
import { useBookProps } from '@/src/views/books/ui/RenderBooks/index';

export default function BookToolbar() {
    const { id } = useBookProps();
    const deleteBook = useSetAtom(deleteBookAtom);

    return (
        <div className='mb-1 flex w-full items-center justify-between'>
            <Link
                data-testid={BP_TEST_IDS.bookCard.editBookBtn}
                href={`/edit?bookId=${id}`}
                className='flex items-center gap-1 rounded-md bg-amber-500 p-1 text-xs font-semibold tracking-widest text-white duration-100 hover:bg-amber-300'>
                <span>EDIT</span>
                <MdEdit className='text-white' />
            </Link>
            <MdDelete
                data-testid={BP_TEST_IDS.bookCard.deleteBookBtn}
                onClick={() => void deleteBook(id)}
                className='text-3xl text-gray-500 duration-100 hover:text-red-600'
            />
        </div>
    );
}
