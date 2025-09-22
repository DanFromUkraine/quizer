"use client"

import DeleteOptionButtonUI from '@/src/components/edit_book_page/RenderCards/Card/RenderOptions/Option/DeleteOptionBtn/UI';
import { deleteOptionAtom } from '@/src/jotai/mainAtoms';
import { useSetAtom } from 'jotai';
import { useOptionProps } from '@/src/components/edit_book_page/RenderCards/Card/RenderOptions/Option';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';

export default function DeleteOptionButton() {
        const { optionId } = useOptionProps();
        const { cardId } = useCardProps();
        const removeOption = useSetAtom(deleteOptionAtom);
        const onDeleteOptionClick = () => {
                removeOption(cardId, optionId);
        };

        return <DeleteOptionButtonUI onClick={onDeleteOptionClick} />;
}
