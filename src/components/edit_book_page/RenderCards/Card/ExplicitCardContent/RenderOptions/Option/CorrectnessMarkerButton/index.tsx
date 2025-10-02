'use client';

import CorrectnessMarketButtonUI from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions/Option/CorrectnessMarkerButton/UI';
import { useOptionProps } from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions/Option';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { getOptionCorrectnessMarkerAtomAdapter } from '@/src/utils/jotai/mainDbAtomAdapters';

export default function CorrectnessMarketButton() {
        const { optionId, optionIndex } = useOptionProps();
        const stableAdapterAtom = useMemo(
                () => getOptionCorrectnessMarkerAtomAdapter(optionId),
                []
        );

        const [isCorrect, setIsCorrect] = useAtom(stableAdapterAtom);
        const onChangeMarkerStateClick = () => {
                setIsCorrect(!isCorrect);
        };

        return (
                <CorrectnessMarketButtonUI
                        {...{
                                defaultChecked: isCorrect,
                                onCheckboxClick: onChangeMarkerStateClick,
                                optionId,
                                index: optionIndex
                        }}
                />
        );
}
