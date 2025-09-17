'use client';

import { addEmptyOptionAtom } from '@/src/jotai/mainDbAtom';
import { useSetAtom } from 'jotai';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';

export default function AddEmptyOptionButton() {
        const { cardId } = useCardProps();
        const addEmptyOption = useSetAtom(addEmptyOptionAtom);

        const onAddOptionClick = () => {
                addEmptyOption(cardId);
                console.debug("click")
        };

        return (
                <button
                        type='button'
                        data-testid='add-option-btn'
                        onClick={onAddOptionClick} className="text-black">
                        Add option
                </button>
        );
}
