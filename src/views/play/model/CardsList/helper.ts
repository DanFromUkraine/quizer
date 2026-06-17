import type { OptionColorSchema } from '@/src/components/general/interfacesUI/option';

export function getOptionStatus({
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
