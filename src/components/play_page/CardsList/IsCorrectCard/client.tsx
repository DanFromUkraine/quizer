'use client';

import { useAtom, useAtomValue } from 'jotai';
import { isCorrectCardStoriesAtomFamily } from '@/src/jotai/mainAtoms';
import { useCallback, useMemo } from 'react';
import { getIsCorrectCardStoryCurrValFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { usePlayModeProps } from '@/app/play/page';

function useCurrVal(cardId: string) {
        const { showAnswersImmediately, isCompleted } = usePlayModeProps();
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

type CardStatus = 'correct' | 'incorrect' | 'unchosen';

export function useIsCorrectCardStatus(cardId: string): CardStatus {
        const { showAnswersImmediately, isCompleted } = usePlayModeProps();
        const { currentValue, isCorrect } = useAtomValue(
                isCorrectCardStoriesAtomFamily(cardId)
        );

        if (!(showAnswersImmediately || isCompleted)) return 'unchosen';
        if (currentValue === isCorrect) return 'correct';
        else return 'incorrect';
}

export function TermDefinitionTitle({ cardId }: { cardId: string }) {
        const { term, definition } = useAtomValue(
                isCorrectCardStoriesAtomFamily(cardId)
        );

        return (
                <div className='flex items-center gap-1 flex-wrap'>
                        <h2 className='heading-2'>{term} - </h2>
                        <h2 className='heading-2 !font-normal'>{definition}</h2>
                </div>
        );
}

export function OneBooleanButton({
        textContent,
        onClickAction,
        isSelected,
}: {
        textContent: string;
        onClickAction: () => void;
        isSelected: boolean;
}) {
        return (
                <button
                        type='button'
                        data-selected={isSelected}
                        onClick={onClickAction}
                        className=' data-[selected=true]:bg-gray-200 py-4 px-8 border hover:bg-gray-200 duration-100 border-gray-400 rounded-md heading-3'>
                        {textContent}
                </button>
        );
}

export function BooleanButtons({ cardId }: { cardId: string }) {
        const cardStatus = useIsCorrectCardStatus(cardId);
        const [currVal, setCurrVal] = useCurrVal(cardId);
        const setTrue = () => setCurrVal(true);
        const setFalse = () => setCurrVal(false);
        const { isCorrect } = useAtomValue(
                isCorrectCardStoriesAtomFamily(cardId)
        );

        return (
                <div className='flex gap-2'>
                        <OneBooleanButton
                                {...{
                                        textContent: 'True',
                                        onClickAction: setTrue,
                                        isSelected: Boolean(currVal)
                                }}
                        />
                        <OneBooleanButton
                                {...{
                                        textContent: 'False',
                                        onClickAction: setFalse,
                                        isSelected: currVal === false
                                }}
                        />
                </div>
        );
}
