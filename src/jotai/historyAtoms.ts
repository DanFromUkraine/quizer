import { atom, Getter } from 'jotai';
import {
        booksAndStoriesAssociationsAtom,
        booksAtomFamily,
        explicitCardsAtomFamily,
        storiesAtomFamily,
        optionsAtomFamily
} from '@/src/jotai/mainAtoms';
import {
        FullBook,
        FullCard,
        FullOption,
        FullTermDefinition,
        Story
} from '@/src/types/mainDbGlobal';
import getUniqueID from '@/src/utils/getUniqueID';
import { getDerivedAtomWithIdb } from '@/src/utils/jotai/mainDbUtils';
import { deleteStoryIdb, updateStoryIdb } from '@/src/utils/idb/main/actions';
import { AddNewStorySuccessHandler } from '@/src/types/jotaiGlobal';
import {
        currentStoryIdAtom,
        deleteIdAtom,
        pushNewIdAtom,
        storyIdsAtom
} from '@/src/jotai/idManagers';
import getNewStory from '@/src/utils/getNewStory';
import { StoriesByBook } from '@/src/types/historyPage';

function getFullOption({
        get,
        optionId
}: {
        get: Getter;
        optionId: string;
}): FullOption {
        const { optionTitle, isCorrect } = get(optionsAtomFamily(optionId));
        return {
                title: optionTitle,
                isCorrect
        };
}

function getFullCard({
        get,
        cardId
}: {
        get: Getter;
        cardId: string;
}): FullCard | FullTermDefinition {
        const card = get(explicitCardsAtomFamily(cardId));
        if (card.type === 'explicit') {
                return {
                        title: card.cardTitle,
                        options: card.childrenIds.map((optionId) =>
                                getFullOption({ get, optionId })
                        )
                };
        } else {
                return {
                        term: card.term,
                        definition: card.definition
                };
        }
}

function getFullBook(bookId: string) {
        return atom((get) => {
                const { bookTitle, description, lastChangeDate, childrenIds } =
                        get(booksAtomFamily(bookId));
                return {
                        title: bookTitle,
                        description,
                        creationDate: lastChangeDate,
                        cards: childrenIds.map((cardId) =>
                                getFullCard({ get, cardId })
                        )
                } as FullBook;
        });
}

export const addNewStoryAtom = getDerivedAtomWithIdb(
        async (
                get,
                set,
                mainDb,
                bookId: string,
                successCallback: AddNewStorySuccessHandler
        ) => {
                const fullBook = get(getFullBook(bookId));
                const newStoryId = getUniqueID();
                const newStory = getNewStory({ fullBook, bookId, newStoryId });
                await updateStoryIdb(mainDb, newStory);
                set(storiesAtomFamily(newStoryId), newStory);
                set(pushNewIdAtom, storyIdsAtom, newStoryId);
                successCallback(newStoryId);
        }
);

export const deleteStoryAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb, storyId: string) => {
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

export const getChoiceIndexMade = (cardIndex: number) =>
        atom((get) => {
                const storyId = get(currentStoryIdAtom);
                return get(storiesAtomFamily(storyId)).choicePointers[
                        cardIndex
                ];
        });

export const saveChoice = getDerivedAtomWithIdb(
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
                if (typeof choicePointers[cardIndex] !== 'undefined') return;
                const newChoicePointers = [...choicePointers];
                newChoicePointers[cardIndex] = optionIndex;
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
