'use client';

import Dialog from '@/src/components/general/Dialog';
import {
    MainTextArea,
    ModeTools
} from '@/src/components/edit_book_page/EditCardsAsText/client';
import { EP_TEST_IDS } from '@/src/constants/testIds';
import { SaveAndCloseButtonUI } from '@/src/components/edit_book_page/EditCardsAsText/UI';

export default function EditCardsAsTextDialog() {
    return (
        <Dialog
            testId={EP_TEST_IDS.cardsAsTextDialog.me}
            dialogName='editCardsAsText'
            className='relative top-5 w-9/12 translate-y-0 gap-5 rounded-md bg-white p-6 shadow-md max-lg:w-10/12 max-sm:top-0 max-sm:w-full max-sm:p-5'
            CloseDialogComponent={SaveAndCloseButtonUI}>
            <section className='flex flex-col gap-3'>
                <h2 className='heading-2 mb-0'>
                    Here you can edit your cards as a text
                </h2>
                <ModeTools />
            </section>
            <MainTextArea />
        </Dialog>
    );
}
