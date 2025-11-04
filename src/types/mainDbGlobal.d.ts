import type { DBSchema } from 'idb';
import type { DB } from '@/src/types/globals';
import type {
        ExplicitCardStory,
        IsCorrectCardStory,
        Story,
        TypeInCardStory
} from '@/src/types/stories';

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

export type BooksAndStoriesAssociations = {
        [key: string]: string[];
};

export type AddEmptyAction<T> = (
        mainDb: MainDbGlobal,
        Item: T
) => Promise<string>;
export type UpdateAction<T> = (
        mainDb: MainDbGlobal,
        Item: T
) => Promise<string>;
export type DeleteAction = (
        mainDb: MainDbGlobal,
        deleteId: string
) => Promise<void>;
