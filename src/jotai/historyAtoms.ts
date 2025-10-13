import { atom, Getter, Setter } from 'jotai';
import {
        booksAndStoriesAssociationsAtom,
        booksAtomFamily,
        storiesAtomFamily
} from '@/src/jotai/mainAtoms';
import { MainDbGlobal, Story } from '@/src/types/mainDbGlobal';
import { deleteStoryIdb, updateStoryIdb } from '@/src/utils/idb/main/actions';
import {
        currentStoryIdAtom,
        deleteIdAtom,
        storyIdsAtom
} from '@/src/jotai/idManagers';
import { StoriesByBook } from '@/src/types/historyPage';
import { StorySettings } from '@/src/types/newStory';
import { getCardsForStoryModeRelated } from '@/src/utils/createNewStory/getAllCards';
import getUniqueID from '@/src/utils/getUniqueID';
import { EMPTY_STORY_SETTINGS_ATOM } from '@/src/constants/emptyObjects';
import { getDerivedAtomWithIdb } from '@/src/utils/jotai/getDerivedAtomWithIdb';

export const deleteStoryAtom = getDerivedAtomWithIdb(
        async (_get, set, mainDb, storyId: string) => {
                await deleteStoryIdb(mainDb, storyId);
                storiesAtomFamily.remove(storyId);
                set(deleteIdAtom, {
                        idManager: storyIdsAtom,
                        deleteId: storyId
                });
        }
);

export const finishStoryAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb, storyId: string) => {
                const prevStory = get(storiesAtomFamily(storyId));
                const newStory: Story = {
                        ...prevStory,
                        isCompleted: true
                };
                await updateStoryIdb(mainDb, newStory);
                set(storiesAtomFamily(storyId), newStory);
        }
);






export const storiesSortedByBookAtom = atom((get) => {
        const bookAndStoriesAssociations = get(booksAndStoriesAssociationsAtom);
        const bookIds = Object.keys(bookAndStoriesAssociations);

        return bookIds.map((bookId) => {
                const { bookTitle } = get(booksAtomFamily(bookId));
                return {
                        bookTitle,
                        storyIds: bookAndStoriesAssociations[bookId]
                };
        }) as StoriesByBook[];
});

export const newStorySettingsAtom = atom<StorySettings>(
        EMPTY_STORY_SETTINGS_ATOM
);

export const addNewStoryAtom = getDerivedAtomWithIdb(
        async (
                get,
                set,
                mainDb,
                {
                        settings,
                        bookId,
                        successCallback
                }: {
                        settings: StorySettings;
                        bookId: string;
                        successCallback: (storyId: string) => void;
                }
        ) => {
                const { bookTitle, description } = get(booksAtomFamily(bookId));
                const allCards = getCardsForStoryModeRelated({
                        ...settings,
                        bookId,
                        get
                });
                const newStoryId = getUniqueID();
                const newStory: Story = {
                        id: newStoryId,
                        showAnswersImmediately: false,
                        isCompleted: false,
                        timeSpentSec: 0,
                        playStartDate: 0,
                        bookId,
                        cardIdsOrder: [],
                        explicitCardStoryIds: [],
                        typeInCardStoryIds: [],
                        isCorrectCardStoryIds: [],
                        bookData: {
                                title: bookTitle,
                                description,
                        }
                };
                await updateStoryIdb(mainDb, newStory);
                successCallback(newStoryId);
        }
);
