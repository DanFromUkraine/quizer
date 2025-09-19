'use client';

import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import Quoted from '@/src/components/general/Quoted';
import { useAtomValue, useSetAtom } from 'jotai';
import { cardsTextAtom, getBookCardsAsTextAtom } from '@/src/jotai/mainDbAtom';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { ChangeEventHandler } from 'react';

export default function MainTextArea() {
        const defaultText = useAtomValue(getBookCardsAsTextAtom);
        const setCardsText = useSetAtom(cardsTextAtom);
        const onChange = getInputChangeCallback((newVal) => {
                setCardsText(newVal);
        }) as unknown as ChangeEventHandler<HTMLTextAreaElement>;

        return (
                <Quoted>
                        <ExtendableTextArea
                                name='cards text input'
                                className='w-full'
                                defaultValue={defaultText}
                                onChange={onChange}
                        />
                </Quoted>
        );
}
