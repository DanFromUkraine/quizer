'use client';

import { useAtom, WritableAtom } from 'jotai';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import Quoted from '@/src/components/general/Quoted';
import { useMemo } from 'react';

export default function TermOrDeterminationInput({
        underText,
        atomAdapterUnstable
}: {
        underText: string;
        atomAdapterUnstable: WritableAtom<string, [newVal: string], void>;
}) {
        const stableAdapterAtom = useMemo(() => atomAdapterUnstable, []);
        const [value, updateValue] = useAtom(stableAdapterAtom);

        const onChange = getInputChangeCallback(updateValue);

        return (
                <section className='flex flex-col gap-2'>
                        <Quoted variant='heading'>
                                <input
                                        value={value}
                                        onChange={onChange}
                                        className='w-full'
                                        type='text'
                                />
                        </Quoted>
                        <h3 className='heading-4 opacity-80'>{underText}</h3>
                </section>
        );
}
