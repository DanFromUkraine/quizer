'use client';

import { useOptionProps } from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions/Option';
import OptionTitleUI from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions/Option/OptionTitle/UI';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { getCardOptionTitleAtomAdapter } from '@/src/utils/jotai/mainDbAtomAdapters';
import { useMemo } from 'react';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import { useAtom } from 'jotai';

export default function OptionTitle() {
        const { optionId } = useOptionProps();
        const { cardId } = useCardProps();
        const stableAdapterAtom = useMemo(
                () => getCardOptionTitleAtomAdapter(optionId),
                []
        );
        const [value, setValue] =
                useAtom(
                        stableAdapterAtom
                ); /* 'todo' change it with updateAdapter, when you have time*/

        return (
                <OptionTitleUI
                        value={value}
                        onChange={getInputChangeCallback(setValue)}
                        optionId={optionId}
                />
        );
}
