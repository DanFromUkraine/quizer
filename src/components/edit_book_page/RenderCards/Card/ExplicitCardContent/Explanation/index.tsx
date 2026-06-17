'use client';

import { useMemo } from 'react';
import { getExplicitCardExplanationFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import { EP_TEST_IDS } from '@/src/constants/testIds';
import useJotaiDeferredUpdateAdapter from '@/src/hooks/jotaiRelated/jotaiDeferedInput';

export default function Explanation() {
    const { cardId } = useCardProps();
    const stableAtom = useMemo(
        () => getExplicitCardExplanationFamilyAdapterAtom(cardId),
        [cardId]
    );
    const { inputValue, setInputValue, isDisabled } =
        useJotaiDeferredUpdateAdapter({
            adapterAtom: stableAtom,
            cardId
        });

    const onChange = getInputChangeCallback(setInputValue);

    return (
        <ExtendableTextArea
            disabled={isDisabled}
            testId={EP_TEST_IDS.card.explicitCardContent.explanationInp}
            title='explicit-card-explanation'
            placeholder='Explanation'
            value={inputValue}
            onChange={onChange}
            className='min-h-[70px] w-full !rounded-[10px] !border-[#dfe3ea] !bg-[#fafbfc] !p-3.5 text-[#222] duration-200'
            id={`explanation-${cardId}`}
        />
    );
}
