import { DBSchema } from "idb";

type MetaPureType = {
  collectionTitle: string;
};

export type CollectionResult = MetaPureType & {
  id: string;
  timestamp: number;
  cards: QuestionCardType[];
};

export type QuestionCardType = {
  id: number;
  questionTitle: string;
  numberOfCorrectAnswers: number;
  options: {
    isCorrect: boolean;
    optionText: string;
  }[];
};

export interface AddCollectionPageSchema extends DBSchema {
  meta: {
    key: string;
    value: {
      id: keyof MetaPureType;
      value: string;
    };
  };
  cards: {
    key: number;
    value: QuestionCardType;
  };
}

export type MyDB = IDBPDatabase<AddCollectionPageSchema>;
