"use client"

import DeleteOptionButtonUI from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions/Option/DeleteOptionBtn/UI';
import { useSetAtom } from 'jotai';
import { useOptionProps } from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions/Option';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import { deleteOptionAtom } from '@/src/jotai/optionAtoms';

export default function DeleteOptionButton() {
        const { optionId } = useOptionProps();
        const { cardId } = useCardProps();
        const removeOption = useSetAtom(deleteOptionAtom);
        const onDeleteOptionClick = () => {
                removeOption(cardId, optionId);
        };

        return <DeleteOptionButtonUI onClick={onDeleteOptionClick} />;
}
