import { atom, PrimitiveAtom } from 'jotai';
import {
        booksAndStoriesAssociationsAtom,
        booksAtomFamily,
        explicitCardStoriesAtomFamily,
        isCorrectCardStoriesAtomFamily,
        storiesAtomFamily,
        typeInCardStoriesAtomFamily
} from '@/src/jotai/mainAtoms';
import { deleteStoryIdb, updateStoryIdb } from '@/src/utils/idb/main/actions';
import { deleteIdAtom, storyIdsAtom } from '@/src/jotai/idManagers';
import { StoriesByBook } from '@/src/types/historyPage';
import { StorySettings } from '@/src/types/newStory';
import { initPlayCardsAndGetTheirIds } from '@/src/utils/createNewStory/getAllCards';
import getUniqueID from '@/src/utils/getUniqueID';
import { EMPTY_STORY_SETTINGS_ATOM } from '@/src/constants/emptyObjects';
import { getDerivedAtomWithIdb } from '@/src/utils/jotai/getDerivedAtomWithIdb';
import { Story } from '@/src/types/stories';
import { AtomFamily, WithInitialValue } from '@/src/types/jotaiGlobal';

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
                const {
                        cardIdsOrder,
                        playExplicitCardIds,
                        typeInCardIds,
                        isCorrectCardIds
                } = initPlayCardsAndGetTheirIds({
                        ...settings,
                        bookId,
                        get,
                        set
                });

                const newStoryId = getUniqueID();
                const newStory: Story = {
                        id: newStoryId,
                        showAnswersImmediately: false,
                        isCompleted: false,
                        timeSpentSec: 0,
                        playStartDate: 0,
                        bookId,
                        cardIdsOrder,
                        explicitCardStoryIds: playExplicitCardIds,
                        typeInCardStoryIds: typeInCardIds,
                        isCorrectCardStoryIds: isCorrectCardIds,
                        bookData: {
                                title: bookTitle,
                                description
                        }
                };
                await updateStoryIdb(mainDb, newStory);
                successCallback(newStoryId);
        }
);

export function getNumOfChoicesCalculator<
        T extends { currentValue: unknown | null }
>(
        /* 'todo' - move this function somewhere else, where it should be  */
        targetAtomFamily: AtomFamily<
                string,
                PrimitiveAtom<T> & WithInitialValue<T>
        >
) {
        return (ids: string[]) =>
                atom((get) => {
                        let count = 0;

                        ids.forEach((id) => {
                                const { currentValue } = get(
                                        targetAtomFamily(id)
                                );
                                if (currentValue !== null) count++;
                        });

                        return count;
                });
}

const getCalcNumOfChoicesInExpCardStoriesAtom = getNumOfChoicesCalculator(
        explicitCardStoriesAtomFamily
);
const getCalcNumOfChoicesInTypeInCardStoriesAtom = getNumOfChoicesCalculator(
        typeInCardStoriesAtomFamily
);
const getCalcNumOfChoicesInIsCorrectCardStoriesAtom = getNumOfChoicesCalculator(
        isCorrectCardStoriesAtomFamily
);

const getCalcNumOfChoicesAtom = ({
        explicitCardStoryIds,
        typeInCardStoryIds,
        isCorrectCardStoryIds
}: {
        explicitCardStoryIds: string[];
        typeInCardStoryIds: string[];
        isCorrectCardStoryIds: string[];
}) =>
        atom((get) => {
                const expCardChoicesCount = get(
                        getCalcNumOfChoicesInExpCardStoriesAtom(
                                explicitCardStoryIds
                        )
                );
                const typeInCardChoicesCount = get(
                        getCalcNumOfChoicesInTypeInCardStoriesAtom(
                                typeInCardStoryIds
                        )
                );
                const isCorrectCardChoicesCount = get(
                        getCalcNumOfChoicesInIsCorrectCardStoriesAtom(
                                isCorrectCardStoryIds
                        )
                );
                return (
                        expCardChoicesCount +
                        typeInCardChoicesCount +
                        isCorrectCardChoicesCount
                );
        });

export const getStoryCompletionDataAtom = (storyId: string) =>
        atom((get) => {
                const {
                        cardIdsOrder,
                        explicitCardStoryIds,
                        typeInCardStoryIds,
                        isCorrectCardStoryIds
                } = get(storiesAtomFamily(storyId));
                const numOfCards = cardIdsOrder.length;
                const numOfChoices = get(
                        getCalcNumOfChoicesAtom({
                                explicitCardStoryIds,
                                typeInCardStoryIds,
                                isCorrectCardStoryIds
                        })
                );
                const completionPercentage =
                        Math.round(numOfChoices / numOfCards) * 100;

                return {
                        completionPercentage,
                        numOfChoices,
                        numOfCards
                };
        });
