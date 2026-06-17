'use client';

import LikeOptionUI, {
    OptionColorSchema
} from '@/src/components/general/interfacesUI/option';
import { useAtom, useAtomValue } from 'jotai';
import LikeExplanationUI from '@/src/components/general/interfacesUI/explanation';
import { getExplicitCardStoryCurrValFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { useMemo } from 'react';
import { usePlayModeProps } from '@/src/views/play/model/play-mode-props';
import { ExpCardStatus } from '@/src/components/play_page/CardsList/ExplicitCard/index';
import { PP_TEST_IDS } from '@/src/constants/testIds';
import { getNumOfCorrectOptions } from '@/src/jotai/historyAtoms';

export function Explanation({
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

function getOptionStatus({
    optionIndex,
    currCardChoice,
    isCorrect,
    showAnswersImmediately,
    isCompleted
}: {
    optionIndex: number;
    currCardChoice: number[];
    isCorrect: boolean;
    showAnswersImmediately: boolean;
    isCompleted: boolean;
}) {
    const isSelected = currCardChoice.includes(optionIndex);
    let color: OptionColorSchema = 'unchosen';
    const shouldShowAnswer = showAnswersImmediately || isCompleted;

    if (isCorrect && shouldShowAnswer) color = 'correct';
    else if (!isCorrect && isSelected && shouldShowAnswer) color = 'incorrect';

    return { isSelected, color };
}

export function NumOfCorrectAnswers({ cardId }: { cardId: string }) {
    const numOfCorrectOptionsStableAtom = useMemo(
        () => getNumOfCorrectOptions(cardId),
        []
    );
    const numOfCorrectOptions = useAtomValue(numOfCorrectOptionsStableAtom);

    return (
        <span className='span mr-auto'>{`Count of correct options: ${numOfCorrectOptions}`}</span>
    );
}

export function Option({
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
    // todo - refactor this component

    const { showAnswersImmediately, isCompleted } = usePlayModeProps();

    const stableAdapterAtom = useMemo(
        () => getExplicitCardStoryCurrValFamilyAdapterAtom(cardId),
        []
    );
    const numOfCorrectChoicesStableAtom = useMemo(
        () => getNumOfCorrectOptions(cardId),
        []
    );
    const [currCardChoice, setCurrCardChoice] = useAtom(stableAdapterAtom);
    const numOfCorrectChoices = useAtomValue(numOfCorrectChoicesStableAtom);

    const onOptionClick = () => {
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
    };

    const { isSelected, color } = getOptionStatus({
        optionIndex,
        currCardChoice,
        isCorrect,
        showAnswersImmediately,
        isCompleted
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
