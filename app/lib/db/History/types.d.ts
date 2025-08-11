import { DBSchema } from "idb";

//// Both suitable

type CollectionStoryGen = {
  collectionName: string;
};

type TestOption = {
  optionText: string;
  isCorrect: boolean;
  optionChosen: boolean;
};

export type TestCard = {
  questionTitle: string;
  options: TestOption[];
};

type Attemp = {
  attempID: string;
  cards: TestCard[];
};

//// Complete

type CompleteAttemp = Attemp & {
  endTime: number;
  duration: number;
};
type CollectionStoryComplete = CollectionStoryGen & {
  attemps: CompleteAttemp[];
};

//// Incomplete

export type IncompleteAttemp = Attemp & {
  startTime: number;
};
export type CollectionStoryIncomplete = CollectionStoryGen & {
  attemps: IncompleteAttemp[];
  attemp: IncompleteAttemp; // this is temporary property to simplify overall developing
};

////

export interface HistoryDBInterface extends DBSchema {
  complete: {
    key: string;
    value: CollectionStoryComplete;
  };
  incomplete: {
    key: string;
    value: CollectionStoryIncomplete;
  };
}
