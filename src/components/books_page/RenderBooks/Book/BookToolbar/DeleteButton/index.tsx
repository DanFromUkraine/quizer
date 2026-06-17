'use client';

import { MdDelete } from 'react-icons/md';
import { useSetAtom } from 'jotai/react';
import { useBookProps } from '@/src/components/books_page/RenderBooks/Book';
import { deleteBookAtom } from '@/src/jotai/bookAtoms';
import { BP_TEST_IDS } from '@/src/constants/testIds';

export default function DeleteButton() {
    const { id } = useBookProps();
    const deleteBook = useSetAtom(deleteBookAtom);

    return (
        <MdDelete
            data-testid={BP_TEST_IDS.bookCard.deleteBookBtn}
            onClick={() => deleteBook(id)}
            className='text-3xl text-gray-500 duration-100 hover:text-red-600'
        />
    );
}
