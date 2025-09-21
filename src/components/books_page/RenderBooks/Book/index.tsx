'use client';

import { useAtomValue } from 'jotai';
import { booksFamilyAtom } from '@/src/jotai/mainDbAtom';
import BookTitle from '@/src/components/books_page/RenderBooks/Book/BookTitle';
import BookDescription from '@/src/components/books_page/RenderBooks/Book/Description';
import OtherInfo from '@/src/components/books_page/RenderBooks/Book/OtherInfo';
import Toolbar from '@/src/components/books_page/RenderBooks/Book/BookToolbar';
import StudyButton from '@/src/components/books_page/RenderBooks/Book/StudyButton';
import { createPropsProvider } from '@/src/utils/createPropsProvider';

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
        const { bookTitle, lastChangeDate, childrenIds, description } =
                useAtomValue(booksFamilyAtom(id));

        return (
                <BookPropsProvider
                        {...{
                                bookTitle,
                                lastChangeDate,
                                cardsLength: childrenIds.length,
                                description,
                                id
                        }}>
                        <div className='w-full flex flex-col h-fit rounded-normal overflow-hidden border p-6 border-lightGray'>
                                <Toolbar />
                                <BookTitle />
                                <BookDescription />
                                <OtherInfo />

                                <StudyButton />
                        </div>
                </BookPropsProvider>
        );
}
