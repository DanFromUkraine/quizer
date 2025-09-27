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
import {
        getAtomFactory,
        getCardsAsText,
        getHistoryAtom
} from '@/src/utils/jotai/mainDbUtils';
import computeBooksAndStoriesAssociations from '@/src/utils/jotai/computeBooksAndStoriesAssociations';
import { currentBookIdAtom, storyIdsAtom } from '@/src/jotai/idManagers';

export const mainAtoms = atom<MainDbGlobal>();
export const booksFamilyAtom = atomFamily(getAtomFactory('books'));
export const cardsFamilyAtom = atomFamily(getAtomFactory('cards'));
export const optionsFamilyAtom = atomFamily(getAtomFactory('options'));
export const historyFamilyAtom = atomFamily(getHistoryAtom);
export const booksAndStoriesAssociationsAtom = atom<BooksAndStoriesAssociations>(
        (get) => {
                const storyIds = get(storyIdsAtom);
                const allStories = storyIds.map((storyId) =>
                        get(historyFamilyAtom(storyId))
                );

                console.debug({allStories})

                return computeBooksAndStoriesAssociations(allStories);
        },
);

export const getBookCardsAsTextAtom = atom((get) => {
        const bookId = get(currentBookIdAtom);
        const { childrenIds } = get(booksFamilyAtom(bookId));

        return getCardsAsText(childrenIds, get).join('');
});

export const cardsTextAtom = atom('');
