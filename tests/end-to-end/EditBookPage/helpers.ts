import { EP_TEST_IDS } from '@/src/constants/testIds';
import { Locator, Page } from '@playwright/test';

function getSelector(testId: string) {
        return (locator: Page | Locator) => {
                return locator.getByTestId(testId);
        };
}

export const getBookTitleInp = getSelector(EP_TEST_IDS.bookTitleInp);
export const getBookDescInp = getSelector(EP_TEST_IDS.bookDescInp);
export const getBtnOpenDialogCardsAsText = getSelector(
        EP_TEST_IDS.openDialogBtnCardsAsText
);
export const getDialogCardsAsText = getSelector(
        EP_TEST_IDS.cardsAsTextDialog.me
);
export const getMixedModeButtonCardsAsText = getSelector(
        EP_TEST_IDS.cardsAsTextDialog.mixedModeBtn
);
export const getShortCardsOnlyModeCardsAsText = getSelector(
        EP_TEST_IDS.cardsAsTextDialog.shortCardsOnlyModeBtn
);
export const getMainInpCardsAsTextDialog = getSelector(
        EP_TEST_IDS.cardsAsTextDialog.mainInp
);
export const getAllCards = (page: Page) =>
        getSelector(EP_TEST_IDS.card.me)(page).all();
export const getAllExpCardContentEls = (page: Page) =>
        getSelector(EP_TEST_IDS.card.explicitCardContent.me)(page).all();
export const getAllShortCardContentEls = (page: Page) =>
        getSelector(EP_TEST_IDS.card.shortCardContent.me)(page).all();
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
export const getOptChangeIsCorrectBtn = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option.changeIsCorrectBtn
);
export const getOptTitle = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option.title
);
export const getOptDeleteBtn = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option.deleteBtn
);
export const getShortCardTermInp = getSelector(
        EP_TEST_IDS.card.shortCardContent.termInp
);
export const getShortCardDefinitionInp = getSelector(
        EP_TEST_IDS.card.shortCardContent.definitionInp
);
export const getDeleteCardBtn = getSelector(EP_TEST_IDS.card.deleteBtn);
