'use client';

import { useSetAtom } from 'jotai';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import { addEmptyOptionAtom } from '@/src/jotai/optionAtoms';
import { EP_TEST_IDS } from '@/src/constants/testIds';

export default function AddEmptyOptionButton() {
    const { cardId } = useCardProps();
    const addEmptyOption = useSetAtom(addEmptyOptionAtom);

    const onAddOptionClick = () => {
        addEmptyOption(cardId);
    };

    return (
        <button
            type='button'
            data-testid={EP_TEST_IDS.card.explicitCardContent.newOptionBtn}
            onClick={onAddOptionClick}
            className='my-0 w-full cursor-pointer rounded-xl border-[3px] border-dashed border-[#2563eb] bg-transparent p-3 font-bold text-[#2563eb] duration-100 hover:border-[#1d4ed8] hover:bg-[#eff6ff] hover:text-[#1d4ed8]'>
            + Add option
        </button>
    );
}
