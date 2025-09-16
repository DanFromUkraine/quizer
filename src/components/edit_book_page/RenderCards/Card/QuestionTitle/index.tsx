'use client';

import QuestionTitleUI from './UI';
import useJotaiDeferredInput from '@/src/hooks/jotai/jotaiDeferedInput';
import { cardTitleAtomAdapter } from '@/src/jotai/mainDbAtom';
import { ChangeEventHandler } from 'react';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';

export default function QuestionTitle() {
        const { cardId } = useCardProps();
        const [value, setValue] = useJotaiDeferredInput(
                cardTitleAtomAdapter,
                cardId
        );
        const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
                const value = e.target.value;
                if (!value) return;
                setValue(value);
        };

        return (
                <QuestionTitleUI
                        cardId={cardId}
                        defaultValue={value}
                        onChange={onChange}
                />
        );
}
