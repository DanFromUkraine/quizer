'use client';

import Header from '../../src/components/books_page/Header';
import RenderCollections from '../../src/components/books_page/RenderBooks';
import AddBookButton from '@/src/components/books_page/AddBookButton';
import Initializer_CLIENT_ONLY from '@/src/components/initializers/InitMainDbAtoms';

export default function MainPage() {
        return (
                <>
                        <Initializer_CLIENT_ONLY />

                        <main className='mainContainer'>
                                <Header />
                                <RenderCollections />
                                <AddBookButton />
                        </main>
                </>
        );
}
