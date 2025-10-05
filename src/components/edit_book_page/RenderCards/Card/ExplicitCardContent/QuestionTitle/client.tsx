'use client';
import { useMemo } from 'react';
import {
        getExplicitCardSubtitleAtomAdapter,
        getExplicitCardTitleAtomAdapter
} from '@/src/utils/jotai/mainDbAtomAdapters';
import MainQuestionTitleUI, {
        SubtitleUI
} from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/QuestionTitle/UI';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import useJotaiDeferredInput from '@/src/hooks/jotaiRelated/jotaiDeferedInput';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';

export function MainQuestionTitle() {
        const { cardId } = useCardProps();
        const stableAtom = useMemo(
                () => getExplicitCardTitleAtomAdapter(cardId),
                []
        );
        const [value, setValue] = useJotaiDeferredInput(stableAtom);
        const onChange = getInputChangeCallback((newVal: string) =>
                setValue(newVal)
        );

        return <MainQuestionTitleUI {...{ value, onChange, cardId }} />;
}

export function SubQuestionTitle() {
        const { cardId } = useCardProps();

        const stableAtom = useMemo(
                () => getExplicitCardSubtitleAtomAdapter(cardId),
                []
        );
        const [value, setValue] = useJotaiDeferredInput(stableAtom);
        const onChange = getInputChangeCallback((newVal) => setValue(newVal));

        return <SubtitleUI {...{ value, onChange, cardId }} />;
}
