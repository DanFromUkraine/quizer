'use client';

import { MdDelete } from 'react-icons/md';
import { deleteBookAtom } from '@/src/jotai/mainDbAtom';
import { useSetAtom } from 'jotai/react';
import { useBookProps } from '@/src/components/books_page/RenderBooks/Book';

export default function DeleteButton() {
        const { id } = useBookProps();
        const deleteBook = useSetAtom(deleteBookAtom);

        return (
                <MdDelete
                        onClick={() => deleteBook(id)}
                        className='text-gray-500 hover:text-red-600 duration-100 text-3xl'
                />
        );
}
