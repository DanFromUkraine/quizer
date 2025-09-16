'use client';

import { useSetAtom } from 'jotai';
import AddEmptyCardUI from './UI';
import { addEmptyCardAtom } from '@/src/jotai/mainDbAtom';
import { useEditBookProps } from '@/app/books/edit/page';

export default function AddEmptyCardButton() {
        const { bookId } = useEditBookProps();
        const addEmptyCard = useSetAtom(addEmptyCardAtom);
        const onButtonClick = () => addEmptyCard(bookId);

        return <AddEmptyCardUI onClick={onButtonClick} />;
}
