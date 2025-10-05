'use client';

import { useAtom, WritableAtom } from 'jotai';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import Quoted from '@/src/components/general/Quoted';
import useJotaiDeferredInput from '@/src/hooks/jotaiRelated/jotaiDeferedInput';

export default function TermOrDeterminationInput({
        underText,
        atomAdapterUnstable
}: {
        underText: string;
        atomAdapterUnstable: WritableAtom<string, [newVal: string], void>;
}) {
        const [value, updateValue] = useJotaiDeferredInput(atomAdapterUnstable);

        const onChange = getInputChangeCallback((newVal) =>
                updateValue(newVal)
        );

        return (
                <section className='flex flex-col gap-2'>
                        <Quoted>
                                <input
                                        defaultValue={value}
                                        onChange={onChange}
                                        className='w-full'
                                        type='text'
                                />
                        </Quoted>
                        <h3 className='heading-4 opacity-80'>{underText}</h3>
                </section>
        );
}
