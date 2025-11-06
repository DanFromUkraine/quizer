import { LocatorGetter } from '../types.js';
import { INPUTS_TO_CREATE_NEW_STORY } from './constants.js';

export type NewStoryDialogNumParamName =
        (typeof INPUTS_TO_CREATE_NEW_STORY)[number]['propName'];

export type NewStoryDialogNumParam = {
        propName: NewStoryDialogNumParamName;
        locator: LocatorGetter;
};

export type PlayTestExpCard = {
        type: 'explicit';
        title: string;
        subtitle: string;
        options: string[];
        explanation: string | null;
};

export type PlayTestTypeInCard = {
        type: 'typein';
        definition: string;
};
export type PlayTestIsCorrectCard = {
        type: 'iscorrect';
        term: string;
        definition: string;
};

export type AnyPlayTestCard =
        | PlayTestExpCard
        | PlayTestTypeInCard
        | PlayTestIsCorrectCard;
