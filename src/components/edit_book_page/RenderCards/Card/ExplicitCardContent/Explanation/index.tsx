'use client';

import ExplanationInputUI from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/Explanation/UI';
import { MouseEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { getExplicitCardExplanationAtomAdapter } from '@/src/utils/jotai/mainDbAtomAdapters';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import useJotaiDeferredInput from '@/src/hooks/jotaiRelated/jotaiDeferedInput';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';

export default function Explanation() {
        const { cardId } = useCardProps();
        const textareaRef = useRef<HTMLTextAreaElement>(null);
        const stableAtom = useMemo(
                () => getExplicitCardExplanationAtomAdapter(cardId),
                []
        );
        const [value, setValue] = useJotaiDeferredInput(stableAtom);

        const onContainerClick = useCallback(
                (event: MouseEvent<HTMLDivElement>) => {
                        const target = event.currentTarget;
                        const lastChild =
                                target.lastChild as HTMLTextAreaElement;
                        if (lastChild) {
                                lastChild.focus();
                        }
                },
                [textareaRef.current]
        );

        const onChange = getInputChangeCallback(setValue);

        useEffect(() => {
                const inputListener = (ev: Event) => {
                        const target = ev.target as HTMLTextAreaElement | null;
                        if (target) {
                                setValue(target.value);
                        }
                };

                document.addEventListener('input', inputListener);

                return () => {
                        document.removeEventListener('input', inputListener);
                };
        }, []);

        return (
                <ExplanationInputUI
                        {...{
                                textareaRef,
                                onContainerClick,
                                cardId,
                                value,
                                onChange
                        }}
                />
        );
}
