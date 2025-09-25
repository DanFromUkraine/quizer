import { atom, Getter } from 'jotai';
import {
        booksFamilyAtom,
        cardsFamilyAtom,
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
import { updateStoryIdb } from '@/src/utils/idb/main/actions';

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

export const addNewStory = getDerivedAtom(
        async (get, set, mainDb, bookId: string) => {
                const fullBook = get(getFullBook(bookId));
                const newStoryId = getUniqueID();
                const newStory: Story = {
                        id: newStoryId,
                        bookId,
                        bookData: fullBook,
                        isCompleted: false,
                        timeSpentSec: 0
                };
                await updateStoryIdb(mainDb, newStory);

        }
);


export const deleteStory = getDerivedAtom(async(get, set, mainDb, storyId: string) => {

})