'use client';

import Header from '../../src/components/books_page/Header';
import RenderCollections from '../../src/components/books_page/RenderBooks';
import AddBookButton from '@/src/components/books_page/AddBookButton';
import Initializer_CLIENT_ONLY from '@/src/components/initializers/InitMainDbAtoms';
import Snackbar from '@/src/components/general/Snackbar';
import BookStoryDialog from '@/src/components/books_page/BookStoryDialog';

export default function MainPage() {
        return (
                <>
                        <Initializer_CLIENT_ONLY />
                        <Snackbar
                                snackbarName='noCardsErrorSnackbar'
                                message='In this book no question cards yet. Create one and try again'
                        />
                        <BookStoryDialog />
                        <main className='mainContainer'>
                                <Header />
                                <RenderCollections />
                                <AddBookButton />
                        </main>
                </>
        );
}
