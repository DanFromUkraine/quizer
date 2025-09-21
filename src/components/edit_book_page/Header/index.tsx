'use client';

import useJotaiDeferredInput from '@/src/hooks/jotai/jotaiDeferedInput';
import { useEditBookProps } from '@/app/edit/page';
import HeaderUI from '@/src/components/edit_book_page/Header/UI';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { bookTitleAtomAdapter } from '@/src/jotai/utils/mainDbAtomAdapters';

export default function BookTitleInput() {
        const { bookId } = useEditBookProps();
        const [value, setValue] = useJotaiDeferredInput(
                bookTitleAtomAdapter,
                bookId
        );

        return (
                <HeaderUI
                        defaultValue={value}
                        onChange={getInputChangeCallback(setValue)}
                />
        );
}
