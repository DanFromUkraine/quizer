'use client';

import { useCallback, useMemo } from 'react';
import { getIsCorrectCardStoryCurrValFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { useAtom, useAtomValue } from 'jotai';
import { isCorrectCardStoriesAtomFamily } from '@/src/jotai/mainAtoms';
import { usePlayModeProps } from '@/src/components/play_page/CardsList';

type CardStatus = 'correct' | 'incorrect' | 'unchosen';

function useCurrVal({
        cardId,
        showAnswersImmediately,
        isCompleted
}: {
        cardId: string;
        showAnswersImmediately: boolean;
        isCompleted: boolean;
}) {
        const currValAdapterAtom = useMemo(
                () => getIsCorrectCardStoryCurrValFamilyAdapterAtom(cardId),
                []
        );
        const [currVal, setCurrVal_localOnly] = useAtom(currValAdapterAtom);

        const setCurrVal = useCallback(
                (newVal: boolean) => {
                        if (
                                (showAnswersImmediately && currVal !== null) ||
                                isCompleted
                        )
                                return;
                        setCurrVal_localOnly(newVal);
                },
                [currVal, showAnswersImmediately]
        );

        return [currVal, setCurrVal] as const;
}

function useIsCorrectCardStatus({
        currVal,
        isCorrect,
        showAnswersImmediately
}: {
        currVal: boolean | null;
        isCorrect: boolean;
        showAnswersImmediately: boolean;
}): CardStatus {
        if (showAnswersImmediately && currVal === isCorrect) return 'correct';
        if (showAnswersImmediately && currVal !== isCorrect) return 'incorrect';

        return 'unchosen';
}

export default function IsCorrectCard({ cardId }: { cardId: string }) {
        const { showAnswersImmediately, isCompleted } = usePlayModeProps();
        const { definition, isCorrect, term } = useAtomValue(
                isCorrectCardStoriesAtomFamily(cardId)
        );

        const [currVal, setCurrVal] = useCurrVal({
                cardId,
                showAnswersImmediately,
                isCompleted
        });

        const setTrue = () => setCurrVal(true);
        const setFalse = () => setCurrVal(false);

        let cardStatus: CardStatus = 'unchosen';

        return (
                <div data-status={cardStatus} className='questionCard'>
                        <div className='flex items-center gap-1'>
                                <h2 className='heading-2'>{term} - </h2>
                                <h2 className='heading-2 !font-normal'>
                                        {definition}
                                </h2>
                        </div>
                        <div className='flex gap-2'>
                                <button
                                        type='button'
                                        data-selected={currVal}
                                        onClick={setTrue}
                                        className='data-[status=correct]:bg-green-500 data-[selected=true]:bg-gray-200 py-4 px-8 border hover:bg-gray-200 duration-100 border-gray-400 rounded-md heading-3'>
                                        True
                                </button>
                                <button
                                        type='button'
                                        data-selected={currVal === false}
                                        onClick={setFalse}
                                        className='data-[status=correct]:bg-green-500 data-[selected=true]:bg-gray-200 py-4 px-8 border hover:bg-gray-200 duration-100 border-gray-400 rounded-md heading-3'>
                                        False
                                </button>
                        </div>
                </div>
        );
}
