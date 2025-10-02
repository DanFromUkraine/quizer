'use client';

import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import Quoted from '@/src/components/general/Quoted';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { cardsTextAtom } from '@/src/jotai/mainAtoms';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { ChangeEventHandler } from 'react';

export default function MainTextArea() {
        const [cardsTextValue, setCardsText] = useAtom(cardsTextAtom);
        const onChange = getInputChangeCallback((newVal) => {
                setCardsText(newVal);
        }) as unknown as ChangeEventHandler<HTMLTextAreaElement>;

        return (
                <Quoted className='h-full max-h-[80vh] overflow-y-scroll'>
                        <ExtendableTextArea
                                name='cards text input'
                                className='w-full h-full '
                                value={cardsTextValue}
                                onChange={onChange}
                        />
                </Quoted>
        );
}
