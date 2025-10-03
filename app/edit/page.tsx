'use client';

import { createPropsProvider } from '@/src/utils/createPropsProvider';
import BookTitleInput from '@/src/components/edit_book_page/Header';
import { use } from 'react';
import Initializer_CLIENT_ONLY from '@/src/components/initializers/InitMainDbAtoms';
import BookDescriptionInput from '@/src/components/edit_book_page/Description';
import { RenderCards } from '@/src/components/edit_book_page/RenderCards';
import OpenEditCardsModalButton from '@/src/components/edit_book_page/OpenEditCardsModalButton';
import EditCardsAsTextDialog from '@/src/components/edit_book_page/EditCardsAsText';
import useHydrateBookIdAtom from '@/src/hooks/jotaiRelated/useHydrateBookIdAtom';
import AddCardButtons from '@/src/components/edit_book_page/AddCardButton';
import WarningDialogWithAction from '@/src/components/general/WarningDialog';

type EditBookProps = {
        bookId: string;
};

export const {
        Provider: EditBookPropsProvider,
        usePropsContext: useEditBookProps
} = createPropsProvider<EditBookProps>();

export default function EditBookPage({
        searchParams
}: {
        searchParams: Promise<{
                bookId: string | undefined;
        }>;
}) {
        const bookId = use(searchParams).bookId;
        if (typeof bookId === 'undefined')
                throw 'bookId in searchParams is undefined';

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
