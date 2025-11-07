import { atom, Atom, PrimitiveAtom } from 'jotai';
import {
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
import { deleteExplicitCardStoryAtom } from '@/src/jotai/explicitCardStoryAtoms';
import { deleteTypeInCardStoryAtom } from '@/src/jotai/typeInCardStoryAtoms';
import { deleteIsCorrectCardStoryAtom } from '@/src/jotai/isCorrectCardStoryAtoms';
import { BooksAndStoriesAssociations } from '../types/mainDbGlobal';
import computeBooksAndStoriesAssociations from '../utils/jotai/computeBooksAndStoriesAssociations';

export const deleteStoryAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb, storyId: string) => {
                await deleteStoryIdb(mainDb, storyId);
                const {
                        explicitCardStoryIds,
                        typeInCardStoryIds,
                        isCorrectCardStoryIds
                } = get(storiesAtomFamily(storyId));

                await Promise.all([
                        ...explicitCardStoryIds.map((id) =>
                                set(deleteExplicitCardStoryAtom, id)
                        ),
                        ...typeInCardStoryIds.map((id) =>
                                set(deleteTypeInCardStoryAtom, id)
                        ),
                        ...isCorrectCardStoryIds.map((id) =>
                                set(deleteIsCorrectCardStoryAtom, id)
                        )
                ]);

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

export function getNumOfChoicesCalculator<T extends { currentValue: unknown }>(
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

                                if (
                                        typeof currentValue === 'string' &&
                                        currentValue.length === 0
                                )
                                        return;
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
                const completionPercentage = Math.round(
                        (numOfChoices / numOfCards) * 100
                );

                return {
                        completionPercentage,
                        numOfChoices,
                        numOfCards
                };
        });

export const getExpStoryCardCorrectOptionIndexAtom = (cardId: string) =>
        atom((get) => {
                /* 'todo' - need to make it suitable for multichoice cards */
                const { options } = get(explicitCardStoriesAtomFamily(cardId));
                const correctIndexes: number[] = [];

                for (let i = 0; i < options.length; i++) {
                        const currOption = options[i];
                        if (currOption.isCorrect) correctIndexes.push(i);
                }

                return correctIndexes;
        });

export const getIfExpStoryCardCorrectAtom = (cardId: string) =>
        atom((get) => {
                const { currentValue } = get(
                        explicitCardStoriesAtomFamily(cardId)
                );
                const correctIndexes = get(
                        getExpStoryCardCorrectOptionIndexAtom(cardId)
                );

                return correctIndexes.every((x) => {
                        return currentValue.includes(x);
                });
        });

export const getIfTypeInCardCorrectAtom = (cardId: string) =>
        atom((get) => {
                const { currentValue, expectedInput } = get(
                        typeInCardStoriesAtomFamily(cardId)
                );

                return (
                        currentValue.toLowerCase().trim() ===
                        expectedInput.toLowerCase().trim()
                );
        });

export const getIsCorrectCardCorrectAtom = (cardId: string) =>
        atom((get) => {
                const { currentValue, isCorrect } = get(
                        isCorrectCardStoriesAtomFamily(cardId)
                );

                return currentValue === isCorrect;
        });

export const countCorrectChoicesAtom = ({
        cardIds,
        counter,
        step
}: {
        cardIds: string[];
        counter: (cardId: string) => Atom<boolean>;
        step: number;
}) =>
        atom((get) => {
                let count = 0;

                for (const cardId of cardIds) {
                        const isCorrect = get(counter(cardId));
                        if (isCorrect) count += step;
                }

                return count;
        });

// 'todo' - move these to constants
export const EXPLICIT_CARD_STEP = 1;
export const TYPE_IN_CARD_STEP = 2;
export const IS_CORRECT_CARD_STEP = 0.5;

export const getOverAllCountOfCorrectAnswersAtom = (storyId: string) =>
        atom((get) => {
                const {
                        explicitCardStoryIds,
                        typeInCardStoryIds,
                        isCorrectCardStoryIds
                } = get(storiesAtomFamily(storyId));

                const countOfAllCorrChoicesExpCardStories = get(
                        countCorrectChoicesAtom({
                                cardIds: explicitCardStoryIds,
                                counter: getIfExpStoryCardCorrectAtom,
                                step: 1
                        })
                );
                const countOfAllCorrChoicesTypeInCardStories = get(
                        countCorrectChoicesAtom({
                                cardIds: typeInCardStoryIds,
                                counter: getIfTypeInCardCorrectAtom,
                                step: 1
                        })
                );
                const countOfAllCorrChoicesIsCorrectCardStories = get(
                        countCorrectChoicesAtom({
                                cardIds: isCorrectCardStoryIds,
                                counter: getIsCorrectCardCorrectAtom,
                                step: 1
                        })
                );

                return (
                        countOfAllCorrChoicesExpCardStories +
                        countOfAllCorrChoicesTypeInCardStories +
                        countOfAllCorrChoicesIsCorrectCardStories
                );
        });

const countCardsPointsAtom = ({
        numOfCards,
        multiplier
}: {
        numOfCards: number;
        multiplier: number;
}) => numOfCards * multiplier;

export const getOverAllCountAtom = (storyId: string) =>
        atom((get) => {
                const {
                        explicitCardStoryIds,
                        typeInCardStoryIds,
                        isCorrectCardStoryIds
                } = get(storiesAtomFamily(storyId));

                const expCardStoriesPointsCount = countCardsPointsAtom({
                        numOfCards: explicitCardStoryIds.length,
                        multiplier: EXPLICIT_CARD_STEP
                });
                const typeInCardStoriesPointsCount = countCardsPointsAtom({
                        numOfCards: typeInCardStoryIds.length,
                        multiplier: TYPE_IN_CARD_STEP
                });
                const isCorrectCardStoriesPointsCount = countCardsPointsAtom({
                        numOfCards: isCorrectCardStoryIds.length,
                        multiplier: IS_CORRECT_CARD_STEP
                });

                return (
                        expCardStoriesPointsCount +
                        typeInCardStoriesPointsCount +
                        isCorrectCardStoriesPointsCount
                );
        });

export const getStoryResultsAtom = (storyId: string) =>
        atom((get) => {
                const countGainedPoints = get(
                        getOverAllCountOfCorrectAnswersAtom(storyId)
                );
                const countAllPoints = get(getOverAllCountAtom(storyId));

                const successPercentage = Math.floor(
                        (countGainedPoints / countAllPoints) * 100
                );
                const markIn12PointsSystem = Math.round(
                        (successPercentage * 12) / 100
                );

                return {
                        countAllPoints,
                        countGainedPoints,
                        successPercentage,
                        markIn12PointsSystem
                };
        });

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
                const associationsForBook: string[] =
                        allAssociations[bookId] || [];
                return associationsForBook.filter((storyId) => {
                        const fullStory = get(storiesAtomFamily(storyId));
                        return !fullStory.isCompleted;
                });
        });
