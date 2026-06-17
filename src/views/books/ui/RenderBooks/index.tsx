'use client';

import { Suspense } from 'react';
import { useAtomValue } from 'jotai';
import NothingYetMessage from '@/src/components/general/NothingYet';
import { BP_TEST_IDS } from '@/src/constants/testIds';
import { booksIdsAtom } from '@/src/jotai/idManagers';
import { booksAtomFamily } from '@/src/jotai/mainAtoms';
import { createPropsProvider } from '@/src/utils/createPropsProvider';
import BookDescription from '@/src/views/books/ui/RenderBooks/BookDescription';
import BookTitle from '@/src/views/books/ui/RenderBooks/BookTitle';
import BookToolbar from '@/src/views/books/ui/RenderBooks/BookToolbar';
import OtherInfo from '@/src/views/books/ui/RenderBooks/OtherInfo';
import StudyButton from '@/src/views/books/ui/RenderBooks/StudyButton';

type BookProps = {
    bookTitle: string;
    description: string;
    cardsLength: number;
    lastChangeDate: number;
    id: string;
};

export const { Provider: BookPropsProvider, usePropsContext: useBookProps } =
    createPropsProvider<BookProps>('BookProps');

function RenderBook({ id }: { id: string }) {
    const { bookTitle, lastChangeDate, cardIdsOrder, description } =
        useAtomValue(booksAtomFamily(id));

    return (
        <BookPropsProvider
            {...{
                bookTitle,
                lastChangeDate,
                cardsLength: cardIdsOrder.length,
                description,
                id
            }}>
            <div
                data-testid={BP_TEST_IDS.bookCard.me}
                className='rounded-normal border-lightGray flex h-fit w-full flex-col overflow-hidden border p-6'>
                <BookToolbar />
                <BookTitle />
                <BookDescription />
                <OtherInfo />
                <StudyButton />
            </div>
        </BookPropsProvider>
    );
}

export default function RenderBooks() {
    const booksIds = useAtomValue(booksIdsAtom);

    return (
        <div className='grid h-fit w-full grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1'>
            {booksIds.map((id) => (
                <Suspense key={id} fallback={<div>loading...</div>}>
                    <RenderBook id={id} />
                </Suspense>
            ))}
            <NothingYetMessage
                message='No books yet'
                listLength={booksIds.length}
            />
        </div>
    );
}
