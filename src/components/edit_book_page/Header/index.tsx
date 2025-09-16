'use client';

import useJotaiDeferredInput from '@/src/hooks/jotai/jotaiDeferedInput';
import { useEditBookProps } from '@/app/books/edit/page';
import { ChangeEventHandler } from 'react';
import { bookTitleAtomAdapter } from '@/src/jotai/mainDbAtom';
import HeaderUI from '@/src/components/edit_book_page/Header/UI';

export default function BookTitleInput() {
        const { bookId } = useEditBookProps();
        const [value, setValue] = useJotaiDeferredInput(bookTitleAtomAdapter, bookId);
        const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
                const val = e.target.value;
                if (!val) return;
                setValue(val);
        };

        return (
                <HeaderUI defaultValue={value} onChange={onChange}/>
        );
}
