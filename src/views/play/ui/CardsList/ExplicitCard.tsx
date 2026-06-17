'use client';

import LikeExplanationUI from '@/src/components/general/interfacesUI/explanation';
import LikeOptionUI from '@/src/components/general/interfacesUI/option';
import { PP_TEST_IDS } from '@/src/constants/testIds';
import { getNumOfCorrectOptions } from '@/src/jotai/historyAtoms';
import { explicitCardStoriesAtomFamily } from '@/src/jotai/mainAtoms';
import {
    useExplicitCardOption,
    useExplicitCardStatus
} from '@/src/views/play/model/CardsList/hooks';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import type { ExpCardStatus } from '@/src/views/play/model/CardsList/hooks';

export default function ExplicitCard({ cardId }: { cardId: string }) {
    const { title, options, explanation } = useAtomValue(
        explicitCardStoriesAtomFamily(cardId)
    );

    const expCardStatus = useExplicitCardStatus(cardId);

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

function Explanation({
    explanation,
    cardStatus
}: {
    explanation: string;
    cardStatus: ExpCardStatus;
}) {
    return explanation.length > 0 && cardStatus !== 'unchosen' ? (
        <LikeExplanationUI>
            <p data-testid={PP_TEST_IDS.expCard.explanation}>{explanation}</p>
        </LikeExplanationUI>
    ) : (
        <></>
    );
}

function NumOfCorrectAnswers({ cardId }: { cardId: string }) {
    const numOfCorrectOptionsStableAtom = useMemo(
        () => getNumOfCorrectOptions(cardId),
        []
    );
    const numOfCorrectOptions = useAtomValue(numOfCorrectOptionsStableAtom);

    return (
        <span className='span mr-auto'>{`Count of correct options: ${numOfCorrectOptions}`}</span>
    );
}

function Option({
    optionIndex,
    title,
    cardId,
    isCorrect
}: {
    optionIndex: number;
    title: string;
    cardId: string;
    isCorrect: boolean;
}) {
    const { isSelected, color, onOptionClick } = useExplicitCardOption({
        cardId,
        optionIndex,
        isCorrect
    });

    return (
        <LikeOptionUI
            {...{
                title,
                onClick: onOptionClick,
                color,
                isSelected,
                optionIndex
            }}
        />
    );
}
