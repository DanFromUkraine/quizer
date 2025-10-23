'use client';

import { useAtomValue } from 'jotai';
import { booksAtomFamily } from '@/src/jotai/mainAtoms';
import BookTitle from '@/src/components/books_page/RenderBooks/Book/BookTitle';
import BookDescription from '@/src/components/books_page/RenderBooks/Book/Description';
import OtherInfo from '@/src/components/books_page/RenderBooks/Book/OtherInfo';
import Toolbar from '@/src/components/books_page/RenderBooks/Book/BookToolbar';
import StudyButton from '@/src/components/books_page/RenderBooks/Book/StudyButton';
import { createPropsProvider } from '@/src/utils/createPropsProvider';
import { BP_TEST_IDS } from '@/src/constants/testIds';

type BookProps = {
        bookTitle: string;
        description: string;
        cardsLength: number;
        lastChangeDate: number;
        id: string;
};

export const { Provider: BookPropsProvider, usePropsContext: useBookProps } =
        createPropsProvider<BookProps>('BookItemProps');

export default function BookItem({ id }: { id: string }) {
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
                        <div data-testid={BP_TEST_IDS.bookCard.me} className='w-full flex flex-col h-fit rounded-normal overflow-hidden border p-6 border-lightGray'>
                                <Toolbar />
                                <BookTitle />
                                <BookDescription />
                                <OtherInfo />

                                <StudyButton />
                        </div>
                </BookPropsProvider>
        );
}
