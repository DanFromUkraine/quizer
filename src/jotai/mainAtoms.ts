'use client';

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import type {
        MainDbGlobal
} from '@/src/types/mainDbGlobal';
import { getAtomFactory } from '@/src/utils/jotai/mainDbUtils';

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

