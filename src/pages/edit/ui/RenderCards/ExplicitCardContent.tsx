import { useMemo } from 'react';
import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import useJotaiDeferredUpdateAdapter from '@/src/hooks/jotaiRelated/jotaiDeferedInput';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import {
    getExplicitCardExplanationFamilyAdapterAtom,
    getExplicitCardTitleFamilyAdapterAtom
} from '@/src/utils/jotai/atomAdapters';
import { EP_TEST_IDS } from '@/src/constants/testIds';
import { useCardProps } from './Card';
import RenderOptions from './RenderOptions';

export default function ExplicitCardContent() {
    return (
        <section
            data-testid={EP_TEST_IDS.card.explicitCardContent.me}
            className='flex flex-col gap-2'>
            <QuestionTitle />
            <RenderOptions />
            <Explanation />
        </section>
    );
}

function QuestionTitle() {
    const { cardId } = useCardProps();
    const stableAtom = useMemo(
        () => getExplicitCardTitleFamilyAdapterAtom(cardId),
        [cardId]
    );
    const { inputValue, setInputValue, isDisabled } =
        useJotaiDeferredUpdateAdapter({
            adapterAtom: stableAtom,
            cardId
        });

    return (
        <section className='flex w-full flex-col'>
            <ExtendableTextArea
                testId={EP_TEST_IDS.card.explicitCardContent.titleInp}
                value={inputValue}
                name={`card-title-${cardId}`}
                placeholder='Question'
                onChange={getInputChangeCallback(setInputValue)}
                className='min-h-[72px] w-full rounded-[10px]! border-[#dfe3ea]! bg-[#fafbfc]! p-3.5! text-[#222] invalid:bg-red-100'
                required
                disabled={isDisabled}
            />
        </section>
    );
}

function Explanation() {
    const { cardId } = useCardProps();
    const stableAtom = useMemo(
        () => getExplicitCardExplanationFamilyAdapterAtom(cardId),
        [cardId]
    );
    const { inputValue, setInputValue, isDisabled } =
        useJotaiDeferredUpdateAdapter({
            adapterAtom: stableAtom,
            cardId
        });

    return (
        <ExtendableTextArea
            disabled={isDisabled}
            testId={EP_TEST_IDS.card.explicitCardContent.explanationInp}
            title='explicit-card-explanation'
            placeholder='Explanation'
            value={inputValue}
            onChange={getInputChangeCallback(setInputValue)}
            className='min-h-[70px] w-full !rounded-[10px] !border-[#dfe3ea] !bg-[#fafbfc] !p-3.5 text-[#222] duration-200'
            id={`explanation-${cardId}`}
        />
    );
}
