'use client';

import ExplanationInputUI from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/Explanation/UI';
import { MouseEvent, useCallback, useMemo } from 'react';
import { getExplicitCardExplanationFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { useAtom } from 'jotai';

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
                <ExplanationInputUI
                        {...{
                                onContainerClick,
                                cardId,
                                value,
                                onChange
                        }}
                />
        );
}
