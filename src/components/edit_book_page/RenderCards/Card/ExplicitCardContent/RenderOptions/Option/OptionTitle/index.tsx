'use client';

import { useOptionProps } from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions/Option';
import OptionTitleUI from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions/Option/OptionTitle/UI';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { getCardOptionTitleFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { useMemo } from 'react';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import { useAtom } from 'jotai';

export default function OptionTitle() {
        const { optionId } = useOptionProps();
        const stableAdapterAtom = useMemo(
                () => getCardOptionTitleFamilyAdapterAtom(optionId),
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
