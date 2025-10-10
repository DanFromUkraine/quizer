import { NewStoryTemporaryInfo, StorySettings } from '@/src/types/newStory';

export const EMPTY_NEW_STORY_TEMPORARY_INFO: NewStoryTemporaryInfo = {
        maxNumOfExplicitCards: 0,
        maxNumOfNormalCards: 0,
        maxNumOfTypeInCards: 0,
        maxNumOfIsCorrectCards: 0
};

export const EMPTY_STORY_SETTINGS_ATOM: StorySettings = {
        isSmartMode: true,
        showAnswersImmediately: false,
        numOfExplicitCards: 0,
        numOfNormalCards: 0,
        numOfTypeInCards: 0,
        numOfIsCorrectCards: 0,
        bookId: ''
};
