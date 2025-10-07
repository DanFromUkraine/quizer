'use client';

import useUpdateCardsFromTextOnDialogClose from '@/src/hooks/edit_book_page/useUpdateCardsFromTextOnDialogClose';
import Dialog from '@/src/components/general/Dialog';
import { MainTextArea, ModeTools } from '@/src/components/edit_book_page/EditCardsAsText/client';

export default function EditCardsAsTextDialog() {
        useUpdateCardsFromTextOnDialogClose();

        return (
                <Dialog dialogName='editCardsAsText' className="!top-5 !translate-y-0">
                        <div className='container !p-5 rounded-md shadow-md relative bg-white '>
                                <h2 className='heading-2'>
                                        Here you can edit your cards as a text
                                </h2>
                                <ModeTools />
                                <MainTextArea />
                        </div>
                </Dialog>
        );
}
