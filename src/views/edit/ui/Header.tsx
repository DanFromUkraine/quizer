'use client';

import { useEditBookProps } from '@/src/views/edit/model/edit-book-props';
import { useAtom } from 'jotai';
import { useMemo, useRef } from 'react';
import { getBookTitleFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import Quoted from '@/src/components/general/Quoted';
import StableInput from '@/src/components/general/StableInput';
import { EP_TEST_IDS } from '@/src/constants/testIds';

export default function BookTitleInput() {
    const { bookId } = useEditBookProps();
    const stableAtom = useMemo(() => getBookTitleFamilyAdapterAtom(bookId), []);
    const [value, setValue] = useAtom(stableAtom);
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <header className='flex max-w-full min-w-0 items-center justify-start gap-6 max-[412px]:flex-col max-[412px]:items-start max-[412px]:gap-2'>
            <h3 className='heading-1 shrink-0 whitespace-nowrap'>Edit book</h3>
            <div className='max-w-full min-w-0 flex-1'>
                <Quoted
                    variant='large-heading'
                    onClick={() => inputRef.current?.focus()}
                    className='heading-1 w-fit max-w-full min-w-0 cursor-text bg-[#f7f8fb]! px-4 py-3 text-gray-700'>
                    <StableInput
                        ref={inputRef}
                        {...{
                            id: 'book-title',
                            testId: EP_TEST_IDS.bookTitleInp,
                            type: 'text',
                            name: 'book-title',
                            className: 'heading-1 !mb-0 !text-gray-700',
                            containerClassName:
                                'min-w-0 max-w-full overflow-hidden',
                            inputClassName:
                                'min-w-0 max-w-full overflow-x-auto',
                            sizerClassName: 'max-w-full overflow-hidden',
                            inputValue: value,
                            setInputValue: setValue
                        }}
                    />
                </Quoted>
            </div>
        </header>
    );
}
