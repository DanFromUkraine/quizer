'use client';

import LikeOptionUI, {
        OptionColorSchema
} from '@/src/components/general/interfacesUI/option';
import { useAtom } from 'jotai';
import LikeSubtitleUI from '@/src/components/general/interfacesUI/subtitle';
import LikeExplanationUI from '@/src/components/general/interfacesUI/explanation';
import { getExplicitCardStoryCurrValFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { useMemo } from 'react';
import { usePlayModeProps } from '@/app/play/page';
import { ExpCardStatus } from '@/src/components/play_page/CardsList/ExplicitCard/index';

export function Subtitle({ subtitle }: { subtitle: string }) {
        return subtitle.length > 0 ? (
                <LikeSubtitleUI>
                        <h4>{subtitle}</h4>
                </LikeSubtitleUI>
        ) : (
                <></>
        );
}

export function Explanation({
        explanation,
        cardStatus
}: {
        explanation: string;
        cardStatus: ExpCardStatus;
}) {
        return explanation.length > 0 && cardStatus !== 'unchosen' ? (
                <LikeExplanationUI>{explanation}</LikeExplanationUI>
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
        currCardChoice: number | null;
        isCorrect: boolean;
        showAnswersImmediately: boolean;
        isCompleted: boolean;
}) {
        const isSelected = optionIndex === currCardChoice;
        let color: OptionColorSchema = 'unchosen';

        if (isCorrect && (showAnswersImmediately || isCompleted))
                color = 'correct';

        return { isSelected, color };
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
        const { showAnswersImmediately, isCompleted } = usePlayModeProps();
        const stableAdapterAtom = useMemo(
                () => getExplicitCardStoryCurrValFamilyAdapterAtom(cardId),
                []
        );
        const [currCardChoice, setCurrCardChoice] = useAtom(stableAdapterAtom);

        const onOptionClick = () => {
                if ((showAnswersImmediately && currCardChoice) || isCompleted)
                        return;
                setCurrCardChoice(optionIndex);
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
