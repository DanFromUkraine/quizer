import {
        getNewStoryMaxNumOfExplicitCardsAdapterAtom,
        getNewStoryMaxNumOfIsCorrectCardsAdapterAtom,
        getNewStoryMaxNumOfNormalCardsAdapterAtom,
        getNewStoryMaxNumOfTypeInCardsAdapterAtom,
        getNewStoryNumOfExplicitCardsParamAdapterAtom,
        getNewStoryNumOfIsCorrectCardsParamAdapterAtom,
        getNewStoryNumOfNormalCardsParamAdapterAtom,
        getNewStoryNumOfTypeInCardsParamAdapterAtom
} from '@/src/utils/jotai/atomAdapters';
import { WritableAtom } from 'jotai';
import { BP_TEST_IDS } from '@/src/constants/testIds';

type ReadOnlyAdapterAtom = WritableAtom<number, [], unknown>;

export interface NewStoryParam {
        title: string;
        adapterAtom: WritableAtom<number, [newVal: number], unknown>;
        maxNumAtom: ReadOnlyAdapterAtom;
        testId: string;
}

export const NEW_STORY_PARAMS: NewStoryParam[] = [
        {
                title: 'Number of explicit cards',
                adapterAtom: getNewStoryNumOfExplicitCardsParamAdapterAtom,
                maxNumAtom: getNewStoryMaxNumOfExplicitCardsAdapterAtom as ReadOnlyAdapterAtom,
                testId: BP_TEST_IDS.newStoryDialog.numOfExpCardsInp
        },
        {
                title: 'Number of normal cards',
                adapterAtom: getNewStoryNumOfNormalCardsParamAdapterAtom,
                maxNumAtom: getNewStoryMaxNumOfNormalCardsAdapterAtom as ReadOnlyAdapterAtom,
                testId: BP_TEST_IDS.newStoryDialog.numOfNormCardsInp
        },
        {
                title: 'Number of cards, where you need to type in term text',
                adapterAtom: getNewStoryNumOfTypeInCardsParamAdapterAtom,
                maxNumAtom: getNewStoryMaxNumOfTypeInCardsAdapterAtom as ReadOnlyAdapterAtom,
                testId: BP_TEST_IDS.newStoryDialog.numOfTypeInCards
        },
        {
                title: 'Number of cards, where you need to choose if term-definition pair is correct',
                adapterAtom: getNewStoryNumOfIsCorrectCardsParamAdapterAtom,
                maxNumAtom: getNewStoryMaxNumOfIsCorrectCardsAdapterAtom as ReadOnlyAdapterAtom,
                testId: BP_TEST_IDS.newStoryDialog.numOfIsCorrectCards
        }
];
