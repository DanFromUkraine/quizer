'use client';

import LikeOptionUI from '@/src/components/general/interfacesUI/option';
import { getChoiceInfoAtom, selectOptionAtom } from '@/src/jotai/historyAtoms';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import LikeSubtitleUI from '@/src/components/general/interfacesUI/subtitle';
import LikeExplanationUI from '@/src/components/general/interfacesUI/explanation';

export function Subtitle({ subtitle }: { subtitle: string }) {
        return subtitle.length > 0 ? (
                <LikeSubtitleUI>
                        <h4>{subtitle}</h4>
                </LikeSubtitleUI>
        ) : (
                <></>
        );
}

export function Explanation({ explanation }: { explanation: string }) {
        return explanation.length > 0 ? (
                <LikeExplanationUI>{explanation}</LikeExplanationUI>
        ) : (
                <></>
        );
}

export default function Option({
        optionIndex,
        cardIndex,
        title
}: {
        optionIndex: number;
        cardIndex: number;
        title: string;
}) {
        const choiceInfo = useAtomValue(getChoiceInfoAtom(cardIndex));
        const isSelected = choiceInfo === optionIndex;
        const updateChoice = useAtomCallback((get, set) => {
                set(selectOptionAtom, { optionIndex, cardIndex });
        });

        return (
                <LikeOptionUI
                        {...{
                                title,
                                onClick: updateChoice,
                                color: 'gray',
                                isSelected,
                                optionIndex
                        }}
                />
        );
}
