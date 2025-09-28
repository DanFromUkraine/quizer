'use client';

import { useAtomCallback } from 'jotai/utils';
import {
        booksAndStoriesAssociationsAtom,
        booksFamilyAtom
} from '@/src/jotai/mainAtoms';
import { useRouter } from 'next/navigation';
import { addNewStoryAtom } from '@/src/jotai/historyAtoms';
import { showSnackbarAtom } from '@/src/jotai/snackbarAtoms';
import { openBookStoryDialog } from '@/src/jotai/storiesForBookDialogInfoAtoms';

export default function useStudyButtonClickHandler(bookId: string) {
        const router = useRouter();
        return useAtomCallback((get, set) => {
                const { childrenIds: cardIds } = get(booksFamilyAtom(bookId));

                const booksAndStoriesAssociations = get(
                        booksAndStoriesAssociationsAtom
                );

                if (cardIds.length === 0) {
                        set(showSnackbarAtom, {
                                snackbarName: 'noCardsErrorSnackbar',
                                timeMS: 5_000
                        });
                } else if (bookId in booksAndStoriesAssociations) {
                        set(openBookStoryDialog, bookId);
                } else {
                        set(addNewStoryAtom, bookId, (newStoryId) => {
                                router.push(`/play?storyId=${newStoryId}`);
                        });
                }
        });
}
