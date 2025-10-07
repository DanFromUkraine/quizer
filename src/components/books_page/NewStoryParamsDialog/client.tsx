'use client';

import InputSwitch from '@/src/components/general/InputSwitch';
import { useAtom } from 'jotai';
import { getNewStoryIsSmartModeParamAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { Hr, HrWrapper } from '@/src/components/general/Hr';
import { NewStoryParam } from '@/src/constants/newCardParams';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';

export function IsSmartModeToggle() {
        const [currState, setCurrState] = useAtom(
                getNewStoryIsSmartModeParamAdapterAtom
        );
        return (
                <>
                        <section className='flex justify-between'>
                                <h3 className='heading-3'>Smart Mode:</h3>
                                <InputSwitch {...{ currState, setCurrState }} />
                        </section>
                        <Hr />
                </>
        );
}

export function CustomParam({ adapterAtom, title }: NewStoryParam) {
        const [value, setValue] = useAtom(adapterAtom);
        const onChange = getInputChangeCallback((newVal) => {
                setValue(Number(newVal));
        });

        return (
                <HrWrapper>
                        <li className='flex justify-between'>
                                <h4 className='heading-4'>{title}</h4>
                                <input
                                        type='number'
                                        name='newStoryParam'
                                        value={value}
                                        onChange={onChange}
                                        className='bg-gray-300 p-4 rounded-xl'
                                />
                        </li>
                </HrWrapper>
        );
}
