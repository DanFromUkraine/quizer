import {
        getNewStoryDialogNumOfExpCardsParamInp,
        getNewStoryDialogNumOfIsCorrectCardsParamInp,
        getNewStoryDialogNumOfTypeInCardsParamInp
} from '../BooksPage/selectors';

export const INPUTS_TO_CREATE_NEW_STORY = [
        {
                propName: 'numOfExpCards',
                getLocator: getNewStoryDialogNumOfExpCardsParamInp
        },
        {
                propName: 'numOfTypeInCards',
                getLocator: getNewStoryDialogNumOfTypeInCardsParamInp
        },
        {
                propName: 'numOfIsCorrectCards',
                getLocator: getNewStoryDialogNumOfIsCorrectCardsParamInp
        }
] as const;
