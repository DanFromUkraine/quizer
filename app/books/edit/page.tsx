'use client';

import { createPropsProvider } from '@/src/utils/createPropsProvider';
import BookTitleInput from '@/src/components/edit_book_page/Header';
import { use } from 'react';
import Initializer_CLIENT_ONLY from '@/src/components/initializers/InitMainDbAtoms';

type EditBookProps = {
        bookId: string;
};

export const {
        Provider: EditBookPropsProvider,
        usePropsContext: useEditBookProps
} = createPropsProvider<EditBookProps>();

export default function EditBookPage({
        searchParams
}: {
        searchParams: Promise<{
                bookId: string | undefined;
        }>;
}) {
        const bookId = use(searchParams).bookId;
        if (typeof bookId === 'undefined')
                throw 'bookId in searchParams is undefined';

        return (
                <EditBookPropsProvider bookId={bookId}>
                        <Initializer_CLIENT_ONLY />
                        <main className='mainContainer'>
                                <BookTitleInput />
                        </main>
                </EditBookPropsProvider>
        );
}
