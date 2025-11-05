'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
        getTypeInCardStoryAnswerRevealedFamilyAdapterAtom,
        getTypeInCardStoryCurrValFamilyAdapterAtom
} from '@/src/utils/jotai/atomAdapters';
import { useAtom, useAtomValue } from 'jotai';
import { typeInCardStoriesAtomFamily } from '@/src/jotai/mainAtoms';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { usePlayModeProps } from '@/app/play/page';
import { PP_TEST_IDS } from '@/src/constants/testIds';

export function useRevealAnswer(cardId: string) {
        const answerRevealedAdapterAtom = useMemo(
                () => getTypeInCardStoryAnswerRevealedFamilyAdapterAtom(cardId),
                []
        );

        const [answerRevealed, setAnswerRevealed] = useAtom(
                answerRevealedAdapterAtom
        );

        const onRevealButtonClick = useCallback(() => {
                void setAnswerRevealed(true);
        }, []);

        return { answerRevealed, onRevealButtonClick };
}

export function useGetIsCorrect(cardId: string) {
        const { isCompleted } = usePlayModeProps();
        const { expectedInput, answerRevealed, currentValue } = useAtomValue(
                typeInCardStoriesAtomFamily(cardId)
        );
        const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

        useEffect(() => {
                if (answerRevealed || isCompleted) {
                        setIsCorrect(
                                expectedInput.toLowerCase().trim() ===
                                        currentValue.toLowerCase().trim()
                        );
                }
        }, [answerRevealed, expectedInput, currentValue, isCompleted]);

        return isCorrect;
}

export function useCurrVal(cardId: string) {
        const { isCompleted } = usePlayModeProps();
        const { answerRevealed } = useAtomValue(
                typeInCardStoriesAtomFamily(cardId)
        );

        const currentValueStableAdapterAtom = useMemo(
                () => getTypeInCardStoryCurrValFamilyAdapterAtom(cardId),
                []
        );

        const [currVal, setCurrVal_localOnly] = useAtom(
                currentValueStableAdapterAtom
        );

        const setCurrVal = useCallback(
                (newVal: string) => {
                        if (answerRevealed || isCompleted) return;
                        void setCurrVal_localOnly(newVal);
                },
                [answerRevealed, isCompleted]
        );

        return [currVal, setCurrVal] as const;
}

export function TypeInCardStoryInput({ cardId }: { cardId: string }) {
        const [currVal, setCurrVal] = useCurrVal(cardId);
        const onChange = getInputChangeCallback(setCurrVal);
        const isCorrect = useGetIsCorrect(cardId);
        const { expectedInput } = useAtomValue(
                typeInCardStoriesAtomFamily(cardId)
        );
        const inputRef = useRef<HTMLInputElement>(null);

        const onContainerClick = () => {
                if (inputRef.current) {
                        inputRef.current.focus();
                }
        };

        return (
                <div
                        className='flex items-center gap-2 w-full border border-gray-400 rounded-md p-4 has-[:focus]:border-2'
                        onClick={onContainerClick}>
                        <input
                                ref={inputRef}
                                name='play-typeInCard'
                                data-correct={isCorrect}
                                data-testid={PP_TEST_IDS.typeInCard.termInput}
                                placeholder='enter definition'
                                className='data-[correct=false]:!line-through field-sizing-content'
                                value={currVal}
                                onChange={onChange}
                        />
                        {typeof expectedInput === 'string' &&
                                isCorrect === false && (
                                        <span
                                                data-testid={
                                                        PP_TEST_IDS.typeInCard
                                                                .expectedValue
                                                }>
                                                {expectedInput}
                                        </span>
                                )}
                </div>
        );
}

export function RevealAnswerButton({ cardId }: { cardId: string }) {
        const { showAnswersImmediately } = usePlayModeProps();
        const { onRevealButtonClick } = useRevealAnswer(cardId);
        return (
                showAnswersImmediately && (
                        <button
                                data-testid={
                                        PP_TEST_IDS.typeInCard
                                                .revealAnswerButton
                                }
                                onClick={onRevealButtonClick}
                                className='bg-blue-500 rounded-md px-3 py-1.5 text-white hover:bg-blue-300 duration-100 ml-auto'>
                                Show if correct
                        </button>
                )
        );
}

export function Definition({ cardId }: { cardId: string }) {
        const { definition } = useAtomValue(
                typeInCardStoriesAtomFamily(cardId)
        );
        return (
                <h3
                        data-testid={PP_TEST_IDS.typeInCard.definition}
                        className='heading-2 mx-auto'>{`'${definition}'`}</h3>
        );
}
