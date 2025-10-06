'use client';

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import {
        BooksAndStoriesAssociations,
        MainDbGlobal
} from '@/src/types/mainDbGlobal';
import { getAtomFactory, getHistoryAtom } from '@/src/utils/jotai/mainDbUtils';
import computeBooksAndStoriesAssociations from '@/src/utils/jotai/computeBooksAndStoriesAssociations';
import { storyIdsAtom } from '@/src/jotai/idManagers';

export const mainDbAtom = atom<MainDbGlobal>();
export const booksAtomFamily = atomFamily(getAtomFactory('books'));
export const explicitCardsAtomFamily = atomFamily(
        getAtomFactory('explicitCards')
);
export const optionsAtomFamily = atomFamily(getAtomFactory('options'));
export const storiesAtomFamily = atomFamily(getHistoryAtom);
export const shortCardsAtomFamily = atomFamily(getAtomFactory('shortCards'));

export const booksAndStoriesAssociationsAtom =
        atom<BooksAndStoriesAssociations>((get) => {
                const storyIds = get(storyIdsAtom);
                const allStories = storyIds.map((storyId) =>
                        get(storiesAtomFamily(storyId))
                );

                return computeBooksAndStoriesAssociations(allStories);
        });
export const getAssociationsForBookAtomOnlyIncomplete = (bookId: string) =>
        atom((get) => {
                const allAssociations = get(booksAndStoriesAssociationsAtom);
                const associationsForBook = allAssociations[bookId];
                return associationsForBook.filter((storyId) => {
                        const fullStory = get(storiesAtomFamily(storyId));
                        return !fullStory.isCompleted;
                });
        });
