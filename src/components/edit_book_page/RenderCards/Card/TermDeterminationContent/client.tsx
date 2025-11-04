'use client';

import { WritableAtom } from 'jotai';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import Quoted from '@/src/components/general/Quoted';
import { useMemo } from 'react';
import useJotaiDeferredUpdateAdapter from '@/src/hooks/jotaiRelated/jotaiDeferedInput';
import { useCardProps } from '..';

export default function TermOrDeterminationInput({
        underText,
        atomAdapterUnstable,
        testId
}: {
        underText: string;
        atomAdapterUnstable: WritableAtom<
                string,
                [newVal: string],
                Promise<void>
        >;
        testId: string;
}) {
        const { cardId } = useCardProps();
        const stableAdapterAtom = useMemo(() => atomAdapterUnstable, []);
        const { inputValue, setInputValue, isDisabled } =
                useJotaiDeferredUpdateAdapter({
                        adapterAtom: stableAdapterAtom,
                        cardId
                });

        const onChange = getInputChangeCallback(setInputValue);

        return (
                <section className='flex flex-col gap-2'>
                        <Quoted
                                variant='heading'
                                className='has-[:invalid]:bg-red-300'>
                                <input
                                        disabled={isDisabled}
                                        data-testid={testId}
                                        required
                                        value={inputValue}
                                        onChange={onChange}
                                        className='w-full'
                                        type='text'
                                />
                        </Quoted>
                        <h3 className='heading-4 opacity-80'>{underText}</h3>
                </section>
        );
}
