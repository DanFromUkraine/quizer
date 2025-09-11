import { DBSchema, IDBPDatabase } from 'idb';

type MetaPureType = {
        collectionTitle: string;
};

export type CollectionResult = MetaPureType & {
        id: string;
        timestamp: number;
        cards: CreateModeQuestionCardType[];
};

export type CreateModeQuestionCardType = {
        id: number;
        questionTitle: string;
        numberOfCorrectAnswers: number;
        options: {
                isCorrect: boolean;
                optionText: string;
        }[];
};

export interface CollectionDbSchema extends DBSchema {
        meta: {
                key: string;
                value: {
                        id: keyof MetaPureType;
                        value: string;
                };
        };
        cards: {
                key: number;
                value: CreateModeQuestionCardType;
        };
}

export type MyDB = IDBPDatabase<CollectionDbSchema>;

export type CreateCollectionDB = IDBPDatabase<CollectionDbSchema>;
export type ObservableCreateCollectionContext =
        Context<Observable<CreateCollectionDB> | null>;
