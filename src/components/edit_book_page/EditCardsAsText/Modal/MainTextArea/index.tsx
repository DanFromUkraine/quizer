'use client';

import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import Quoted from '@/src/components/general/Quoted';
import { useAtomValue } from 'jotai';
import { getBookCardsAsText } from '@/src/jotai/mainDbAtom';
import parseTextIntoCardsArray from '@/src/utils/parseTextIntoCardsArray';

export default function MainTextArea() {
        const text = useAtomValue(getBookCardsAsText);
        console.log({ text });

        console.log(parseTextIntoCardsArray(text));

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
