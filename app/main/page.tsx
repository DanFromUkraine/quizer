'use client';

import Header from '../../src/components/books_page/Header';
import RenderCollections from '../../src/components/books_page/RenderBooks';
import dynamic from 'next/dynamic';
import AddBookButton from '@/src/components/books_page/AddBookButton';

const Initializers_CLIENT_ONLY = dynamic(
        () => import('@/src/components/initializers/InitMainDbAtoms'),
        { ssr: false }
);

export default function MainPage() {
        return (
                <>
                        <Initializers_CLIENT_ONLY />

                        <main className='flex flex-col w-full px-8'>
                                <Header />
                                <RenderCollections />
                                <AddBookButton />
                        </main>
                </>
        );
}
