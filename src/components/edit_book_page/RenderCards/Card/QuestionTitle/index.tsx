'use client';

import QuestionTitleUI from './UI';
import useJotaiDeferredInput from '@/src/hooks/jotai/jotaiDeferedInput';
import { cardTitleAtomAdapter } from '@/src/jotai/mainDbAtom';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';

export default function QuestionTitle() {
        const { cardId } = useCardProps();
        const [value, setValue] = useJotaiDeferredInput(
                cardTitleAtomAdapter,
                cardId
        );

        return (
                <QuestionTitleUI
                        cardId={cardId}
                        defaultValue={value}
                        onChange={getInputChangeCallback(setValue)}
                />
        );
}
