'use client';

import { MouseEvent, useCallback, useMemo } from 'react';
import { getExplicitCardExplanationFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { useAtom } from 'jotai';
import LikeExplanationUI from '@/src/components/general/interfacesUI/explanation';
import ExtendableTextArea from '@/src/components/general/ExtendableInput';

export default function Explanation() {
        const { cardId } = useCardProps();
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
                        const lastChild =
                                target.lastChild as HTMLTextAreaElement;
                        if (lastChild) {
                                lastChild.focus();
                        }
                },
                []
        );

        const onChange = getInputChangeCallback(setValue);

        return (
                <LikeExplanationUI onContainerClick={onContainerClick}>
                        <ExtendableTextArea
                                value={value}
                                onChange={onChange}
                                className='text-muted-foreground w-full'
                                id={`explanation-${cardId}`}></ExtendableTextArea>
                </LikeExplanationUI>
        );
}
