'use client';

import {
        Explanation,
        Option,
        Subtitle
} from '@/src/components/play_page/CardsList/ExplicitCard/client';
import { useAtomValue } from 'jotai';
import { explicitCardStoriesAtomFamily } from '@/src/jotai/mainAtoms';
import { useMemo } from 'react';
import { getIfExpStoryCardCorrectAtom } from '@/src/jotai/historyAtoms';
import { usePlayModeProps } from '@/app/play/page';
import { PP_TEST_IDS } from '@/src/constants/testIds';

export type ExpCardStatus = 'correct' | 'incorrect' | 'unchosen';

function useIfExpCardStoryCorrect(cardId: string): ExpCardStatus {
        const stableAtom = useMemo(
                () => getIfExpStoryCardCorrectAtom(cardId),
                []
        );
        const { isCompleted, showAnswersImmediately } = usePlayModeProps();
        const isCurrentChoiceCorrect = useAtomValue(stableAtom);

        if (!(showAnswersImmediately || isCompleted)) return 'unchosen';
        if (isCurrentChoiceCorrect) return 'correct';
        else return 'incorrect';
}

export default function ExplicitCard({ cardId }: { cardId: string }) {
        const { title, options, explanation, subtitle } = useAtomValue(
                explicitCardStoriesAtomFamily(cardId)
        );

        const expCardStatus = useIfExpCardStoryCorrect(cardId);

        return (
                <li
                        data-testid={PP_TEST_IDS.expCard.me}
                        data-status={expCardStatus}
                        className='questionCard items-center w-full data-[status=correct]:bg-green-100 data-[status=incorrect]:bg-red-100'>
                        <h3 className='heading-2'>{`'${title}'`}</h3>
                        <Subtitle subtitle={subtitle} />
                        <ul className='w-full flex flex-col gap-2'>
                                {options.map((option, i) => (
                                        <Option
                                                cardId={cardId}
                                                {...option}
                                                optionIndex={i}
                                                key={i}
                                        />
                                ))}
                        </ul>
                        <Explanation
                                explanation={explanation}
                                cardStatus={expCardStatus}
                        />
                </li>
        );
}
