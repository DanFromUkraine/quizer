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
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import { useAtom } from 'jotai';

export function MainQuestionTitle() {
        const { cardId } = useCardProps();
        const stableAtom = useMemo(
                () => getExplicitCardTitleAtomAdapter(cardId),
                []
        );
        const [value, setValue] =
                useAtom(
                        stableAtom
                ); /* 'todo' change it with updateAdapter, when you have time*/
        const onChange = getInputChangeCallback(setValue);

        return <MainQuestionTitleUI {...{ value, onChange, cardId }} />;
}

export function SubQuestionTitle() {
        const { cardId } = useCardProps();

        const stableAtom = useMemo(
                () => getExplicitCardSubtitleAtomAdapter(cardId),
                []
        );
        const [value, setValue] =
                useAtom(
                        stableAtom
                ); /* 'todo' change it with updateAdapter, when you have time*/
        const onChange = getInputChangeCallback((newVal) => setValue(newVal));

        return <SubtitleUI {...{ value, onChange, cardId }} />;
}
