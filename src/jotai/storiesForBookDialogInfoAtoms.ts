import { atom } from 'jotai';
import {
        booksAndStoriesAssociationsAtom,
        booksFamilyAtom
} from '@/src/jotai/mainAtoms';
import {
        hideDialogAtom,
        openDialogAtom
} from '@/src/jotai/dialogVisibilityFamily';
import { addNewStoryAtom } from '@/src/jotai/historyAtoms';
import { AddNewStorySuccessHandler } from '@/src/types/jotaiGlobal';
import { currentBookIdForStoriesDialogAtom } from '@/src/jotai/idManagers';

interface BookStoryDialogInfo {
        bookTitle: string;
        storyIds: string[];
        createOnAddNewStoryClick: (c: AddNewStorySuccessHandler) => () => void;
}

const EMPTY_STORIES_FOR_BOOK: BookStoryDialogInfo = {
        bookTitle: '',
        storyIds: [],
        createOnAddNewStoryClick: () => () => {}
};

export const storiesForBookDialogInfoAtom = atom<BookStoryDialogInfo>(
        EMPTY_STORIES_FOR_BOOK
);

export const closeAndClearBookStoryDialog = atom(null, (_get, set) => {
        set(hideDialogAtom, 'storiesForBook');
        set(storiesForBookDialogInfoAtom, EMPTY_STORIES_FOR_BOOK);
});

export const updateBookStoriesDataAtom = atom(
        null,
        (get, set, bookId: string) => {
                const newAssociations = get(booksAndStoriesAssociationsAtom);
                const storyIds = newAssociations[bookId];
                if (typeof storyIds === "undefined") {
                        set(hideDialogAtom, 'storiesForBook');
                } else {
                        set(storiesForBookDialogInfoAtom, (prev) => ({
                                ...prev,
                                storyIds
                        }));
                }
        }
);

export const openBookStoryDialog = atom(null, (get, set, bookId: string) => {
        const { bookTitle } = get(booksFamilyAtom(bookId));
        const associations = get(booksAndStoriesAssociationsAtom);
        const storyIds = associations[bookId];
        const createOnAddNewStoryClick =
                (onSuccess: AddNewStorySuccessHandler) => () => {
                        set(closeAndClearBookStoryDialog);
                        set(addNewStoryAtom, bookId, onSuccess);
                };

        set(currentBookIdForStoriesDialogAtom, bookId);

        set(storiesForBookDialogInfoAtom, {
                bookTitle,
                storyIds,
                createOnAddNewStoryClick
        });
        set(openDialogAtom, 'storiesForBook');
});
