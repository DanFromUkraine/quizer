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
        history: {};
}

export type ObjectStores = keyof Pick<
        MainDbSchema,
        'books' | 'cards' | 'options'
>;

export type StoreMap = {
        books: Book;
        cards: Card;
        options: Option;
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

export interface History {
        id: string;
        completionTimeSec: number;
        bookData: FullBook;
}
