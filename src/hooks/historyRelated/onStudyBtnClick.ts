'use client';

import { useAtomCallback } from 'jotai/utils';
import { booksAtomFamily } from '@/src/jotai/mainAtoms';
import { showSnackbarAtom } from '@/src/jotai/snackbarAtoms';
import { openBookStoryDialog } from '@/src/jotai/storiesForBookDialogInfoAtoms';
import { openNewStorySettingsDialogAtom } from '@/src/jotai/newStoryParamsModal';
import { getAssociationsForBookAtomOnlyIncomplete } from '@/src/jotai/historyAtoms';

export default function useStudyButtonClickHandler(bookId: string) {
        // 'todo' - move in
        return useAtomCallback((get, set) => {
                const { cardIdsOrder } = get(booksAtomFamily(bookId));

                const incompleteStoryIds = get(
                        getAssociationsForBookAtomOnlyIncomplete(bookId)
                );

                if (cardIdsOrder.length === 0) {
                        set(showSnackbarAtom, {
                                snackbarName: 'noCardsErrorSnackbar',
                                timeMS: 5_000
                        });
                } else if (incompleteStoryIds.length > 0) {
                        set(openBookStoryDialog, bookId);
                } else {
                        set(openNewStorySettingsDialogAtom, bookId);
                }
        });
}
