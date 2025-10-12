'use client';

import Quoted from '@/src/components/general/Quoted';
import { useAtom, useAtomValue } from 'jotai';
import { typeInCardStoriesAtomFamily } from '@/src/jotai/mainAtoms';
import { useMemo, useState } from 'react';
import { getTypeInCardStoryCurrValFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { usePlayModeProps } from '@/src/components/play_page/CardsList';

export default function TypeInCard({ cardId }: { cardId: string }) {
        const { showAnswersImmediately } = usePlayModeProps();
        const { definition, expectedInput } = useAtomValue(
                typeInCardStoriesAtomFamily(cardId)
        );
        const stableAdapterAtom = useMemo(
                () => getTypeInCardStoryCurrValFamilyAdapterAtom(cardId),
                []
        );
        const [currentValue, setCurrentValue] = useAtom(stableAdapterAtom);
        const onChange = getInputChangeCallback(setCurrentValue);

        const [isCorrect, setIsCorrect] = useState(null);

        const onRevealButtonClick = () => {};

        return (
                <li className='flex flex-col w-full border border-gray-500 rounded-xl p-4'>
                        <Quoted variant='heading'>
                                <h3 className='h3'>{definition}</h3>
                        </Quoted>
                        <input
                                className='w-full border border-gray-400 rounded-xl p-4'
                                value={currentValue}
                                onChange={onChange}
                        />
                        {showAnswersImmediately && (
                                <button className='bg-blue-500 rounded-md px-3 py-1.5 text-white hover:bg-blue-300 duration-100 ml-auto'>
                                        Show if correct
                                </button>
                        )}
                </li>
        );
}
