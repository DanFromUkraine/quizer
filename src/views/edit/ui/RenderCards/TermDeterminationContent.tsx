import { useMemo } from 'react';
import { WritableAtom } from 'jotai';
import Quoted from '@/src/shared/ui/Quoted';
import useJotaiDeferredUpdateAdapter from '@/src/hooks/jotaiRelated/jotaiDeferedInput';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import {
    getShortCardDefinitionFamilyAdapterAtom,
    getShortCardTermFamilyAdapterAtom
} from '@/src/utils/jotai/atomAdapters';
import { EP_TEST_IDS } from '@/src/constants/testIds';
import { useCardProps } from './Card';

export default function TermDeterminationContent() {
    const { cardId } = useCardProps();

    return (
        <section
            data-testid={EP_TEST_IDS.card.shortCardContent.me}
            className='grid w-full grid-cols-2 gap-4 max-sm:grid-cols-1'>
            <TermOrDeterminationInput
                testId={EP_TEST_IDS.card.shortCardContent.termInp}
                underText='TERM'
                atomAdapterUnstable={getShortCardTermFamilyAdapterAtom(cardId)}
            />
            <TermOrDeterminationInput
                testId={EP_TEST_IDS.card.shortCardContent.definitionInp}
                underText='DEFINITION'
                atomAdapterUnstable={getShortCardDefinitionFamilyAdapterAtom(
                    cardId
                )}
            />
        </section>
    );
}

function TermOrDeterminationInput({
    underText,
    atomAdapterUnstable,
    testId
}: {
    underText: string;
    atomAdapterUnstable: WritableAtom<string, [newVal: string], Promise<void>>;
    testId: string;
}) {
    const { cardId } = useCardProps();
    const stableAdapterAtom = useMemo(
        () => atomAdapterUnstable,
        [atomAdapterUnstable]
    );
    const { inputValue, setInputValue, isDisabled } =
        useJotaiDeferredUpdateAdapter({
            adapterAtom: stableAdapterAtom,
            cardId
        });

    return (
        <section className='flex flex-col gap-2'>
            <Quoted variant='heading' className='has-[:invalid]:bg-red-300'>
                <input
                    disabled={isDisabled}
                    data-testid={testId}
                    required
                    value={inputValue}
                    onChange={getInputChangeCallback(setInputValue)}
                    className='w-full'
                    type='text'
                />
            </Quoted>
            <h3 className='heading-4 opacity-80'>{underText}</h3>
        </section>
    );
}
