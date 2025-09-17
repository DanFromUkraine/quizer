import { DBSchema } from 'idb';
import { CreateModeQuestionCardType } from '../ObservableCreateCollectionDB/types';

//// Both suitable

type CollectionStoryGen = {
        collectionName: string;
};

type TestOption = {
        optionText: string;
        isCorrect: boolean;
        optionChosen: boolean;
};

export type AssessmentModeQuestionCardType = Omit<
        CreateModeQuestionCardType,
        'options'
> & {
        options: TestOption[];
        anyOptionChosen: boolean;
        numberOfCorrectAnswers: number;
};

type Attemp = {
        attempID: string;
        cards: AssessmentModeQuestionCardType[];
};

//// Complete

type CompleteAttemp = Attemp & {
        endTime: number;
        duration: number;
        numberOfCorrectAnswers: number;
        numberOfQuestions: number;
};
type CollectionStoryComplete = CollectionStoryGen & {
        attemps: CompleteAttemp[];
        attemp: CompleteAttemp;
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
