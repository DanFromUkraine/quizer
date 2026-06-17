'use client';

import { PP_TEST_IDS } from '@/src/constants/testIds';
import { getNumOfCorrectOptions } from '@/src/jotai/historyAtoms';
import { explicitCardStoriesAtomFamily } from '@/src/jotai/mainAtoms';
import type { ExpCardStatus } from '@/src/views/play/model/CardsList/hooks';
import {
    useExplicitCardOption,
    useExplicitCardStatus
} from '@/src/views/play/model/CardsList/hooks';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import clsx from 'clsx';
import IndexMarker from '@/src/shared/ui/IndexMarker';

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
        <section className='bg-muted flex w-full flex-col gap-2 rounded-lg p-3.5'>
            <h4 className='font-medium'>Explanation</h4>
            <div className='text-muted-foreground w-full overflow-hidden *:w-full has-[>[data-visible=false]]:h-0'>
                <p data-testid={PP_TEST_IDS.expCard.explanation}>
                    {explanation}
                </p>
            </div>
        </section>
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
        <div
            data-testid={PP_TEST_IDS.expCard.option.me}
            onClick={onOptionClick}
            data-selected={isSelected}
            className={clsx(
                'flex w-full items-center gap-2 rounded-md border p-4 duration-100',
                {
                    'border-gray-400 hover:bg-gray-300 data-[selected=true]:bg-gray-300':
                        color === 'unchosen',
                    'border-red-300 bg-white text-red-800 ring-1 ring-red-100':
                        color === 'incorrect',
                    'border-green-700 bg-green-300': color === 'correct'
                }
            )}>
            <IndexMarker
                index={optionIndex}
                className={clsx({
                    'bg-red-100 text-red-700': color === 'incorrect',
                    'bg-green-100 text-green-700': color === 'correct'
                })}
            />
            <span
                data-testid={PP_TEST_IDS.expCard.option.title}
                className='flex-1'>
                {title}
            </span>
        </div>
    );
}
