type MetaPureType = {
  collectionTitle: string;
};

export type CollectionResult = MetaPureType & {
  id: string;
  timestamp: number;
  cards: QuestionCardType[];
};

export type QuestionCardType = {
  id: string;
  questionTitle: string;
  options: {
    isCorrect: boolean;
    optionText: string;
  }[];
};

export interface AddCollectionPageSchema extends DBSchema {
  meta: {
    key: string;
    value: {
      id: string;
      value: string;
    };
  };
  cards: {
    key: string;
    value: QuestionCardType;
  };
}

export type MyDB = IDBPDatabase<AddCollectionPageSchema>;
