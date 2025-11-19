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
                        className='relative top-5 translate-y-0 rounded-md bg-white p-5 shadow-md'
                        CloseDialogComponent={SaveAndCloseButtonUI}>
                        <h2 className='heading-2'>
                                Here you can edit your cards as a text
                        </h2>
                        <ModeTools />
                        <MainTextArea />
                </Dialog>
        );
}
