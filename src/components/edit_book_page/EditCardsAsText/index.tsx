'use client';

import useUpdateCardsFromTextOnDialogClose from '@/src/hooks/edit_book_page/useUpdateCardsFromTextOnDialogClose';
import Dialog from '@/src/components/general/Dialog';
import MainTextArea from '@/src/components/edit_book_page/EditCardsAsText/MainTextArea';

export default function EditCardsAsTextDialog() {
        useUpdateCardsFromTextOnDialogClose();

        return (
                <Dialog dialogName='editCardsAsText'>
                        <div className='z-50 container p-5 w-8/12 rounded-md shadow-md relative bg-white overflow-auto'>
                                <h2 className='heading-2'>
                                        Here you can edit your cards as a text
                                </h2>
                                <MainTextArea />
                        </div>
                </Dialog>
        );
}
