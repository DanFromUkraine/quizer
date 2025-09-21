'use client';

import CorrectnessMarketButtonUI from '@/src/components/edit_book_page/RenderCards/Card/RenderOptions/Option/CorrectnessMarkerButton/UI';
import { useOptionProps } from '@/src/components/edit_book_page/RenderCards/Card/RenderOptions/Option';
import { ALPHABET } from '@/src/constants/indexation';
import { useAtom } from 'jotai';
import { cardOptionCorrectnessMarkerAtomAdapter } from '@/src/jotai/utils/mainDbAtomAdapters';

export default function CorrectnessMarketButton() {
        const { optionId, optionIndex } = useOptionProps();
        const correctnessMarkerAdapterAtom =
                cardOptionCorrectnessMarkerAtomAdapter(optionId);
        const [isCorrect, setIsCorrect] = useAtom(correctnessMarkerAdapterAtom);
        const onChangeMarkerStateClick = () => {
                setIsCorrect(!isCorrect);
        };

        const displayedIndexMarker = ALPHABET[optionIndex];

        return (
                <CorrectnessMarketButtonUI
                        {...{
                                defaultChecked: isCorrect,
                                onCheckboxClick: onChangeMarkerStateClick,
                                optionId,
                                indexMarker: displayedIndexMarker
                        }}
                />
        );
}
