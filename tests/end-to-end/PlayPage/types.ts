import { LocatorGetter } from '../types.js';
import { INPUTS_TO_CREATE_NEW_STORY } from './constants.js';

export type NewStoryDialogNumParamName =
        (typeof INPUTS_TO_CREATE_NEW_STORY)[number]['propName'];

export type NewStoryDialogNumParam = {
        propName: NewStoryDialogNumParamName;
        locator: LocatorGetter;
};
