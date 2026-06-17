'use client';

import { useAtom, useAtomValue } from 'jotai';
import { Hr } from '@/src/shared/ui/Hr';
import { NewStoryParam } from '@/src/constants/newCardParams';
import { getNewStoryIsSmartModeParamAdapterAtom } from '@/src/utils/jotai/atomAdapters';

export default function CustomParam({
    adapterAtom,
    title,
    maxNumAtom,
    testId
}: NewStoryParam) {
    const [value, setValue] = useAtom(adapterAtom);
    const maxNum = useAtomValue(maxNumAtom);
    const isSmartMode = useAtomValue(getNewStoryIsSmartModeParamAdapterAtom);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        const num = Number(newVal);

        if (num > maxNum || num < 0 || isSmartMode) return;

        setValue(num);
    };

    return (
        <>
            <li className='flex justify-between'>
                <div className='flex flex-col gap-1'>
                    <h4 className='heading-4'>{title}</h4>
                    <span className='span'>{`max. num. of cards: ${maxNum}`}</span>
                </div>
                <input
                    data-testid={testId}
                    data-editable={!isSmartMode}
                    type='number'
                    name='newStoryParam'
                    value={String(value)}
                    onInput={onChange}
                    className='w-20 rounded-xl bg-gray-300 p-4 data-[editable=false]:bg-gray-200 data-[editable=false]:text-gray-400'
                />
            </li>
            <Hr />
        </>
    );
}
