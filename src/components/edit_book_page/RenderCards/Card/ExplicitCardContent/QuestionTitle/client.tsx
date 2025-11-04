'use client';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import MainQuestionTitleUI from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/QuestionTitle/UI';
import LikeSubtitleUI from '@/src/components/general/interfacesUI/subtitle';
import { EP_TEST_IDS } from '@/src/constants/testIds';
import useJotaiDeferredUpdateAdapter from '@/src/hooks/jotaiRelated/jotaiDeferedInput';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import {
    getExplicitCardSubtitleFamilyAdapterAtom,
    getExplicitCardTitleFamilyAdapterAtom
} from '@/src/utils/jotai/atomAdapters';
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

export function SubQuestionTitle() {
        const { cardId } = useCardProps();

        const stableAtom = useMemo(
                () => getExplicitCardSubtitleFamilyAdapterAtom(cardId),
                []
        );
        const { inputValue, setInputValue } = useJotaiDeferredUpdateAdapter({
                adapterAtom: stableAtom,
                cardId
        });

        return (
                <LikeSubtitleUI>
                        <input
                                data-testid={
                                        EP_TEST_IDS.card.explicitCardContent
                                                .subtitleInp
                                }
                                id={`subtitle-${cardId}`}
                                placeholder='subtitle'
                                className='heading-4 max-[540px]:w-full max-[540px]:field-sizing-fixed field-sizing-content'
                                value={inputValue}
                                onChange={getInputChangeCallback(setInputValue)}
                        />
                </LikeSubtitleUI>
        );
}
