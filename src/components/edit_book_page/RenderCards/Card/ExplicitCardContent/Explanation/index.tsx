'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getExplicitCardExplanationFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import LikeExplanationUI from '@/src/components/general/interfacesUI/explanation';
import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import { EP_TEST_IDS } from '@/src/constants/testIds';
import useJotaiDeferredUpdateAdapter from '@/src/hooks/jotaiRelated/jotaiDeferedInput';

export default function Explanation() {
        const textAreaRef = useRef<HTMLTextAreaElement>(null);
        const { cardId } = useCardProps();
        const [isVisible, setIsVisible] = useState(true);
        const stableAtom = useMemo(
                () => getExplicitCardExplanationFamilyAdapterAtom(cardId),
                [cardId]
        );
        const { inputValue, setInputValue, isDisabled } =
                useJotaiDeferredUpdateAdapter({
                        adapterAtom: stableAtom,
                        cardId
                });

        const onContainerClick = useCallback(() => {
                if (textAreaRef.current) {
                        setIsVisible(true);
                        textAreaRef.current.focus();
                }
        }, []);

        const onChange = getInputChangeCallback(setInputValue);

        const onTextareaBlur = useCallback(() => {
                if (inputValue.length === 0) {
                        setIsVisible(false);
                }
        }, [inputValue]);

        useEffect(() => {
                if (inputValue.length === 0) {
                        setIsVisible(false);
                } else {
                        setIsVisible(true);
                }
        }, [inputValue]);

        return (
                <LikeExplanationUI onContainerClick={onContainerClick}>
                        <ExtendableTextArea
                                disabled={isDisabled}
                                testId={
                                        EP_TEST_IDS.card.explicitCardContent
                                                .explanationInp
                                }
                                ref={textAreaRef}
                                onBlur={onTextareaBlur}
                                title='explicit-card-explanation'
                                placeholder=''
                                data-visible={isVisible}
                                value={inputValue}
                                onChange={onChange}
                                className='text-muted-foreground w-full duration-200'
                                id={`explanation-${cardId}`}></ExtendableTextArea>
                </LikeExplanationUI>
        );
}
