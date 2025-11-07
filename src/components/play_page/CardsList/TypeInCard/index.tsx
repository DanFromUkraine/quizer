'use client';

import {
        Definition,
        RevealAnswerButton,
        TypeInCardStoryInput,
        useGetIsCorrect
} from '@/src/components/play_page/CardsList/TypeInCard/client';
import { PP_TEST_IDS } from '@/src/constants/testIds';

export default function TypeInCard({ cardId }: { cardId: string }) {
        const isCorrect = useGetIsCorrect(cardId);

        return (
                <li
                        data-testid={PP_TEST_IDS.typeInCard.me}
                        data-correct={isCorrect}
                        className=' questionCard w-full data-[correct=true]:!bg-green-100 data-[correct=false]:!bg-red-100'>
                        <Definition cardId={cardId} />
                        <TypeInCardStoryInput cardId={cardId} />
                        <RevealAnswerButton cardId={cardId} />
                </li>
        );
}
