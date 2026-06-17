'use client';

import ExtendableTextArea from '@/src/components/general/ExtendableInput';
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
import { EP_TEST_IDS } from '@/src/constants/testIds';

export function MainTextArea() {
    const [cardsTextValue, setCardsText] = useAtom(cardsTextAtom);
    const onChange = getInputChangeCallback((newVal) => {
        setCardsText(newVal);
    }) as unknown as ChangeEventHandler<HTMLTextAreaElement>;

    return (
        <div className='min-h-[50vh] max-h-[72vh] overflow-y-auto'>
            <ExtendableTextArea
                name='cards text input'
                testId={EP_TEST_IDS.cardsAsTextDialog.mainInp}
                className='min-h-[50vh] w-full text-base leading-7'
                placeholder='some description yata-yata'
                value={cardsTextValue}
                onChange={onChange}
            />
        </div>
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
        <section className='flex flex-wrap gap-2'>
            {MARKUP_MODES.map(({ title, modeId, testId }) => (
                <ModeButton
                    key={title}
                    {...{
                        title,
                        testId,
                        hoverable: currentMode !== modeId,
                        onClick: getOnClick(modeId)
                    }}
                />
            ))}
        </section>
    );
}
