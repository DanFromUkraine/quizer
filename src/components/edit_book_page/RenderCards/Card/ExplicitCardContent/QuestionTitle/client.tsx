'use client';
import { useMemo } from 'react';
import { getExplicitCardTitleAtomAdapter } from '@/src/utils/jotai/mainDbAtomAdapters';
import { useAtom } from 'jotai';
import MainQuestionTitleUI from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/QuestionTitle/UI';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';

export function MainQuestionTitle({ cardId }: { cardId: string }) {
        const stableAtom = useMemo(() => getExplicitCardTitleAtomAdapter(cardId), []);
        const [value, setValue] = useAtom(stableAtom);
        const onChange = (newVal: string) => setValue(newVal);

        return (
                <MainQuestionTitleUI
                        value={value}
                        onChange={getInputChangeCallback(onChange)}
                        cardId={cardId}
                />
        );
}

export function SubQuestionTitle({ cardId }: { cardId: string }) {
        const stableAtom = useMemo(() => )
}
