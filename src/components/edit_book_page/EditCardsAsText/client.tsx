'use client';

import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import Quoted from '@/src/components/general/Quoted';
import { useAtom, useAtomValue } from 'jotai';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { ChangeEventHandler } from 'react';
import {
        cardsTextAtom,
        changeMarkupMode,
        markupModeAtom
} from '@/src/jotai/cardsAsTextAtoms';
import { MARKUP_MODES } from '@/src/constants/cardsAsText';
import { ModeButton } from '@/src/components/edit_book_page/EditCardsAsText/UI';
import { MarkupModes } from '@/src/types/updateCardsFromText';
import { useAtomCallback } from 'jotai/utils';

export function MainTextArea() {
        const [cardsTextValue, setCardsText] = useAtom(cardsTextAtom);
        const onChange = getInputChangeCallback((newVal) => {
                setCardsText(newVal);
        }) as unknown as ChangeEventHandler<HTMLTextAreaElement>;

        return (
                <Quoted variant="heading" className='h-full max-h-[80vh] overflow-y-scroll'>
                        <ExtendableTextArea
                                name='cards text input'
                                className='w-full h-full '
                                value={cardsTextValue}
                                onChange={onChange}
                        />
                </Quoted>
        );
}

export function ModeTools() {
        const currentMode = useAtomValue(markupModeAtom);

        const getOnClick = useAtomCallback(
                (_get, set, modeId: MarkupModes) => () => {
                        set(changeMarkupMode, modeId);
                }
        );

        return (
                <section className="flex gap-2">
                        {MARKUP_MODES.map(({ title, modeId }) => (
                                <ModeButton
                                        key={title}
                                        {...{
                                                title,
                                                hoverable: currentMode !== modeId,
                                                onClick: getOnClick(modeId)
                                        }}
                                />
                        ))}
                </section>
        );
}
