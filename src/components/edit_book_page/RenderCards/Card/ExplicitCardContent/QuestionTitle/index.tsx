'use client';

import MainQuestionTitleUI from './UI';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { getExplicitCardTitleAtomAdapter } from '@/src/utils/jotai/mainDbAtomAdapters';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

export default function QuestionTitle() {
        const { cardId } = useCardProps();
        const stableAtom = useMemo(() => getExplicitCardTitleAtomAdapter(cardId), []);
        const [value, setValue] = useAtom(stableAtom);

        return (
                <MainQuestionTitleUI
                        cardId={cardId}
                        value={value}
                        onChange={getInputChangeCallback(setValue)}
                />
        );
}
