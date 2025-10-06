'use client';

import { useSetAtom } from 'jotai';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import { addEmptyOptionAtom } from '@/src/jotai/optionAtoms';

export default function AddEmptyOptionButton() {
        const { cardId } = useCardProps();
        const addEmptyOption = useSetAtom(addEmptyOptionAtom);

        const onAddOptionClick = () => {
                addEmptyOption(cardId);
        };

        return (
                <button
                        type='button'
                        data-testid='add-option-btn'
                        onClick={onAddOptionClick} className="bg-gray-400 hover:bg-gray-300 duration-100 w-fit rounded-lg px-1.5 py-0.5 mx-auto text-white">
                        Add option
                </button>
        );
}
