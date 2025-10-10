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

type ReadOnlyAdapterAtom = WritableAtom<number, [], unknown>;

export interface NewStoryParam {
        title: string;
        adapterAtom: WritableAtom<number, [newVal: number], unknown>;
        maxNumAtom: ReadOnlyAdapterAtom;
}

export const NEW_STORY_PARAMS: NewStoryParam[] = [
        {
                title: 'Number of explicit cards',
                adapterAtom: getNewStoryNumOfExplicitCardsParamAdapterAtom,
                maxNumAtom: getNewStoryMaxNumOfExplicitCardsAdapterAtom as ReadOnlyAdapterAtom
        },
        {
                title: 'Number of normal cards',
                adapterAtom: getNewStoryNumOfNormalCardsParamAdapterAtom,
                maxNumAtom: getNewStoryMaxNumOfNormalCardsAdapterAtom as ReadOnlyAdapterAtom
        },
        {
                title: 'Number of cards, where you need to type in term text',
                adapterAtom: getNewStoryNumOfTypeInCardsParamAdapterAtom,
                maxNumAtom: getNewStoryMaxNumOfTypeInCardsAdapterAtom as ReadOnlyAdapterAtom
        },
        {
                title: 'Number of cards, where you need to choose if term-definition pair is correct',
                adapterAtom: getNewStoryNumOfIsCorrectCardsParamAdapterAtom,
                maxNumAtom: getNewStoryMaxNumOfIsCorrectCardsAdapterAtom as ReadOnlyAdapterAtom
        }
];
