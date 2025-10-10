import { atom } from 'jotai';
import {
        booksAndStoriesAssociationsAtom,
        booksAtomFamily,
        storiesAtomFamily
} from '@/src/jotai/mainAtoms';
import { Story } from '@/src/types/mainDbGlobal';
import { getDerivedAtomWithIdb } from '@/src/utils/jotai/mainDbUtils';
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

export const getChoiceInfoAtom = (cardIndex: number) =>
        atom((get) => {
                const storyId = get(currentStoryIdAtom);
                return get(storiesAtomFamily(storyId)).choicePointers[
                        cardIndex
                ];
        });

export const updateChoiceAtom = getDerivedAtomWithIdb(
        async (
                get,
                set,
                mainDb,
                {
                        cardIndex,
                        optionIndex
                }: { cardIndex: number; optionIndex: number }
        ) => {
                const storyId = get(currentStoryIdAtom);
                const { choicePointers, ...other } = get(
                        storiesAtomFamily(storyId)
                );
                const newChoicePointers = [...choicePointers];

                if (!choicePointers[cardIndex]) {
                        newChoicePointers[cardIndex] = optionIndex;
                } else {
                        newChoicePointers[cardIndex] = null;
                }
                const newStory: Story = {
                        ...other,
                        choicePointers: newChoicePointers
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
                        choicePointers: new Array(allCards.length).fill(null),
                        bookId,
                        bookData: {
                                title: bookTitle,
                                description,
                                creationDate: Date.now(),
                                cards: allCards
                        }
                };
                await updateStoryIdb(mainDb, newStory);
                successCallback(newStoryId);
        }
);
