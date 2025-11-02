import { BP_TEST_IDS } from "@/src/constants/testIds";
import { getSelector } from "../helpers";


export const getNewBookBtn = getSelector(BP_TEST_IDS.addNewBookBtn);
export const getBookCard = getSelector(BP_TEST_IDS.bookCard.me);

export const getBookEditBtn = getSelector(BP_TEST_IDS.bookCard.editBookBtn);
export const getBookDeleteBtn = getSelector(BP_TEST_IDS.bookCard.deleteBookBtn);
export const getBookStudyBtn = getSelector(BP_TEST_IDS.bookCard.playBookBtn);
export const getBookStoriesDialogContainer = getSelector(
        BP_TEST_IDS.bookStoriesDialog.me
);

export const getBookStoriesDialogStory = getSelector(
        BP_TEST_IDS.bookStoriesDialog.storyCard
);
export const getNewStoryDialogContainer = getSelector(
        BP_TEST_IDS.newStoryDialog.me
);
export const getNewStoryDialogIsSmartModeParamInp = getSelector(
        BP_TEST_IDS.newStoryDialog.isSmartModeInp
);
export const getNewStoryDialogAreAnswersShownImmediatelyParamInp = getSelector(
        BP_TEST_IDS.newStoryDialog.areAnswersShownImmediatelyInp
);
export const getNewStoryDialogNumOfExpCardsParamInp = getSelector(
        BP_TEST_IDS.newStoryDialog.numOfExpCardsInp
);
export const getNewStoryDialogNumOfRegCardsParamInp = getSelector(
        BP_TEST_IDS.newStoryDialog.numOfNormCardsInp
);
export const getNewStoryDialogNumOfTypeInCardsParamInp = getSelector(
        BP_TEST_IDS.newStoryDialog.numOfTypeInCards
);
export const getNewStoryDialogNumOfIsCorrectCardsParamInp = getSelector(
        BP_TEST_IDS.newStoryDialog.numOfIsCorrectCards
);
export const getNewStoryDialogSubmitBtn = getSelector(
        BP_TEST_IDS.newStoryDialog.submitBtn
);