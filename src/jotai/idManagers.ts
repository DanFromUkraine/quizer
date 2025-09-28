import { atom } from 'jotai';
import { IdManagerAtom } from '@/src/types/jotaiGlobal';
import { getListWhereNoSuchIds } from '@/src/utils/getLists';

export const storyIdsAtom = atom<string[]>([]);
export const booksIdsAtom = atom<string[]>([]);
export const currentBookIdAtom = atom('');
export const currentBookIdForStoriesDialogAtom = atom('');
export const currentStoryIdAtom = atom('');

export const pushNewIdAtom = atom(
        null,
        (_get, set, idManager: IdManagerAtom, newId: string) => {
                set(idManager, (prev) => [...prev, newId]);
        }
);

export const deleteIdAtom = atom(
        null,
        (
                _get,
                set,
                {
                        idManager,
                        deleteId
                }: { idManager: IdManagerAtom; deleteId: string }
        ) => {
                set(idManager, (prev) =>
                        getListWhereNoSuchIds(prev, [deleteId])
                );
        }
);
