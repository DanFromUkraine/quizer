import {
        getNewStoryNumOfExplicitCardsParamAdapterAtom,
        getNewStoryNumOfIsCorrectCardsParamAdapterAtom,
        getNewStoryNumOfNormalCardsParamAdapterAtom,
        getNewStoryNumOfTypeInCardsParamAdapterAtom
} from '@/src/utils/jotai/atomAdapters';
import { WritableAtom } from 'jotai';

export interface NewStoryParam {
        title: string;
        adapterAtom: WritableAtom<number, [newVal: number], unknown>;
}

export const NEW_STORY_PARAMS: NewStoryParam[] = [
        {
                title: 'Number of explicit cards',
                adapterAtom: getNewStoryNumOfExplicitCardsParamAdapterAtom
        },
        {
                title: 'Number of normal cards',
                adapterAtom: getNewStoryNumOfNormalCardsParamAdapterAtom
        },
        {
                title: 'Number of cards, where you need to type in term text',
                adapterAtom: getNewStoryNumOfTypeInCardsParamAdapterAtom
        },
        {
                title: 'Number of cards, where you need to choose if term-definition pair is correct',
                adapterAtom: getNewStoryNumOfIsCorrectCardsParamAdapterAtom
        }
];
