'use client';

import { ChangeEventHandler } from 'react';
import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import { EP_TEST_IDS } from '@/src/constants/testIds';

export default function DescriptionInputUI({
    value,
    onChangeAction
}: {
    value: string;
    onChangeAction: ChangeEventHandler<HTMLTextAreaElement>;
}) {
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
                onChange={onChangeAction}
            />
        </section>
    );
}
