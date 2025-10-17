'use client';

import {
        Definition,
        RevealAnswerButton,
        TypeInCardStoryInput,
        useGetIsCorrect
} from '@/src/components/play_page/CardsList/TypeInCard/client';

export default function TypeInCard({ cardId }: { cardId: string }) {
        const isCorrect = useGetIsCorrect(cardId);

        console.debug('type in card render')

        return (
                <li
                        data-correct={isCorrect}
                        className=' questionCard w-full data-[correct=true]:!bg-green-100 data-[correct=false]:!bg-red-100'>
                        <Definition cardId={cardId} />
                        <TypeInCardStoryInput cardId={cardId} />
                        <RevealAnswerButton cardId={cardId} />
                </li>
        );
}
