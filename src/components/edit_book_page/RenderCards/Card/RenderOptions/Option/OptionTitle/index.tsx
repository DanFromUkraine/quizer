'use client';

import useJotaiDeferredInput from '@/src/hooks/jotai/jotaiDeferedInput';
import { cardOptionTitleAtomAdapter } from '@/src/jotai/mainDbAtom';
import { useOptionProps } from '@/src/components/edit_book_page/RenderCards/Card/RenderOptions/Option';
import { ChangeEventHandler } from 'react';
import OptionTitleUI from '@/src/components/edit_book_page/RenderCards/Card/RenderOptions/Option/OptionTitle/UI';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';

export default function OptionTitle() {
        const { optionId } = useOptionProps();
        const [value, setValue] = useJotaiDeferredInput(
                cardOptionTitleAtomAdapter,
                optionId
        );

        return (
                <OptionTitleUI
                        defaultValue={value}
                        onChange={getInputChangeCallback(setValue)}
                        optionId={optionId}
                />
        );
}
