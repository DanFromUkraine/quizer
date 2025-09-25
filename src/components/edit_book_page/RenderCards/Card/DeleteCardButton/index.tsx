'use client';

import { FaRegTrashAlt } from 'react-icons/fa';
import { useSetAtom } from 'jotai';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import { deleteCardAtom } from '@/src/jotai/cardAtoms';

export default function DeleteCardButton() {
        const { cardId } = useCardProps();
        const deleteCard = useSetAtom(deleteCardAtom);
        const onClick = () => {
                deleteCard(cardId);
        };

        return (
                <FaRegTrashAlt
                        data-testid='remove-card-btn'
                        className='text-xl text-questTextColor'
                        onClick={onClick}
                />
        );
}
