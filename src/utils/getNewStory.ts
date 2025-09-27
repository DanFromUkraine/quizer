import { FullBook, Story } from '@/src/types/mainDbGlobal';

export default function getNewStory({
        newStoryId,
        bookId,
        fullBook
}: {
        newStoryId: string;
        bookId: string;
        fullBook: FullBook;
}): Story {
        return {
                id: newStoryId,
                choicePointers: [],
                playStartDate: Date.now(),
                bookId,
                bookData: fullBook,
                isCompleted: false,
                timeSpentSec: 0
        };
}
