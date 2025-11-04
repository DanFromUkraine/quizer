'use client';
import { useMemo } from 'react';
import {
        getExplicitCardSubtitleFamilyAdapterAtom,
        getExplicitCardTitleFamilyAdapterAtom
} from '@/src/utils/jotai/atomAdapters';
import MainQuestionTitleUI from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/QuestionTitle/UI';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import { useAtom } from 'jotai';
import LikeSubtitleUI from '@/src/components/general/interfacesUI/subtitle';
import { EP_TEST_IDS } from '@/src/constants/testIds';
import useJotaiDeferredUpdateAdapter from '@/src/hooks/jotaiRelated/jotaiDeferedInput';

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
        const [value, setValue] =
                useAtom(
                        stableAtom
                ); /* 'todo' change it with updateAdapter, when you have time*/
        const onChange = getInputChangeCallback((newVal) => setValue(newVal));

        return (
                <LikeSubtitleUI>
                        <input
                                data-testid={
                                        EP_TEST_IDS.card.explicitCardContent
                                                .subtitleInp
                                }
                                value={value}
                                onChange={onChange}
                                id={`subtitle-${cardId}`}
                                placeholder='subtitle'
                                className='heading-4 max-[540px]:w-full max-[540px]:field-sizing-fixed field-sizing-content '
                        />
                </LikeSubtitleUI>
        );
}
