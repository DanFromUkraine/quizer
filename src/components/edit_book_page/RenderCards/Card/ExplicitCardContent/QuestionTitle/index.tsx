'use client';

import QuestionTitleUI from './UI';
import useJotaiDeferredInput from '@/src/hooks/jotaiRelated/jotaiDeferedInput';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { cardTitleAtomAdapter } from '@/src/utils/jotai/mainDbAtomAdapters';

export default function QuestionTitle() {
        const { cardId } = useCardProps();
        const [value, setValue] = useJotaiDeferredInput(
                cardTitleAtomAdapter,
                cardId
        );

        return (
                <QuestionTitleUI
                        cardId={cardId}
                        value={value}
                        onChange={getInputChangeCallback(setValue)}
                />
        );
}
