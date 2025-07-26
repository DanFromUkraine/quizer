import { DBSchema } from "idb";
import {
  CollectionResult,
  QuestionCardType,
} from "../AddCollectionPageDB/types";

//////// BOTH SUITABLE

type LoggedQuestionCard = {
  answerChoosed: number | undefined;
} & QuestionCardType;

type LoggedCollection = {
  collectionTitle: string;
  cards: LoggedQuestionCard[];
};

//////// COMPLETED COLLECTION TYPES

type CompleteAttemp = {
  endTime: number;
  duration: number;
  correctAnswers: number;
  numOfQuestions: number;
  collection: LoggedCollection;
};

type CompleteCollection = {
  collectionID: string;
  attemps: CompleteAttemp[];
};

//////// INCOMPLETE COLLECTION TYPES

type Attemp = {
  startTime: number;
  duration: number;
  correctAnswers: number;
  numOfQuestions: number;
  collection: LoggedCollection;
};

type IncompleteCollection = {
  collectionID: string;
};

export interface HistoryDBInterface extends DBSchema {
  completed: {
    key: string;
    value: CompleteCollection;
  };
  incomplete: {
    key: string;
    value: IncompleteCollection;
  };
}
