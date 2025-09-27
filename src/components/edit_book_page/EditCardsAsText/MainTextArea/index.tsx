'use client';

import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import Quoted from '@/src/components/general/Quoted';
import { useAtomValue, useSetAtom } from 'jotai';
import { cardsTextAtom, getBookCardsAsTextAtom } from '@/src/jotai/mainAtoms';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { ChangeEventHandler } from 'react';

export default function MainTextArea() {
        const defaultText = useAtomValue(getBookCardsAsTextAtom);
        const setCardsText = useSetAtom(cardsTextAtom);
        const onChange = getInputChangeCallback((newVal) => {
                setCardsText(newVal);
        }) as unknown as ChangeEventHandler<HTMLTextAreaElement>;

        return (
                <Quoted className='h-full max-h-[80vh] overflow-y-scroll'>
                        <ExtendableTextArea
                                name='cards text input'
                                className='w-full h-full '
                                defaultValue={defaultText}
                                onChange={onChange}
                        />
                </Quoted>
        );
}
