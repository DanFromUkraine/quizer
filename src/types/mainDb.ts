import { DBSchema } from 'idb';
import { DB } from '@/src/types/globals';

export type MainDb = DB<MainDbSchema>;

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
