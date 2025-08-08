import { DBSchema } from "idb";
import {
  CollectionResult,
  QuestionCardType,
} from "../AddCollectionPageDB/types";

//// Both suitable

type CollectionStoryGen = {
  collectionName: string;
};

type Option = {
  optionText: string;
  isCorrect: boolean;
  optionChosen: boolean;
};

type Card = {
  questionTitle: string;
  options: Option[];
};

type Attemp = {
  attempID: string;
  cards: Card[];
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

type IncompleteAttemp = Attemp & {
  startTime: number;
};
type CollectionStoryIncomplete = CollectionStoryGen & {
  attemps: IncompleteAttemp[];
};

////

export interface HistoryDBInterface {
  complete: {
    key: string;
    value: CollectionStoryComplete;
  };
  incomplete: {
    key: string;
    value: CollectionStoryIncomplete;
  };
}
