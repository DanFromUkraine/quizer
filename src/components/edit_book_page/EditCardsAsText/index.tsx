'use client';

import useUpdateCardsFromTextOnDialogClose from '@/src/hooks/edit_book_page/useUpdateCardsFromTextOnDialogClose';
import Dialog from '@/src/components/general/Dialog';
import {
        MainTextArea,
        ModeTools,

} from '@/src/components/edit_book_page/EditCardsAsText/client';
import { EP_TEST_IDS } from '@/src/constants/testIds';
import { SaveAndCloseButtonUI } from '@/src/components/edit_book_page/EditCardsAsText/UI';

export default function EditCardsAsTextDialog() {
        useUpdateCardsFromTextOnDialogClose();

        return (
                <Dialog
                        testId={EP_TEST_IDS.cardsAsTextDialog.me}
                        dialogName='editCardsAsText'
                        className='!top-5 !translate-y-0 !p-5 rounded-md shadow-md relative bg-white '
                        CloseDialogComponent={SaveAndCloseButtonUI}>
                        <h2 className='heading-2'>
                                Here you can edit your cards as a text
                        </h2>
                        <ModeTools />
                        <MainTextArea />
                </Dialog>
        );
}
