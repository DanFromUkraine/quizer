// 'todo' - when everything will be ready, I need to create more factories, to shorten amount of code
// 'todo' - need to create adequate way to manage delete/add id lists. Because 30 async overwrites of db in a row with difference in 1 item ain't so good rn

/*

        now only few problems:
        1. For some reason if erase all the text, all the elements except the last one stay, until page is not reloaded.
        2.

 */

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
export const explicitCardsAtomFamily = atomFamily(getAtomFactory('explicitCards'));
export const optionsAtomFamily = atomFamily(getAtomFactory('options'));
export const storiesAtomFamily = atomFamily(getHistoryAtom);
export const shortCardsAtomFamily = atomFamily(getAtomFactory('shortCards'));

export const booksAndStoriesAssociationsAtom =
        atom<BooksAndStoriesAssociations>((get) => {
                const storyIds = get(storyIdsAtom);
                const allStories = storyIds.map((storyId) =>
                        get(storiesAtomFamily(storyId))
                );

                console.debug({ allStories });

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

