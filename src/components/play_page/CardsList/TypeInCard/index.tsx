'use client';

import Quoted from '@/src/components/general/Quoted';
import { useAtom, useAtomValue } from 'jotai';
import { typeInCardStoriesAtomFamily } from '@/src/jotai/mainAtoms';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
        getTypeInCardStoryAnswerRevealedFamilyAdapterAtom,
        getTypeInCardStoryCurrValFamilyAdapterAtom
} from '@/src/utils/jotai/atomAdapters';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { usePlayModeProps } from '@/src/components/play_page/CardsList';

function useRevealAnswer(cardId: string) {
        const answerRevealedAdapterAtom = useMemo(
                () => getTypeInCardStoryAnswerRevealedFamilyAdapterAtom(cardId),
                []
        );

        const [answerRevealed, setAnswerRevealed] = useAtom(
                answerRevealedAdapterAtom
        );

        const onRevealButtonClick = useCallback(() => {
                setAnswerRevealed(true);
        }, []);

        return { answerRevealed, onRevealButtonClick };
}

function useGetIsCorrect({
        answerRevealed,
        expectedInput,
        actualInput
}: {
        answerRevealed: boolean;
        expectedInput: string;
        actualInput: string;
}) {
        const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

        useEffect(() => {
                if (answerRevealed) {
                        setIsCorrect(
                                expectedInput.toLowerCase() ===
                                        actualInput.toLowerCase()
                        );
                }
        }, [answerRevealed, expectedInput, actualInput]);

        return isCorrect;
}

function useCurrVal({
        cardId,
        answerRevealed
}: {
        cardId: string;
        answerRevealed: boolean;
}) {
        const currentValueAdapterAtom = useMemo(
                () => getTypeInCardStoryCurrValFamilyAdapterAtom(cardId),
                []
        );
        const [currVal, setCurrVal_localOnly] = useAtom(
                currentValueAdapterAtom
        );

        const setCurrVal = useCallback((newVal: string) => {
                if (!answerRevealed) setCurrVal_localOnly(newVal);
        }, []);

        return [currVal, setCurrVal] as const;
}

export default function TypeInCard({ cardId }: { cardId: string }) {
        const { showAnswersImmediately } = usePlayModeProps();
        const { definition, expectedInput } = useAtomValue(
                typeInCardStoriesAtomFamily(cardId)
        );

        const { answerRevealed, onRevealButtonClick } = useRevealAnswer(cardId);
        const [currVal, setCurrVal] = useCurrVal({ cardId, answerRevealed });
        const isCorrect = useGetIsCorrect({
                answerRevealed,
                expectedInput,
                actualInput: currVal
        });

        const onChange = getInputChangeCallback(setCurrVal);

        return (
                <li
                        data-correct={isCorrect}
                        className='flex flex-col w-full border border-gray-500 rounded-xl p-4 data-[correct=true]:!bg-green-200 data-[correct=false]:!bg-red-200'>
                        <Quoted variant='heading'>
                                <h3 className='h3'>{definition}</h3>
                        </Quoted>
                        <input
                                className='w-full border border-gray-400 rounded-xl p-4'
                                value={currVal}
                                onChange={onChange}
                        />
                        {showAnswersImmediately && (
                                <button
                                        onClick={onRevealButtonClick}
                                        className='bg-blue-500 rounded-md px-3 py-1.5 text-white hover:bg-blue-300 duration-100 ml-auto'>
                                        Show if correct
                                </button>
                        )}
                </li>
        );
}
