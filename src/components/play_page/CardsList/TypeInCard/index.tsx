'use client';

import Quoted from '@/src/components/general/Quoted';
import { useAtomValue, useSetAtom } from 'jotai';
import {
        getChoiceInfoAtom,
        updateChoiceTextAtom
} from '@/src/jotai/historyAtoms';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';

export default function TypeInCard({
        definition,
        expectedInput,
        cardIndex
}: {
        definition: string;
        expectedInput: string;
        cardIndex: number;
}) {
        const choiceInfo =
                (useAtomValue(getChoiceInfoAtom(cardIndex)) as string) || '';
        const updateChoiceText = useSetAtom(updateChoiceTextAtom);
        const onChange = getInputChangeCallback((newText) => {
                updateChoiceText({
                        cardIndex,
                        newText
                });
        });

        return (
                <li className='flex flex-col border border-gray-500 rounded-xl p-4'>
                        <Quoted variant='heading'>
                                <h3 className='h3'>{definition}</h3>
                        </Quoted>
                        <input
                                className='w-full'
                                value={choiceInfo}
                                onChange={onChange}
                        />
                </li>
        );
}
