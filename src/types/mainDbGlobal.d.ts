import { DBSchema } from 'idb';
import { DB } from '@/src/types/globals';
import { FullBook } from '@/src/types/playMode';

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
        history: {
                key: string;
                value: Story;
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
        history: Story;
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
        isCompleted: boolean;
        bookId: string;
        timeSpentSec: number;
        bookData: FullBook;
        playStartDate: number;
        choicePointers: (number | string)[];
}

export type BooksAndStoriesAssociations = {
        [key: string]: string[];
};
