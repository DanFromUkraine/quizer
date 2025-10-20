'use client';

import { createPropsProvider } from '@/src/utils/createPropsProvider';
import BookTitleInput from '@/src/components/edit_book_page/Header';
import Initializer_CLIENT_ONLY from '@/src/components/initializers/InitMainDbAtoms';
import BookDescriptionInput from '@/src/components/edit_book_page/Description';
import { RenderCards } from '@/src/components/edit_book_page/RenderCards';
import OpenEditCardsModalButton from '@/src/components/edit_book_page/OpenEditCardsModalButton';
import EditCardsAsTextDialog from '@/src/components/edit_book_page/EditCardsAsText';
import useHydrateBookIdAtom from '@/src/hooks/jotaiRelated/useHydrateBookIdAtom';
import AddCardButtons from '@/src/components/edit_book_page/AddCardButton';
import WarningDialogWithAction from '@/src/components/general/WarningDialog';
import { useSearchParams } from 'next/navigation';

type EditBookProps = {
        bookId: string;
};

export const {
        Provider: EditBookPropsProvider,
        usePropsContext: useEditBookProps
} = createPropsProvider<EditBookProps>();

export default function EditBookPage() {
        const searchParams = useSearchParams();
        const bookId = searchParams.get('bookId');


        if (typeof bookId !== 'string') throw new Error('No Book ID in URL');

        useHydrateBookIdAtom({ bookId });

        return (
                <EditBookPropsProvider bookId={bookId}>
                        <Initializer_CLIENT_ONLY />
                        <EditCardsAsTextDialog />
                        <WarningDialogWithAction />
                        <main className='mainContainer'>
                                <BookTitleInput />
                                <BookDescriptionInput />
                                <OpenEditCardsModalButton />
                                <RenderCards />
                                <AddCardButtons />
                        </main>
                </EditBookPropsProvider>
        );
}
