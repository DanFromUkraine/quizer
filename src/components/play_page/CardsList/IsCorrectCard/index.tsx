'use client';

import { useCallback, useMemo } from 'react';
import { getIsCorrectCardStoryCurrValFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { useAtom, useAtomValue } from 'jotai';
import { isCorrectCardStoriesAtomFamily } from '@/src/jotai/mainAtoms';
import { usePlayModeProps } from '@/src/components/play_page/CardsList';

type CardStatus = 'correct' | 'incorrect' | 'unchosen';

function useCurrVal({
        cardId,
        showAnswersImmediately
}: {
        cardId: string;
        showAnswersImmediately: boolean;
}) {
        const currValAdapterAtom = useMemo(
                () => getIsCorrectCardStoryCurrValFamilyAdapterAtom(cardId),
                []
        );
        const [currVal, setCurrVal_localOnly] = useAtom(currValAdapterAtom);

        const setCurrVal = useCallback(
                (newVal: boolean) => {
                        if (showAnswersImmediately && currVal !== null) return;
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
        const { showAnswersImmediately } = usePlayModeProps();
        const { definition, isCorrect, term } = useAtomValue(
                isCorrectCardStoriesAtomFamily(cardId)
        );

        const [currVal, setCurrVal] = useCurrVal({
                cardId,
                showAnswersImmediately
        });

        const setTrue = () => setCurrVal(true);
        const setFalse = () => setCurrVal(false);

        let cardStatus: CardStatus = 'unchosen';


        return (
                <div
                        data-status={cardStatus}
                        className='flex flex-col gap-2 data-[iscorrect=correct]:bg-green-200 border border-gray-500 rounded-xl p-4'>
                        <p>
                                <b>{term}</b> - {definition}
                        </p>
                        <div>
                                <button
                                       
                                        type='button'
                                        onClick={setTrue}
                                        className='data-[status=correct]:bg-green-500 '>
                                        True
                                </button>
                                <button

                                        type='button'
                                        onClick={setFalse}
                                        className='data-[status=correct]:bg-green-500'>
                                        False
                                </button>
                        </div>
                </div>
        );
}
