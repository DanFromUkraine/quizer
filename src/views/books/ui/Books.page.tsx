'use client';

import Header from '@/src/views/books/ui/Header';
import RenderBooks from '@/src/views/books/ui/RenderBooks';
import AddBookButton from '@/src/views/books/ui/AddBookButton';
import Initializer_CLIENT_ONLY from '@/src/components/initializers/InitMainDbAtoms';
import Snackbar from '@/src/components/general/Snackbar';
import BookStoryDialog from '@/src/views/books/ui/BookStoryDialog';
import NewStoryParamsDialog from '@/src/views/books/ui/NewStoryParamsDialog';

export function BooksPage() {
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
