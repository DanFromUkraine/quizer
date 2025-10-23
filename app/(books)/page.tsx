'use client';

import Header from '../../src/components/books_page/Header';
import RenderBooks from '../../src/components/books_page/RenderBooks';
import AddBookButton from '@/src/components/books_page/AddBookButton';
import Initializer_CLIENT_ONLY from '@/src/components/initializers/InitMainDbAtoms';
import Snackbar from '@/src/components/general/Snackbar';
import BookStoryDialog from '@/src/components/books_page/BookStoryDialog';
import NewStoryParamsDialog from '@/src/components/books_page/NewStoryParamsDialog';

export default function MainPage() {
        return (
                <>
                        <Initializer_CLIENT_ONLY />
                        <Snackbar
                                snackbarName='noCardsErrorSnackbar'
                                message='In this book no question cards yet. Create one and try again'
                        />
                        <BookStoryDialog />
                        <NewStoryParamsDialog />
                        <main className='mainContainer'>
                                <Header />
                                <RenderBooks />
                                <AddBookButton />
                        </main>
                </>
        );
}
