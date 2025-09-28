import { atom, Getter } from 'jotai';
import {
        booksFamilyAtom,
        cardsFamilyAtom,
        historyFamilyAtom,
        optionsFamilyAtom
} from '@/src/jotai/mainAtoms';
import {
        FullBook,
        FullCard,
        FullOption,
        Story
} from '@/src/types/mainDbGlobal';
import getUniqueID from '@/src/utils/getUniqueID';
import { getDerivedAtom } from '@/src/utils/jotai/mainDbUtils';
import { deleteStoryIdb, updateStoryIdb } from '@/src/utils/idb/main/actions';
import { AddNewStorySuccessHandler } from '@/src/types/jotaiGlobal';
import {
        deleteIdAtom,
        pushNewIdAtom,
        storyIdsAtom
} from '@/src/jotai/idManagers';
import getNewStory from '@/src/utils/getNewStory';

function getFullOption({
        get,
        optionId
}: {
        get: Getter;
        optionId: string;
}): FullOption {
        const { optionTitle, isCorrect } = get(optionsFamilyAtom(optionId));
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
}): FullCard {
        const { cardTitle, childrenIds } = get(cardsFamilyAtom(cardId));
        return {
                title: cardTitle,
                options: childrenIds.map((optionId) =>
                        getFullOption({ get, optionId })
                )
        };
}

function getFullBook(bookId: string) {
        return atom((get) => {
                const { bookTitle, description, lastChangeDate, childrenIds } =
                        get(booksFamilyAtom(bookId));
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

export const addNewStoryAtom = getDerivedAtom(
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
                set(historyFamilyAtom(newStoryId), newStory);
                set(pushNewIdAtom, storyIdsAtom, newStoryId);
                successCallback(newStoryId);
        }
);

export const deleteStoryAtom = getDerivedAtom(
        async (get, set, mainDb, storyId: string) => {
                await deleteStoryIdb(mainDb, storyId);
                historyFamilyAtom.remove(storyId);
                set(deleteIdAtom, {
                        idManager: storyIdsAtom,
                        deleteId: storyId
                });
        }
);


export const finishStoryAtom = getDerivedAtom(async(get, set, mainDb, storyId: string) => {
        const prevStory = get(historyFamilyAtom(storyId));
        const newStory: Story = {
                ...prevStory,
                isCompleted: true
        }
        await updateStoryIdb(mainDb, newStory);
        set(historyFamilyAtom(storyId), newStory);
})