'use client';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import MainQuestionTitleUI from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/QuestionTitle/UI';
import useJotaiDeferredUpdateAdapter from '@/src/hooks/jotaiRelated/jotaiDeferedInput';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { getExplicitCardTitleFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { useMemo } from 'react';

export function MainQuestionTitle() {
    const { cardId } = useCardProps();
    const stableAtom = useMemo(
        () => getExplicitCardTitleFamilyAdapterAtom(cardId),
        []
    );
    const { inputValue, setInputValue, isDisabled } =
        useJotaiDeferredUpdateAdapter({
            adapterAtom: stableAtom,
            cardId
        }); /* 'todo' change it with updateAdapter, when you have time*/
    const onChange = getInputChangeCallback(setInputValue);

    return (
        <MainQuestionTitleUI
            {...{
                value: inputValue,
                onChange,
                cardId,
                disabled: isDisabled
            }}
        />
    );
}
