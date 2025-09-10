import { DBSchema } from 'idb';
import { DB } from '@/app/lib/db/types';

export type MainDb = DB<MainDbSchema>;

interface MainDbSchema extends DBSchema {
        allBooks: {
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

export interface Book {
        id: string;
        name: string;
        createDate: number;
        cardIds: string;
}

export interface Card {
        id: string;
        cardTitle: string;
        optionIds: string[];
}

export interface Option {
        id: string;
        isCorrect: boolean;
        content: string;
}
