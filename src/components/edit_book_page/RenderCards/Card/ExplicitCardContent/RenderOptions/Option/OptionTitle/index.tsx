'use client';

import { useOptionProps } from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions/Option';
import OptionTitleUI from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions/Option/OptionTitle/UI';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { getCardOptionTitleFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { useMemo } from 'react';
import useJotaiDeferredUpdateAdapter from '@/src/hooks/jotaiRelated/jotaiDeferedInput';
import { useCardProps } from '../../../..';

export default function OptionTitle() {
        const { optionId } = useOptionProps();
        const { cardId } = useCardProps();
        const stableAdapterAtom = useMemo(
                () => getCardOptionTitleFamilyAdapterAtom(optionId),
                []
        );
        const { inputValue, setInputValue, isDisabled } =
                useJotaiDeferredUpdateAdapter({
                        adapterAtom: stableAdapterAtom,
                        cardId
                }); /* 'todo' change it with updateAdapter, when you have time*/

        return (
                <OptionTitleUI
                        disabled={isDisabled}
                        value={inputValue}
                        onChange={getInputChangeCallback(setInputValue)}
                        optionId={optionId}
                />
        );
}
