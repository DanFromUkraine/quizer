'use client';

import { useAtom, useAtomValue } from 'jotai';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    getIfExpStoryCardCorrectAtom,
    getNumOfCorrectOptions
} from '@/src/jotai/historyAtoms';
import {
    isCorrectCardStoriesAtomFamily,
    typeInCardStoriesAtomFamily
} from '@/src/jotai/mainAtoms';
import {
    getExplicitCardStoryCurrValFamilyAdapterAtom,
    getIsCorrectCardStoryCurrValFamilyAdapterAtom,
    getTypeInCardStoryAnswerRevealedFamilyAdapterAtom,
    getTypeInCardStoryCurrValFamilyAdapterAtom
} from '@/src/utils/jotai/atomAdapters';
import { usePlayModeProps } from '@/src/views/play/model/play-mode-props';
import { getOptionStatus } from './helper';

export type CardStatus = 'correct' | 'incorrect' | 'unchosen';
export type ExpCardStatus = CardStatus;

export function useExplicitCardStatus(cardId: string): ExpCardStatus {
    const stableAtom = useMemo(
        () => getIfExpStoryCardCorrectAtom(cardId),
        [cardId]
    );
    const { isCompleted, showAnswersImmediately } = usePlayModeProps();
    const isCurrentChoiceCorrect = useAtomValue(stableAtom);

    if (!(showAnswersImmediately || isCompleted)) return 'unchosen';
    if (isCurrentChoiceCorrect) return 'correct';
    else return 'incorrect';
}

export function useExplicitCardOption({
    cardId,
    optionIndex,
    isCorrect
}: {
    cardId: string;
    optionIndex: number;
    isCorrect: boolean;
}) {
    const { showAnswersImmediately, isCompleted } = usePlayModeProps();

    const stableAdapterAtom = useMemo(
        () => getExplicitCardStoryCurrValFamilyAdapterAtom(cardId),
        [cardId]
    );
    const numOfCorrectChoicesStableAtom = useMemo(
        () => getNumOfCorrectOptions(cardId),
        [cardId]
    );
    const [currCardChoice, setCurrCardChoice] = useAtom(stableAdapterAtom);
    const numOfCorrectChoices = useAtomValue(numOfCorrectChoicesStableAtom);

    const onOptionClick = useCallback(() => {
        if ((showAnswersImmediately && currCardChoice) || isCompleted) return;

        if (currCardChoice.length === numOfCorrectChoices) {
            const newChoices = [...currCardChoice.slice(-1), optionIndex];

            void setCurrCardChoice(newChoices);

            return;
        }

        if (currCardChoice.includes(optionIndex)) {
            void setCurrCardChoice(
                currCardChoice.filter((i) => i !== optionIndex)
            );
        } else {
            void setCurrCardChoice([...currCardChoice, optionIndex]);
        }
    }, [
        currCardChoice,
        isCompleted,
        numOfCorrectChoices,
        optionIndex,
        setCurrCardChoice,
        showAnswersImmediately
    ]);

    const { isSelected, color } = getOptionStatus({
        optionIndex,
        currCardChoice,
        isCorrect,
        showAnswersImmediately,
        isCompleted
    });

    return { isSelected, color, onOptionClick };
}

export function useIsCorrectCardCurrVal(cardId: string) {
    const { showAnswersImmediately, isCompleted } = usePlayModeProps();
    const currValAdapterAtom = useMemo(
        () => getIsCorrectCardStoryCurrValFamilyAdapterAtom(cardId),
        [cardId]
    );
    const [currVal, setCurrVal_localOnly] = useAtom(currValAdapterAtom);

    const setCurrVal = useCallback(
        (newVal: boolean) => {
            if ((showAnswersImmediately && currVal !== null) || isCompleted)
                return;
            void setCurrVal_localOnly(newVal);
        },
        [currVal, isCompleted, setCurrVal_localOnly, showAnswersImmediately]
    );

    return [currVal, setCurrVal] as const;
}

export function useIsCorrectCardStatus(cardId: string): CardStatus {
    const { showAnswersImmediately, isCompleted } = usePlayModeProps();
    const { currentValue, isCorrect } = useAtomValue(
        isCorrectCardStoriesAtomFamily(cardId)
    );

    if (!(showAnswersImmediately || isCompleted)) return 'unchosen';
    if (currentValue === isCorrect) return 'correct';
    else return 'incorrect';
}

export function useTypeInCardAnswerReveal(cardId: string) {
    const answerRevealedAdapterAtom = useMemo(
        () => getTypeInCardStoryAnswerRevealedFamilyAdapterAtom(cardId),
        [cardId]
    );

    const [answerRevealed, setAnswerRevealed] = useAtom(
        answerRevealedAdapterAtom
    );

    const onRevealButtonClick = useCallback(() => {
        void setAnswerRevealed(true);
    }, [setAnswerRevealed]);

    return { answerRevealed, onRevealButtonClick };
}

export function useTypeInCardIsCorrect(cardId: string) {
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

export function useTypeInCardCurrVal(cardId: string) {
    const { isCompleted } = usePlayModeProps();
    const { answerRevealed } = useAtomValue(
        typeInCardStoriesAtomFamily(cardId)
    );

    const currentValueStableAdapterAtom = useMemo(
        () => getTypeInCardStoryCurrValFamilyAdapterAtom(cardId),
        [cardId]
    );

    const [currVal, setCurrVal_localOnly] = useAtom(
        currentValueStableAdapterAtom
    );

    const setCurrVal = useCallback(
        (newVal: string) => {
            if (answerRevealed || isCompleted) return;
            void setCurrVal_localOnly(newVal);
        },
        [answerRevealed, isCompleted, setCurrVal_localOnly]
    );

    return [currVal, setCurrVal] as const;
}
