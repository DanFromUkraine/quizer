'use client';

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import type {
        BooksAndStoriesAssociations,
        MainDbGlobal
} from '@/src/types/mainDbGlobal';
import { getAtomFactory } from '@/src/utils/jotai/mainDbUtils';
import computeBooksAndStoriesAssociations from '@/src/utils/jotai/computeBooksAndStoriesAssociations';
import { storyIdsAtom } from '@/src/jotai/idManagers';

export const isInitializationFromIdbCompletedAtom = atom(false);
export const mainDbAtom = atom<MainDbGlobal>();
export const booksAtomFamily = atomFamily(getAtomFactory('books'));
export const explicitCardsAtomFamily = atomFamily(
        getAtomFactory('explicitCards')
);
export const optionsAtomFamily = atomFamily(getAtomFactory('options'));
export const storiesAtomFamily = atomFamily(getAtomFactory('stories'));
export const shortCardsAtomFamily = atomFamily(getAtomFactory('shortCards'));
export const explicitCardStoriesAtomFamily = atomFamily(
        getAtomFactory('explicitCardStories')
);
export const typeInCardStoriesAtomFamily = atomFamily(
        getAtomFactory('typeInCardStories')
);
export const isCorrectCardStoriesAtomFamily = atomFamily(
        getAtomFactory('isCorrectCardStories')
);

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
