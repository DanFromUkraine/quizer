'use client';

import useJotaiDeferredInput from '@/src/hooks/jotai/jotaiDeferedInput';
import { useEditBookProps } from '@/app/books/edit/page';
import { ChangeEventHandler } from 'react';
import { bookTitleAtomAdapter } from '@/src/jotai/mainDbAtom';

export default function BookTitleInput() {
        const { bookId } = useEditBookProps();
        const [value, setValue] = useJotaiDeferredInput(bookTitleAtomAdapter, bookId);
        const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
                const val = e.target.value;
                if (!val) return;
                setValue(val);
        };

        return (
                <header className='flex items-center justify-start gap-3'>
                        <h3 className='h1'>Edit book</h3>
                        <div className='h1 p-1 px-3 bg-gray-400 !text-gray-700 rounded-md'>
                                <span>'</span>
                                <input
                                        type='text'
                                        name='book-title'
                                        className='field-sizing-content'
                                        placeholder="Book's title"
                                        defaultValue={value}
                                        onChange={onChange}
                                />
                                <span>'</span>
                        </div>
                </header>
        );
}
