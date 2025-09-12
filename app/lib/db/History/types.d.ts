// import { DBSchema } from 'idb';
// import { CreateModeQuestionCardType } from '../ObservableCreateCollectionDB/types';
// import { DB } from '@/app/lib/db/types';
//
// //// Both suitable
//
// type CollectionStoryGen = {
//         collectionName: string;
// };
//
// type TestOption = {
//         optionText: string;
//         isCorrect: boolean;
//         optionChosen: boolean;
// };
//
// export type AssessmentModeQuestionCardType = Omit<
//         CreateModeQuestionCardType,
//         'options'
// > & {
//         options: TestOption[];
//         anyOptionChosen: boolean;
//         numberOfCorrectAnswers: number;
// };
//
// type Attempt = {
//         attemptID: string;
//         cards: AssessmentModeQuestionCardType[];
// };
//
// //// Complete
//
// type CompleteAttempt = Attemp & {
//         endTime: number;
//         duration: number;
//         numberOfCorrectAnswers: number;
//         numberOfQuestions: number;
// };
// type CollectionStoryComplete = CollectionStoryGen & {
//         attempts: CompleteAttemp[];
//         attempt: CompleteAttemp;
// };
//
// //// Incomplete
//
// export type IncompleteAttempt = Attemp & {
//         startTime: number;
// };
// export type CollectionStoryIncomplete = CollectionStoryGen & {
//         attempts: IncompleteAttemp[];
//         attempt: IncompleteAttemp; // this is temporary property to simplify overall developing
// };
//
// ////
//
// export interface HistoryDBInterface extends DBSchema {
//         complete: {
//                 key: string;
//                 value: CollectionStoryComplete;
//         };
//         incomplete: {
//                 key: string;
//                 value: CollectionStoryIncomplete;
//         };
// }
//
// export type HistoryDb = DB<HistoryDBInterface>;
