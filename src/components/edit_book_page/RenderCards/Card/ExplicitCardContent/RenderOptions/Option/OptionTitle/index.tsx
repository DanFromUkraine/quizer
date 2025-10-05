'use client';

import { useOptionProps } from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions/Option';
import OptionTitleUI from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions/Option/OptionTitle/UI';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { useAtom } from 'jotai';
import {
        getCardOptionTitleAtomAdapter
} from '@/src/utils/jotai/mainDbAtomAdapters';
import { useMemo } from 'react';
import useJotaiDeferredInput from '@/src/hooks/jotaiRelated/jotaiDeferedInput';

export default function OptionTitle() {
        const { optionId } = useOptionProps();
        const stableAdapterAtom = useMemo(() => getCardOptionTitleAtomAdapter(optionId), [])
        const [value, setValue] = useJotaiDeferredInput(stableAdapterAtom);

        return (
                <OptionTitleUI
                        value={value}
                        onChange={getInputChangeCallback(setValue)}
                        optionId={optionId}
                />
        );
}
