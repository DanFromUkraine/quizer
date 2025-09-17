'use client';

import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import Quoted from '@/src/components/general/Quoted';
import { useAtomValue } from 'jotai';
import { getBookCardsAsText } from '@/src/jotai/mainDbAtom';

export default function MainTextArea() {
        const text = useAtomValue(getBookCardsAsText);
        console.log({ text });

        return (
                <Quoted>
                        <ExtendableTextArea
                                name='cards text input'
                                className='w-full'
                                defaultValue={text}
                        />
                </Quoted>
        );
}
