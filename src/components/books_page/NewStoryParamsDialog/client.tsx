'use client';

import InputSwitch from '@/src/components/general/InputSwitch';
import { useAtom, useAtomValue } from 'jotai';
import { getNewStoryIsSmartModeParamAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { Hr, HrWrapper } from '@/src/components/general/Hr';
import { NewStoryParam } from '@/src/constants/newCardParams';
import {
        addNewStory,
        closeNewStorySettingsDialogAtom,
        newStorySettingsAtom
} from '@/src/jotai/createNewStory';
import { useAtomCallback } from 'jotai/utils';
import { useRouter } from 'next/navigation';
import getDefaultPathToPlayPage from '@/src/utils/getDefPathToPlayPage';

export function IsSmartModeToggle() {
        const [currState, setCurrState] = useAtom(
                getNewStoryIsSmartModeParamAdapterAtom
        );
        return (
                <HrWrapper>
                        <section className='flex justify-between'>
                                <h3 className='heading-3'>Smart Mode:</h3>
                                <InputSwitch {...{ currState, setCurrState }} />
                        </section>
                </HrWrapper>
        );
}

export function CustomParam({ adapterAtom, title, maxNumAtom }: NewStoryParam) {
        const [value, setValue] = useAtom(adapterAtom);
        const maxNum = useAtomValue(maxNumAtom);
        const isSmartMode = useAtomValue(
                getNewStoryIsSmartModeParamAdapterAtom
        );

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
                                        data-editable={!isSmartMode}
                                        type='number'
                                        name='newStoryParam'
                                        value={String(value)}
                                        onInput={onChange}
                                        className='bg-gray-300 w-20 p-4 rounded-xl data-[editable=false]:bg-gray-200 data-[editable=false]:text-gray-400'
                                />
                        </li>
                        <Hr />
                </>
        );
}

export function SubmitButton() {
        const router = useRouter();
        const submit = useAtomCallback((get, set) => {
                const newStorySettings = get(newStorySettingsAtom);
                set(closeNewStorySettingsDialogAtom);
                set(addNewStory, {
                        settings: newStorySettings,
                        bookId: newStorySettings.bookId,
                        successCallback: (newStoryId) => {
                                router.push(getDefaultPathToPlayPage(newStoryId));
                        }
                })
        });

        return (
                <button
                        onClick={submit}
                        className='bg-blue-400 border border-blue-700 hover:bg-blue-300 rounded-xl py-2 px-5 heading-4 duration-100 block my-6 !text-white ml-auto'>
                        Submit
                </button>
        );
}
