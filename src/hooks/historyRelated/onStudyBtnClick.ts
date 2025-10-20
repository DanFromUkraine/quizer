'use client';

import { useAtomCallback } from 'jotai/utils';
import {
        booksAndStoriesAssociationsAtom,
        booksAtomFamily
} from '@/src/jotai/mainAtoms';
import { showSnackbarAtom } from '@/src/jotai/snackbarAtoms';
import { openBookStoryDialog } from '@/src/jotai/storiesForBookDialogInfoAtoms';
import { openNewStorySettingsDialogAtom } from '@/src/jotai/newStoryParamsModal';

export default function useStudyButtonClickHandler(bookId: string) {
        return useAtomCallback((get, set) => {
                const { cardIdsOrder } = get(booksAtomFamily(bookId));

                const booksAndStoriesAssociations = get(
                        booksAndStoriesAssociationsAtom
                );

                if (cardIdsOrder.length === 0) {
                        set(showSnackbarAtom, {
                                snackbarName: 'noCardsErrorSnackbar',
                                timeMS: 5_000
                        });
                } else if (bookId in booksAndStoriesAssociations) {
                        set(openBookStoryDialog, bookId);
                } else {
                        set(openNewStorySettingsDialogAtom, bookId);
                }
        });
}
