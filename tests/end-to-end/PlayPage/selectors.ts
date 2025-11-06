import { PP_TEST_IDS } from '@/src/constants/testIds';
import { getSelector } from '../helpers';

export const getBookTitleHeading = getSelector(PP_TEST_IDS.bookTitle);
export const getSuccessPercentage = getSelector(PP_TEST_IDS.successPercentage);
export const getMarkIn12PointSys = getSelector(PP_TEST_IDS.markIn12PointsSys);
export const getExpCardCont = getSelector(PP_TEST_IDS.expCard.me);
export const getExpCardTitleHeading = getSelector(PP_TEST_IDS.expCard.title);
export const getExpCardSubtitleHeading = getSelector(
        PP_TEST_IDS.expCard.subtitle
);
export const getExpCardExplanationPar = getSelector(
        PP_TEST_IDS.expCard.explanation
);
export const getExpCardOptionContPP = getSelector(
        PP_TEST_IDS.expCard.option.me
);
export const getExpCardOptionTitlePP = getSelector(
        PP_TEST_IDS.expCard.option.title
);
export const getTypeInCardCont = getSelector(PP_TEST_IDS.typeInCard.me);
export const getTypeInCardTermInp = getSelector(
        PP_TEST_IDS.typeInCard.termInput
);
export const getTypeInCardDefHeading = getSelector(
        PP_TEST_IDS.typeInCard.definition
);
export const getTypeInCardExpectedValHeading = getSelector(
        PP_TEST_IDS.typeInCard.expectedValue
);
export const getTypInCardRevealAnswerBtn = getSelector(
        PP_TEST_IDS.typeInCard.revealAnswerButton
);
export const getIsCorrectCardCont = getSelector(PP_TEST_IDS.isCorrectCard.me);
export const getIsCorrectCardTerm = getSelector(PP_TEST_IDS.isCorrectCard.term);
export const getIsCorrectCardDefinition = getSelector(
        PP_TEST_IDS.isCorrectCard.definition
);
export const getIsCorrectCardTrueBtn = getSelector(
        PP_TEST_IDS.isCorrectCard.trueBtn
);
export const getIsCorrectCardFalseBtn = getSelector(
        PP_TEST_IDS.isCorrectCard.falseBtn
);
export const getPlayPageSubmitBtn = getSelector(PP_TEST_IDS.submitBtb);

export const getAllCards = getSelector(
        `:is([data-testid="${PP_TEST_IDS.expCard.me}"], [data-testid="${PP_TEST_IDS.typeInCard.me}"], [data-testid="${PP_TEST_IDS.isCorrectCard.me}"])`
);
