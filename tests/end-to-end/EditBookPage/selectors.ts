import { getSelector } from '@/tests/end-to-end/helpers';
import { BASE_DIALOG_TEST_IDS, EP_TEST_IDS } from '@/src/constants/testIds';

export const getBookTitleInp = getSelector(EP_TEST_IDS.bookTitleInp);
export const getBookDescInp = getSelector(EP_TEST_IDS.bookDescInp);
export const getBtnOpenDialogCardsAsText = getSelector(
        EP_TEST_IDS.openDialogBtnCardsAsText
);
export const getBtnCloseDialog = getSelector(BASE_DIALOG_TEST_IDS.defCloseBtn);
export const getDialogCardsAsText = getSelector(
        EP_TEST_IDS.cardsAsTextDialog.me
);
export const getSaveAndExitBtnDialogCardsAsText = getSelector(
        EP_TEST_IDS.cardsAsTextDialog.saveAndExitBtn
);
getSelector(EP_TEST_IDS.cardsAsTextDialog.mixedModeBtn);
export const getShortCardsOnlyModeCardsAsText = getSelector(
        EP_TEST_IDS.cardsAsTextDialog.shortCardsOnlyModeBtn
);
export const getMainInpCardsAsTextDialog = getSelector(
        EP_TEST_IDS.cardsAsTextDialog.mainInp
);

export const getCard = getSelector(EP_TEST_IDS.card.me);
export const getExpCardContent = getSelector(
        EP_TEST_IDS.card.explicitCardContent.me
);
export const getShortCardContent = getSelector(
        EP_TEST_IDS.card.shortCardContent.me
);

export const getExpCardTitleInp = getSelector(
        EP_TEST_IDS.card.explicitCardContent.titleInp
);
export const getExpCardSubtitleInp = getSelector(
        EP_TEST_IDS.card.explicitCardContent.subtitleInp
);
export const getExpCardExplanationInp = getSelector(
        EP_TEST_IDS.card.explicitCardContent.explanationInp
);

export const getExpCardNewOptBtn = getSelector(
        EP_TEST_IDS.card.explicitCardContent.newOptionBtn
);
export const getOptionContainer = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option.me
);
export const getMainOptionBody = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option.mainOptBody.me
);
export const getOptChangeIsCorrectCheckbox = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option.mainOptBody
                .changeIsCorrectCheckbox
);
getSelector(
        EP_TEST_IDS.card.explicitCardContent.option
                .changeIsCorrectCheckbox_MobileOnly
);
export const getOptTitle = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option.mainOptBody.titleInp
);
export const getOptDeleteBtn = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option.mainOptBody.deleteBtn
);
export const getShortCardTermInp = getSelector(
        EP_TEST_IDS.card.shortCardContent.termInp
);
export const getShortCardDefinitionInp = getSelector(
        EP_TEST_IDS.card.shortCardContent.definitionInp
);
export const getDeleteCardBtn = getSelector(EP_TEST_IDS.card.deleteBtn);
export const getAddNewExpCardBtn = getSelector(EP_TEST_IDS.newExpCardBtn);
export const getAddNewShortCardBtn = getSelector(EP_TEST_IDS.newShortCardBtn);
