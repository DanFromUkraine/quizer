'use client';

import {
    Explanation,
    NumOfCorrectAnswers,
    Option
} from '@/src/components/play_page/CardsList/ExplicitCard/client';
import { useAtomValue } from 'jotai';
import { explicitCardStoriesAtomFamily } from '@/src/jotai/mainAtoms';
import { useMemo } from 'react';
import { getIfExpStoryCardCorrectAtom } from '@/src/jotai/historyAtoms';
import { usePlayModeProps } from '@/src/pages/play/model/play-mode-props';
import { PP_TEST_IDS } from '@/src/constants/testIds';

export type ExpCardStatus = 'correct' | 'incorrect' | 'unchosen';

function useIfExpCardStoryCorrect(cardId: string): ExpCardStatus {
    const stableAtom = useMemo(() => getIfExpStoryCardCorrectAtom(cardId), []);
    const { isCompleted, showAnswersImmediately } = usePlayModeProps();
    const isCurrentChoiceCorrect = useAtomValue(stableAtom);

    if (!(showAnswersImmediately || isCompleted)) return 'unchosen';
    if (isCurrentChoiceCorrect) return 'correct';
    else return 'incorrect';
}

export default function ExplicitCard({ cardId }: { cardId: string }) {
    const { title, options, explanation } = useAtomValue(
        explicitCardStoriesAtomFamily(cardId)
    );

    const expCardStatus = useIfExpCardStoryCorrect(cardId);

    return (
        <li
            data-testid={PP_TEST_IDS.expCard.me}
            data-status={expCardStatus}
            className='questionCard w-full items-center data-[status=correct]:border-green-200 data-[status=correct]:bg-green-50 data-[status=incorrect]:border-red-200'>
            <h3
                data-testid={PP_TEST_IDS.expCard.title}
                className='heading-2'>{`'${title}'`}</h3>
            <NumOfCorrectAnswers cardId={cardId} />
            <ul className='flex w-full flex-col gap-2'>
                {options.map((option, i) => (
                    <Option
                        cardId={cardId}
                        {...option}
                        optionIndex={i}
                        key={i}
                    />
                ))}
            </ul>
            <Explanation explanation={explanation} cardStatus={expCardStatus} />
        </li>
    );
}
