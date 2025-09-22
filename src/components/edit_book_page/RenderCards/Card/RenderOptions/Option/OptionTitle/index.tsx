'use client';

import { useOptionProps } from '@/src/components/edit_book_page/RenderCards/Card/RenderOptions/Option';
import OptionTitleUI from '@/src/components/edit_book_page/RenderCards/Card/RenderOptions/Option/OptionTitle/UI';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { useAtom } from 'jotai';
import { cardOptionTitleAtomAdapter } from '@/src/utils/jotai/mainDbAtomAdapters';

export default function OptionTitle() {
        const { optionId } = useOptionProps();
        const [value, setValue] = useAtom(cardOptionTitleAtomAdapter(optionId));

        return (
                <OptionTitleUI
                        defaultValue={value}
                        onChange={getInputChangeCallback(setValue)}
                        optionId={optionId}
                />
        );
}
