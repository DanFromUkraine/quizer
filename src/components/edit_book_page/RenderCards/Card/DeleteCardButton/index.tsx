'use client';

import { FaRegTrashAlt } from 'react-icons/fa';
import { useEditBookProps } from '@/app/edit/page';
import { useSetAtom } from 'jotai';
import { deleteCardAtom } from '@/src/jotai/mainDbAtom';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';

export default function DeleteCardButton() {
        const { bookId } = useEditBookProps();
        const { cardId } = useCardProps();
        const deleteCard = useSetAtom(deleteCardAtom);
        const onClick = () => {
                deleteCard(bookId, cardId);
        };

        return (
                <FaRegTrashAlt
                        data-testid='remove-card-btn'
                        className='text-xl text-questTextColor'
                        onClick={onClick}
                />
        );
}
