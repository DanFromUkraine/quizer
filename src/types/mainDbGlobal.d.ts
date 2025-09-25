import { DBSchema } from 'idb';
import { DB } from '@/src/types/globals';

export type MainDbGlobal = DB<MainDbSchema>;

export interface MainDbSchema extends DBSchema {
        books: {
                key: string;
                value: Book;
        };
        cards: {
                key: string;
                value: Card;
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
        cards: Card;
        options: Option;
        history: Story;
};

export interface Book {
        id: string;
        bookTitle: string;
        lastChangeDate: number;
        childrenIds: string[];
        description: string;
}

export interface Card {
        id: string;
        cardTitle: string;
        childrenIds: string[];
}

export interface Option {
        id: string;
        isCorrect: boolean;
        optionTitle: string;
}

interface OptionTermD {
        term: string;
        determination: string;
}

interface OptionTypeIn {
        term: string;
        expectedResult: string;
}

interface FullOption {
        title: string;
        isCorrect: boolean;
}

interface FullCard {
        title: string;
        options: FullOption[];
}

interface FullBook {
        title: string;
        creationDate: number;
        description: string;
        cards: FullCard[];
}

export interface Story {
        id: string;
        isCompleted: boolean;
        bookId: string;
        timeSpentSec: number;
        bookData: FullBook;
}

export type BooksAndStoriesAssociations = {
        [key: string]: string[];
};
