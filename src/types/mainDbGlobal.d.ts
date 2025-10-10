import { DBSchema } from 'idb';
import { DB } from '@/src/types/globals';
import { PlayOption } from '@/src/types/playMode';

export type MainDbGlobal = DB<MainDbSchema>;

export interface MainDbSchema extends DBSchema {
        books: {
                key: string;
                value: Book;
        };
        explicitCards: {
                key: string;
                value: ExplicitCard;
        };
        shortCards: {
                key: string;
                value: TermDefinitionCard;
        };
        options: {
                key: string;
                value: Option;
        };
        stories: {
                key: string;
                value: Story;
        };
        explicitCardStories: {
                key: string;
                value: ExplicitCardStory;
        };
        typeInCardStories: {
                key: string;
                value: TypeInCardStory;
        };
        isCorrectCardStories: {
                key: string;
                value: IsCorrectCardStory;
        };
}

export type ObjectStoreKeysNoHistory = keyof Pick<
        MainDbSchema,
        'books' | 'cards' | 'options'
>;

export type ObjectStoreKeysAll = keyof StoreMap;

export type StoreMap = {
        books: Book;
        explicitCards: ExplicitCard;
        shortCards: TermDefinitionCard;
        options: Option;
        stories: Story;
        explicitCardStories: ExplicitCardStory;
        typeInCardStories: TypeInCardStory;
        isCorrectCardStories: IsCorrectCardStory;
};

export interface Book {
        id: string;
        bookTitle: string;
        lastChangeDate: number;
        description: string;
        explicitCardIds: string[];
        shortCardIds: string[];
        cardIdsOrder: string[];
}

export interface ExplicitCard {
        type: 'explicit';
        id: string;
        cardTitle: string;
        childrenIds: string[];
        explanation: string;
        subtitle: string;
}

export interface TermDefinitionCard {
        type: 'short';
        id: string;
        term: string;
        definition: string;
}

export interface Option {
        id: string;
        isCorrect: boolean;
        optionTitle: string;
}

export interface Story {
        id: string;
        bookId: string;
        isCompleted: boolean;
        showAnswersImmediately: boolean;
        timeSpentSec: number;
        playStartDate: number;
        cardIdsOrder: string[];
        explicitCardStoryIds: string[];
        typeInCardStoryIds: string[];
        isCorrectCardStoryIds: string[];
        bookData: {
                title: string;
                description: string;
        };
}

export interface ExplicitCardStory {
        id: string;
        title: string;
        subtitle: string;
        explanation: string;
        options: PlayOption[];
}

export interface TypeInCardStory {
        id: string;
        definition: string;
        expectedInput: string;
}

export interface IsCorrectCardStory {
        id: string;
        term: string;
        definition: string;
        isCorrect: boolean;
}

export type BooksAndStoriesAssociations = {
        [key: string]: string[];
};
