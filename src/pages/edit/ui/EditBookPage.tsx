'use client';

import BookTitleInput from '@/src/components/edit_book_page/Header';
import Initializer_CLIENT_ONLY from '@/src/components/initializers/InitMainDbAtoms';
import BookDescriptionInput from '@/src/components/edit_book_page/Description';
import { RenderCards } from '@/src/components/edit_book_page/RenderCards';
import OpenEditCardsModalButton from '@/src/components/edit_book_page/OpenEditCardsModalButton';
import EditCardsAsTextDialog from '@/src/components/edit_book_page/EditCardsAsText';
import useHydrateBookIdAtom from '@/src/hooks/jotaiRelated/useHydrateBookIdAtom';
import AddCardButtons from '@/src/components/edit_book_page/AddCardButton';
import WarningDialogWithAction from '@/src/components/general/WarningDialog';
import { EditBookPropsProvider } from '../model/edit-book-props';

type EditBookPageProps = {
    bookId?: string;
};

export function EditBookPage({ bookId }: EditBookPageProps) {
    if (typeof bookId !== 'string') throw new Error('No Book ID in URL');

    useHydrateBookIdAtom({ bookId });

    return (
        <EditBookPropsProvider bookId={bookId}>
            <Initializer_CLIENT_ONLY />
            <EditCardsAsTextDialog />
            <WarningDialogWithAction />
            <main className='mainContainer'>
                <section className='flex flex-col gap-6 border-b border-gray-200 pb-6'>
                    <BookTitleInput />
                    <BookDescriptionInput />
                    <OpenEditCardsModalButton />
                </section>
                <RenderCards />
                <AddCardButtons />
            </main>
        </EditBookPropsProvider>
    );
}
