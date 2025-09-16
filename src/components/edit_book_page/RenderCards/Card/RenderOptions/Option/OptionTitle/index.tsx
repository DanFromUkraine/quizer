'use client';

import useJotaiDeferredInput from '@/src/hooks/jotai/jotaiDeferedInput';
import { cardOptionTitleAtomAdapter } from '@/src/jotai/mainDbAtom';
import { useOptionProps } from '@/src/components/edit_book_page/RenderCards/Card/RenderOptions/Option';
import { ChangeEventHandler } from 'react';
import OptionTitleUI from '@/src/components/edit_book_page/RenderCards/Card/RenderOptions/Option/OptionTitle/UI';

export default function OptionTitle() {
        const { optionId } = useOptionProps();
        const [value, setValue] = useJotaiDeferredInput(
                cardOptionTitleAtomAdapter,
                optionId
        );
        const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
                const val = e.target.value;
                setValue(val);
        };

        return (
                <OptionTitleUI
                        defaultValue={value}
                        onChange={onChange}
                        optionId={optionId}
                />
        );
}
