'use client';

import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { getExplicitCardExplanationFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { useAtom } from 'jotai';
import LikeExplanationUI from '@/src/components/general/interfacesUI/explanation';
import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import { EP_TEST_IDS } from '@/src/constants/testIds';

export default function Explanation() {
        const { cardId } = useCardProps();
        const [isVisible, setIsVisible] = useState(true);
        const stableAtom = useMemo(
                () => getExplicitCardExplanationFamilyAdapterAtom(cardId),
                []
        );
        const [value, setValue] =
                useAtom(
                        stableAtom
                ); /* 'todo' change it with updateAdapter, when you have time*/

        const onContainerClick = useCallback(
                (event: MouseEvent<HTMLDivElement>) => {
                        const target = event.currentTarget;
                        const textarea = target.querySelector('textarea');

                        if (textarea) {
                                setIsVisible(true);
                                textarea.focus();
                        }
                },
                []
        );

        const onChange = getInputChangeCallback(setValue);

        const onTextareaBlur = useCallback(() => {
                if (value.length === 0) {
                        setIsVisible(false);
                }
        }, [value]);

        useEffect(() => {
                if (value.length === 0) {
                        setIsVisible(false);
                } else {
                        setIsVisible(true);
                }
        }, [value]);

        return (
                <LikeExplanationUI onContainerClick={onContainerClick}>
                        <ExtendableTextArea
                                testId={
                                        EP_TEST_IDS.card.explicitCardContent
                                                .explanationInp
                                }
                                onBlur={onTextareaBlur}
                                title='explicit-card-explanation'
                                placeholder=''
                                data-visible={isVisible}
                                value={value}
                                onChange={onChange}
                                className='text-muted-foreground w-full duration-200'
                                id={`explanation-${cardId}`}></ExtendableTextArea>
                </LikeExplanationUI>
        );
}
