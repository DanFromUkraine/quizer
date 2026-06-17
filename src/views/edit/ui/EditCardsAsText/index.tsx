'use client';

import Dialog from '@/src/components/general/Dialog';
import { EP_TEST_IDS } from '@/src/constants/testIds';
import { useAtomCallback } from 'jotai/utils';
import {
    cardsTextAtom,
    markupModeAtom,
    textInModalHasBeenChangedAtom
} from '@/src/jotai/cardsAsTextAtoms';
import {
    updateAnyCardsFromTextAtom,
    updateOnlyShortCardsFromTextAtom
} from '@/src/jotai/cardAtoms';
import { MainTextArea } from '@/src/views/edit/ui/EditCardsAsText/MainTextArea';
import { SaveAndCloseButtonUI } from '@/src/views/edit/ui/EditCardsAsText/SaveButton';
import { ModeTools } from '@/src/views/edit/ui/EditCardsAsText/ModeTools';

export default function EditCardsAsTextDialog() {
    const onClick = useAtomCallback(async (get, set) => {
        const cardsText = get(cardsTextAtom);
        const markupMode = get(markupModeAtom);
        const areAnyChanges = get(textInModalHasBeenChangedAtom);

        if (!areAnyChanges) return;
        if (markupMode === 'mixed') {
            await set(updateAnyCardsFromTextAtom, cardsText);
        } else if (markupMode === 'short-only') {
            await set(updateOnlyShortCardsFromTextAtom, cardsText);
        }
        set(textInModalHasBeenChangedAtom, false);
    }) as () => void;

    return (
        <Dialog
            testId={EP_TEST_IDS.cardsAsTextDialog.me}
            dialogName='editCardsAsText'
            className='relative top-5 w-9/12 translate-y-0 gap-5 rounded-md bg-white p-6 shadow-md max-lg:w-10/12 max-sm:top-0 max-sm:w-full max-sm:p-5'
            closeButton={<SaveAndCloseButtonUI onClickAction={onClick} />}>
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
