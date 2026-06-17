'use client';
import { useEditBookProps } from '@/src/pages/edit/model/edit-book-props';
import { useMemo } from 'react';
import { getBookDescriptionFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { useAtom } from 'jotai';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import { EP_TEST_IDS } from '@/src/constants/testIds';

export default function BookDescriptionInput() {
    const { bookId } = useEditBookProps();
    const stableAdapterAtom = useMemo(
        () => getBookDescriptionFamilyAdapterAtom(bookId),
        []
    );
    const [value, setValue] = useAtom(stableAdapterAtom);

    const onChange = getInputChangeCallback(setValue as (s: string) => void);

    return (
        <section className='flex w-full flex-col gap-3'>
            <label htmlFor='book-description'>
                <h2 className='heading-2'>How can you describe this book?</h2>
            </label>

            <ExtendableTextArea
                testId={EP_TEST_IDS.bookDescInp}
                className='min-h-36 w-full text-xl'
                name='book-description'
                id='book-description'
                placeholder='some description yata-yata'
                value={value}
                onChange={onChange}
            />
        </section>
    );
}
